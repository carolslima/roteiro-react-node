import React, { useCallback, useRef, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import api from "../../services/apiClient";

import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";

import getValidationErrors from "../../utils/getValidationsErrors";

import Header from '../../components/Header';
import Input from "../../components/Input";
import Button from "../../components/Button";

import {
  Container,
  Content,
  AnimationContainer,
  AvatarInput,
  Avatar,
  AvatarChange,
  AvatarChangeIcon,
  File,
  Title,
} from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: val => !!val.length,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: val => !!val.length,
              then: Yup.string().required("Campo obrigatório"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password"), undefined], "Confirmação incorreta"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        history.push("/roteiro");

        addToast({
          type: "success",
          title: "Perfil atualizado",
          description:
            "Suas informações do perfil foram atualizados com sucesso",
        });

        setLoading(false);

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na atualização",
          description:
            "Ocorreu um erro ao atualizar seus dados, tente novamente",
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then(response => {
          updateUser(response.data);

          addToast({
            type: "success",
            title: "Avatar atualizado",
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <AnimationContainer>
            <AvatarInput>
              <Avatar src={user.avatar_url} alt={user.name} />
              <AvatarChange htmlFor="avatar">
                <AvatarChangeIcon />
                <File type="file" id="avatar" onChange={handleAvatarChange} />
              </AvatarChange>
            </AvatarInput>

            <Form
              ref={formRef}
              initialData={{
                name: user.name,
                email: user.email,
              }}
              onSubmit={handleSubmit}
            >

              <Title>Meu perfil</Title>

              <Input name="name" icon={FiUser} type="text" placeholder="Nome Completo" />
              <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

              <Input
                name="old_password"
                icon={FiLock}
                type="password"
                placeholder="Senha atual"
              />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
              />

              <Input
                name="password_confirmation"
                icon={FiLock}
                type="password"
                placeholder="Confirmar senha"
              />

              <Button loading={loading} type="submit">
                Confirmar mudanças
            </Button>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Profile;

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

import Notifications from '../Notifications';

import avatarDefaultImg from '../../assets/images/avatar_default.png'

import { useAuth } from "../../hooks/auth";

import logo from '../../assets/images/logo_rpc_blue.png';

import { Container, Content, Profile } from './styles';

function Header() {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="RPC" />
          <Link to="/roteiro">Roteiro</Link>
          <Link to="/import">Importar</Link>
          <Link to="/checklist">Checklist</Link>
          <Link to="/paralelas">Paralelas</Link>
          {Number(user.role) > 1 && <Link to="/users">Usuários</Link>}
          {Number(user.role) > 2 && <Link to="/providers">Praças</Link>}
          <a
            href="http://auth.grpcom.com.br/auth/sisgb"
            target="_blank"
            rel="noopener noreferrer"
          >
            SisGb
          </a>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{user.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                user.avatar_url !== null
                  ? user.avatar_url
                  : avatarDefaultImg
              }
              alt={user.name}
            />

            <button type="button" onClick={signOut}>
              <FiLogOut />
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default memo(Header);

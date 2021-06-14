import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import { createConnection } from 'typeorm';

const create = async () => {
  const connection = await createConnection();

  const provider_id = uuidV4();
  const password = await hash('rpc@admin21', 8);

  await connection.query(
    `INSERT INTO PROVIDERS(id, name, email_provider, email_jornalism, email_opec, state, city, status)
      values('${provider_id}', 'Administrador', 'provider@rpc.com.br', 'jornalismo@rpc.com.br', 'opec@rpc.com.com', 'Paraná', 'Ponta Grossa', '${true}')`,
  );

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, role, status, provider_id)
      values('${uuidV4()}', 'Administrator', 'admin@rpc.com.br', '${password}', '${3}', '${true}', '${provider_id}')`,
  );

  await connection.query(
    `INSERT INTO SIGNALS(id, name, type)
      values('${uuidV4()}', 'DEFAS', 'DEFAS'),
      ('${uuidV4()}', 'ESTADO', 'ESTADO'),
      ('${uuidV4()}', 'FALTA', 'FALTA'),
      ('${uuidV4()}', 'FIBRA', 'M'),
      ('${uuidV4()}', 'NEXIO', 'L'),
      ('${uuidV4()}', 'SAT', 'R'),
      ('${uuidV4()}', 'SATSP', 'SATSP'),
      ('${uuidV4()}', 'SWA', 'SWA')`,
  );

  await connection.close();
};

create()
  .then(() => console.log('Provider, User and Signals created'))
  .catch(error => console.error(error));

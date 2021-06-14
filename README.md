# Roteiro Web

## Server

**Na pasta roteiro acessar pasta server**

- Renomear arquivos e configurar:
`.env.exemple` para `.env`
`ormconfig.json.exemple` para `ormconfig.json`

```bash
# $ mv .env.exemple .env
# $ mv ormconfig.json.exemple ormconfig.json
$ cd server
```

**Instalar depêndencias**

```bash
$ npm install typeorm -g
$ npm install pm2 -g
$ npm install
```

**Iniciar bancos de dados com docker-compose**

```bash
$ docker-compose up -d
```

**Rodar as migrations**

```bash
$ npm run typeorm -- migration:run
$ npm run seed:admin
```

**Iniciar o server**
```bash
$ npm run dev
```

## Client

**Na pasta roteiro acessar pasta web**

- Renomear arquivo e configurar:
`.env.exemple` para `.env`

```bash
$ cd ../web
$ npm install
$ npm start
```

**Parar e apagar os bancos de dados utilizando o docker-compose**

```bash
Ctrl + c
$ docker-compose down
```

**Parar o client web**

```bash
Ctrl + c
```

- lembrando que os procedimentos acima precisam ser repetidos todas as vezes que iniciar o roteiro, pois os dados não ficam salvos no banco de dados uma vez utilizado o "docker-compose down"

## Quando em Produção

**Digitar comandos no terminal**

```bash
$ docker run --name postgres -e POSTGRESQL_PASSWORD=CRIAR_SENHA_FORTE -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=roteiro -p 5432:5432 --restart always -d bitnami/postgresql:latest

$ docker run -d --name mongodb -e MONGODB_USERNAME=mongo -e MONGODB_PASSWORD=CRIAR_SENHA_FORTE -e MONGODB_DATABASE=roteiro -p 27017:27017 bitnami/mongodb:latest

$ docker run -d --name redis -e REDIS_PASSWORD=CRIAR_SENHA_FORTE -p 6379:6379 bitnami/redis:latest
```

Configurar usuário, senha e porta do postgres e mongodb no arquivo **ormconfig.json** na pasta raiz do server conforme as portas definidas nos containers acima

**Acessar pasta server**

```bash
$ cd server
```

**Rodar as migrations (caso não tenha rodado anteriormente)**

```bash
$ npm run typeorm -- migration:run
$ npm run seed:admin
```

**Iniciar servidor**

```bash
$ npm run build
$ pm2 start src/build/server.js --name server
```

**Acessar pasta clients/web (a cada modificação no código precisa fazer uma nova build)**

```bash
$ npm run build
$ npm install -g serve
$ serve -s build
```

**Para encerrar os processos do server, no terminal onde esta rodando o server**

```bash
$ pm2 stop server
# $ pm2 restart server
# $ pm2 list
# $ pm2 monit
```

**Para encerrar o client web, no terminal**

```bash
Ctrl + c
```

## Pronto!

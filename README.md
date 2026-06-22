# Prova Autenticação - Microsserviços NestJS

Microsserviço de autenticação com NestJS, MySQL e comunicação TCP.

## Arquitetura

```
user_service (TCP :3001)  →  MySQL
api_prova    (HTTP :3000) →  user_service (TCP)
```

## Pré-requisitos

- MySQL com banco `prova_autenticacao` criado
- Configurar `user_service/.env` (DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD)

## Executar

**Terminal 1** — microserviço:
```bash
cd user_service
npm install
npm run start:dev
```

**Terminal 2** — API Gateway:
```bash
cd api_prova
npm install
npm run start:dev
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/user/create` | Cria usuário (nome, cpf, telefone, matricula, senha) |
| POST | `/user/login` | Login (matricula, senha) |
| GET | `/user` | Lista todos |
| GET | `/user/:matricula` | Consulta por matrícula |

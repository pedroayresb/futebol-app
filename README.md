
# Futebol App

Este é um projeto fullstack no qual fui responsável por desenvolver uma API utilizando o método TDD e integrar as aplicações através do docker-compose para que elas funcionem consumindo um banco de dados.

O back-end dockerizado foi construído utilizando modelagem de dados através do Sequelize e respeita as regras de negócio providas no projeto. A API é capaz de ser consumida pelo front-end já provido neste projeto.

Para adicionar uma partida, é necessário ter um token, portanto, o usuário deve estar logado para fazer as alterações. Há um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end, que será exibida para o usuário do sistema.

## Tecnologias utilizadas

-   Node.js
- TypeScript
-   Express
-   Sequelize
-   MySQL
-   Docker
-   Jest
- Mocha
- Chai

## Instalação e uso

1.  Clone este repositório para sua máquina local

```bash
git clone git@github.com:pedroayresb/futebol-app.git
```

2.  Entre na pasta do projeto
```bash
cd futebol-app
```
3.  Instale as dependencias; Isso ja ira instalar tanto o front quanto o backend
```bash
npm install 
```
4.  Execute o docker-compose
```bash
npm run compose:up
```

A aplicação utiliza as portas  `3306`,  `3001`  e  `3000`  , certifique-se que elas estão disponíveis no momento de executar o comando.

## Testes

A aplicação possui testes desenvolvidos para cobrir as suas principais camadas. 
![Exemplo test-coverage](imgs/test-coverage.png)

## Documentação da API

### Endpoint:  `/login`

#### Método:  `POST`

Descrição: Cria um novo usuário no banco de dados, desde que o CPF seja válido e único.

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```
Parâmetros:

-   `email`: uma string contendo um email válido.
- `password`: uma string contendo uma senha válida.

Respostas:

-   200 OK: Usuário criado com sucesso.
-   400 Bad Request: Todos os campos devem estar preenchidos.
-   401 Unauthorized: Email ou senha incorretos.

##### Exemplo do corpo da requisição:
```json
{
  "email": "admin@admin.com" 
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
// senha: secret_admin
}
```
##### Exemplo de resposta de sucesso:
```json
status: 200
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}
```
##### Exemplo de resposta de erro (Email ou senha incorretos):
```json
status: 401
{
  "message": "Incorrect email or password"
}
```
##### Exemplo de resposta de erro (Todos os campos devem estar preenchidos):
```json
status: 400
{
  "message": "All fields must be filled"
}
```
### Endpoint:  `/login/validate`

#### Método:  `GET`

Descrição: Retorna a role do usuário logado.

Respostas:

-   200 OK: Role retornada com sucesso.

##### Exemplo de resposta de sucesso:
```json
status: 200
{
	"role": "admin"
}
```
### Endpoint:  `/teams`

#### Método:  `GET`

Descrição: Retorna o array com todos os times registrados no banco de dados.

Respostas:

-   200 OK: Retorna array com times.

##### Exemplo de resposta de sucesso:
```json
status: 200

[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]

```

### Endpoint:  `/teams/:id`

#### Método:  `GET`

Descrição: Retorna o time com id registrado no banco de dados.

Respostas:

-   200 OK: Time encontrado com sucesso.

##### Exemplo de resposta de sucesso:
```json
status: 200
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```

### Endpoint:  `/matches`

#### Método:  `GET`

Descrição: Retorna o array de partidas registradas no banco de dados.

Respostas:

-   200 OK: Partidas encontradas com sucesso.

##### Exemplo de resposta de sucesso:
```json
status: 200
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
```
### Endpoint:  `/matches?inprogress=?`

#### Método:  `GET`

Descrição: Retorna o array de partidas registradas no banco de dados, a depender da query na rota.

Respostas:

-   200 OK: Partidas encontradas com sucesso.
##### Exemplo de resposta de sucesso:
```json
status: 200
[
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  }
]
```

### Endpoint:  `/matches/:id`

#### Método:  `POST`

Descrição: Deve ser capaz de criar uma partida no banco de dados.

Respostas:

-   200 OK: Partidas encontradas com sucesso.
- 422 Unprocessable Entity: Não deve ser possivel criar uma partida com dois Ids de time iguais.
- 404 Not Found: Não deve ser possivel criar uma partida com times que não existam no banco de dados.

Request body:
```json
{
  "homeTeamId": "number",
  "awayTeamId": "number",
  "homeTeamGoals": "number",
  "awayTeamGoals": "number",
}
```

##### Exemplo de resposta de sucesso:
```json
status: 200
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

##### Exemplo de resposta de erro (Os times não devem ser iguais):
```json
status: 422
{
	"message":  "It is not possible to create a match with two equal teams"
}
```

##### Exemplo de resposta de erro (Os times devem existir no campo de dados):
```json
status: 400
{
	"message": "There is no team with such id!"
}
```

### Endpoint:  `/matches/:id/finish`

#### Método:  `PATCH`

Descrição: Deve ser capaz de finalizar uma partida no banco de dados.

Respostas:

-   200 OK: Partidas encontradas com sucesso.

Request body:
```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

### Endpoint:  `/leaderboard || /leaderboard/home || /leaderboard/away`

#### Método:  `GET`

Descrição: Retorna o array de classificação, podendo classificar somente entre jogos dentro ou fora de casa.

Respostas:

-   200 OK: Classificação encontrada com sucesso.
##### Exemplo de resposta de sucesso:
```json
status: 200
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  ...
]
```

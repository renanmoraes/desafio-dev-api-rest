# Teste pratico Renan Moraes

## Pré requisitos
* NodeJS (maior que v12.22)
* Docker (latest)

## Primeiros passos

### Rodar imagem do docker

Para isso precisamos rodar o comando que irá criar um container rodando mongo, isso nos evitará ter que instalar tudo do mongo

> docker run --name mongo -p 27017:27017 -d mongo:latest 

### Instalar dependencias

Antes de iniciar o projeto precisamos rodar `npm i` para instalar todas as dependencias do projeto

> npm i

### Criar .env

Apos isso precisamos criar um arquivo `.env` na raiz do projeto, nele estará as variaveis de ambiente de nossa aplicação. Para auxiliar deixei um arquivo `.env.example` com as estruturas necessarias para rodar o projeto.

> cp .env.example .env

### Rodar o projeto

Para rodar o projeto em modo desenvolvimento foi escrito um script que facilita este comando, para utiliza-lo basta executar

> npm run start


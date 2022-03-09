# besafe-back
## Desafio Técnico Besafe
### Feito por: João Pedro Cavalcante
### Utilizando a framework [Express](https://expressjs.com/) e o ORM [TypeORM](https://typeorm.io/)

## Como Instalar e Executar o Projeto?
* Clone o repositório
* É possível utilizar o [Docker](#Docker) para executar o projeto, mais detalhes embaixo.
* Instale as dependências utilizando o comando `npm install`.
* Crie um arquivo `.env` para utilizar as variáveis de ambientes.
* Com o arquivo `.env` configure a conexação do banco de dados para usar o Postgresql de acordo com seu computador.
* Por fim, utilize o seguintes comando para servir o projeto, `npm run dev`.
* E, assim será possível utilizar a aplicação.

## Docker
* Crie um arquivo `.env` com as configurações do postgresql, com os dados do container do postgres.
* Para executar o projeto com Docker, basta utilizar o comando `docker compose up`.
* Após executar o comando, será instalado todas as dependencias do projeto e com as configurações de acordo.
* E, assim será possível utilizar a aplicação

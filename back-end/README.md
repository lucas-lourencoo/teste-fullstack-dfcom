# Teste back-end - Lucas Lourenço

## Instalar dependências

Primeiro, instale os pacotes necessários (recomendo o uso do `yarn` pois construí a aplicação usando ele):

```bash
$ yarn
```

## Rodando a aplicação

#### Na aplicação, existe um arquivo `.env.example`. Nele é possível encontrar algumas variáveis de ambiente padrão. Antes de iniciar o servidor, renomeie o arquivo para `.env` e sinta-se a vontade para utilizar os valores já pré-configurados ou incluir sua própria URL do banco.

Feito isto, rode o comando

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

Assim que a aplicação subir ela estará disponível em [http://localhost:8080](http://localhost:8080).

## Rotas da aplicação

As rotas da aplicação são:

- _POST_ `/products` - Criar um novo produto
- _GET_ `/products` - Listar produtos
- _GET_ `/products/:id` - Buscar um produto pelo id
- _PUT_ `/products/:id` - Atualizar um produto
- _DELETE_ `/products/:id` - Deletar um produto
- _POST_ `/auth/login` - Fazer login de um usuário
- _POST_ `/users` - Criar um usuário
- _GET_ `/users/:email` - Resgatar um usuário pelo email

## Testes

Todos os testes já estão criados e prontos para ser usados, basta rodar o comando:

```bash
# unit tests
$ yarn test
```

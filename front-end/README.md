# Front-end - Teste Lucas Lourenço

Este é um projeto [Next.js](https://nextjs.org/) criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Iniciando

Primeiro, instale os pacotes necessários (recomendo o uso do `yarn` pois construí a aplicação usando ele):

```bash
yarn
# ou
npm install
```

Depois, rode o servidor de development:

```bash
yarn dev
# ou
npm run dev
```

Abra o link [http://localhost:3000](http://localhost:3000) no seu navegador.

Este projeto usa [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### IMPORTANTE: é necessário que o back-end esteja rodando na sua máquina local para que os serviços funcionem. O repositório do back-end pode ser encontrado [AQUI](/).

## Rotas

As rotas da API já estão configuradas para uma rota padrão do back-end que criei [http://localhost:8080](http://localhost:8080).

As rotas da aplicação são:

- `/` - Home e Login
- `/dashboard` - Listar produtos
- `/dashboard/add-product` - Criar um produto
- `/dashboard/edit-product` - Editar produto

## Fazendo login

Para fazer login na rota `/`, utilize as seguintes credenciais:

- _Email_: *teste@teste.com*
- _Senha_: _123456_

Feito o login, será salvo um cookie chamado `access_token` com o token de acesso que será usado para todas as chamadas API. Para que a aplicação rode corretamente este é o primeiro passo a ser seguido.

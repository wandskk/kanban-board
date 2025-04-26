# Kanban Board

**Um board de kanban simples e direto, feito para organizar suas tarefas de forma rápida e eficiente.**

## ✨ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [DND Kit](https://dndkit.com/) (drag and drop)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [TypeScript](https://www.typescriptlang.org/) com tipagens separadas e reutilizadas
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) para persistência dos dados

## 🚀 Funcionalidades

- Criar colunas personalizadas
- Criar tarefas (tasks) dentro das colunas
- Renomear colunas e tarefas
- Reordenar colunas arrastando-as
- Mover tarefas entre colunas
- Reordenar tarefas dentro da mesma coluna apenas arrastando
- Persistência dos dados no navegador usando LocalStorage
- Interface responsiva e moderna usando Tailwind CSS
- Estrutura limpa e componentizada seguindo boas práticas (Clean Code)
- Tipagens TypeScript separadas e reutilizadas para melhor manutenção

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/kanban-board.git
```

Acesse a pasta do projeto:

```bash
cd kanban-board
```

Instale as dependências:

```bash
npm install
# ou
yarn
```

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
NEXT_PUBLIC_STORAGE_KEY=sua-chave-unica
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`.

## 🛠 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Turbopack
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor com a build de produção
- `npm run lint`: Roda o linter para manter a qualidade do código

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

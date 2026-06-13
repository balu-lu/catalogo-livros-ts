# Catálogo de Livros (Minha Biblioteca)

Uma aplicação front-end desenvolvida em **React com TypeScript** para gestão de um catálogo pessoal de livros. O projeto realiza operações completas de CRUD (Create, Read, Update, Delete) consumindo uma API REST real (CrudCrud), com foco em tipagem estática rigorosa e boas práticas de arquitetura de componentes.

## Tecnologias Utilizadas

- **React 18** (via Vite)
- **TypeScript** (Tipagem estática para props, estados, eventos e retornos de API)
- **Tailwind CSS v4** 
- **Axios** (Cliente HTTP para requisições à API)

## Funcionalidades

- **Listagem Dinâmica (GET):** Recupera e exibe todos os livros armazenados na API ao carregar a aplicação.
- **Cadastro de Livros (POST):** Adição de novos livros com validação rigorosa de campos vazios (utilizando `.trim()`) e feedback visual de erros.
- **Atualização de Status (PUT):** Alternância rápida entre os estados "Lido" e "Não lido"
- **Remoção de Livros (DELETE):** Exclusão de livros do catálogo com confirmação prévia.
- **Tratamento de Erros:** *Empty states* elegantes para listas vazias e mensagens claras de falha de conexão (ex: API expirada).

## Estrutura do Projeto

O projeto adota uma arquitetura modular, separando serviços, tipos e interface:

```text
src/
├── components/          # Componentes visuais
│   ├── BookForm.tsx     # Formulário de cadastro com validações
│   ├── BookItem.tsx     # Representação individual e ações de um livro
│   └── BookList.tsx     # Grelha de renderização do catálogo
├── services/            # Camada de comunicação externa
│   └── api.ts           # Configuração do Axios e URL base
├── types/               # Definições estáticas do TypeScript
│   └── Book.ts          # Interfaces e Types (Book, BookInput, BookStatus)
├── App.tsx              # Ponto de entrada, gestão de estados e chamadas à API
└── main.tsx             # Inicialização do React
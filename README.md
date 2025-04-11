# 📝 Formulário Interativo com React + TypeScript

Este projeto é um formulário interativo criado com **Vite**, **React** e **TypeScript**, que valida campos de entrada, armazena dados temporariamente no `LocalStorage`, e inclui uma tela de login simples.

---

## ✅ Funcionalidades

- ✅ Validação de e-mail válido (ex: `email@email.com`)
- ✅ Validação obrigatória de todos os campos
- ✅ Mensagens de erro por campo (ex: idade inválida como “quarenta” ou “43,5”)
- ✅ Campos de ID do usuário e senha
- ✅ Armazenamento temporário via `LocalStorage`
- ✅ Tela de login com validação baseada no formulário anterior
- ✅ Botão de salvar formulário
- ✅ Exibição de mensagem de confirmação de inscrição
- ✅ Layout responsivo (mobile, tablet e desktop)

---

## 🚀 Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (opcional para estilização)

---

## ⚙️ Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

---

## 📦 Como Inicializar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

## Instale as dependências
- Com npm:

```bash
npm install
```

## Inicie o servidor de desenvolvimento

- basta rodar
```bash
npm run dev
```
### Acesse no navegador
Abra http://localhost:5173 para ver o projeto em execução.
Ctrl click do mouse


## 🧪 Como Usar
Acesse a página do formulário.

Preencha todos os campos:

Nome

E-mail

Idade (somente número inteiro)

ID do usuário

Senha

Clique no botão Salvar.

O formulário será validado e salvo temporariamente no LocalStorage.

Uma mensagem de sucesso será exibida.

Vá até a tela de login e use o ID do usuário e a senha para autenticar.

## 🧠 Validações Implementadas
Email:

Deve conter “@” e “.” no formato válido.

Ex: joao@gmail.com é válido; joaogmail não é.

Idade:

Aceita apenas números inteiros (ex: 25)

Inválido: 25,3 ou vinte

Obrigatoriedade:

Nenhum campo pode estar vazio.

## 📁 Estrutura de Diretórios
css
Copiar
Editar
📦src
 ┣ 📜main.tsx
 ┣ 📜App.tsx
 ┣ 📂pages
 ┃ ┣ 📜Formulario.tsx
 ┃ ┗ 📜Login.tsx
   ┗ 📜Register.tsx
 

 ## 📌 Observações
Este projeto é didático e pode ser adaptado para incluir autenticação real com backend.

Os dados são salvos apenas temporariamente no navegador (via LocalStorage).

O sistema de login simula uma autenticação simples com base nos dados salvos no formulário.


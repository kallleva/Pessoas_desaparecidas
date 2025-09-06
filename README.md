# Desaparecidos SPA

Aplicação **Single Page Application (SPA)** desenvolvida em **React + TypeScript + Tailwind CSS**, que consome a API da **Polícia Judiciária Civil de Mato Grosso** para consulta de pessoas desaparecidas ou localizadas.

Este projeto atende ao **PROJETO PRÁTICO – IMPLEMENTAÇÃO FRONT-END**, conforme especificações fornecidas.

---

## 📋 Contexto

A Polícia Judiciária Civil de Mato Grosso disponibiliza uma API de pessoas desaparecidas.  
Objetivo da aplicação:  

1. Consultar registros de pessoas desaparecidas ou já localizadas.  
2. Enviar informações adicionais (observações, localização, fotos) sobre essas pessoas.  

📖 Documentação da API: [Swagger](https://abitus-api.geia.vip/swagger-ui/index.html)  

---

## ✨ Funcionalidades

- 📋 Listagem de registros de desaparecidos/localizados (cards responsivos).  
- 🔎 Busca por parâmetros + paginação (mínimo 10 por página).  
- 📄 Página de detalhes com dados completos.  
- 📝 Formulário para envio de novas informações (observações, fotos, localização).  
- ⚡ Rotas com **Lazy Loading**.  
- 🎨 Layout limpo, responsivo e intuitivo (Tailwind CSS).  
- 🐳 Empacotamento em **Docker**.  
- 🚨 Tratamento de erros em chamadas de API.  

---

## 📦 Tecnologias Utilizadas

- [React 19](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [React Router v7](https://reactrouter.com/)  
- [Axios](https://axios-http.com/)  
- [Docker](https://www.docker.com/)  

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/desaparecidos-spa.git
cd desaparecidos-spa

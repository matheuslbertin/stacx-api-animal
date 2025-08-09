# 🐾 Animal API - Cadastro e Gerenciamento de Animais

API RESTful desenvolvida com Node.js e Express que permite o cadastro, consulta, atualização e exclusão de animais. Os dados são armazenados em um arquivo JSON local e manipulados usando o módulo nativo `fs` de forma assíncrona.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Joi (validação de dados)
- Módulo nativo `fs/promises`
- JSON como base de dados local

---

## 📁 Estrutura de Diretórios

```md
animal-api/
├── app.js
├── package.json
├── .gitignore
├── src/
│   ├── controllers/         # Funções de negócio (CRUD)
│   ├── data/                # Arquivo JSON com dados persistidos
│   ├── middlewares/         # Middleware de validação
│   ├── models/              # Schema de validação com Joi
│   ├── routes/              # Definição das rotas da API
│   └── utils/               # Manipulação de arquivos com 'fs', centralização de endpoints da api e status code
```

---

## 📦 Instalação

1. Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/matheuslbertin/stacx-api-animal.git
cd animal-api
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm run start
```

A API estará disponível em: `http://localhost:3000`

---

## 🔌 Endpoints da API

### 🔍 Listar todos os animais

**GET** `/api/get-all-animals`

**Resposta:**

```json
[
  {
    "id": "uuid",
    "name": "Rex",
    "species": "Cachorro",
    "age": 3
  }
]
```

---

### 🔍 Buscar animal por ID

**GET** `/api/get-animal-by-id/:id`

**Resposta de sucesso:**

```json
{
  "id": "uuid",
  "name": "Rex",
  "species": "Cachorro",
  "age": 3
}
```

**Erro 404:**

```json
{ "message": "Animal não encontrado" }
```

---

### ➕ Criar novo animal

**POST** `/api/create-animal`

**Corpo da requisição:**

```json
{
  "name": "Rex",
  "species": "Cachorro",
  "age": 3
}
```

**Resposta de sucesso:**

```json
{
  "id": "uuid",
  "name": "Rex",
  "species": "Cachorro",
  "age": 3
}
```

**Validações aplicadas com Joi:**

- `name`: string, mínimo 2 caracteres, obrigatório
- `species`: string, mínimo 2 caracteres, obrigatório
- `age`: número inteiro, mínimo 0, obrigatório

**Erros esperados:**

- Corpo vazio:

```json
{ "message": "Requisição inválida. O corpo não pode estar vazio." }
```

- Campos faltando:

```json
{
  "message": "Erro de validação",
  "details": [
    ""name" is required",
    ""species" is required",
    ""age" is required"
  ]
}
```

---

### 📝 Atualizar animal

**PUT** `/api/update-animal/:id`

**Corpo da requisição:**

```json
{
  "name": "Rex Atualizado",
  "species": "Cachorro",
  "age": 4
}
```

**Resposta de sucesso:**

```json
{
  "id": "uuid",
  "name": "Rex Atualizado",
  "species": "Cachorro",
  "age": 4
}
```

**Erro 404:**

```json
{ "message": "Animal não encontrado" }
```

---

### ❌ Deletar animal

**DELETE** `/api/delete-animal/:id`

**Resposta de sucesso:**

```json
{
  "message": "Animal deletado com sucesso.",
  "deleted": {
    "id": "uuid",
    "name": "Rex",
    "species": "Cachorro",
    "age": 3
  }
}
```

**Erro 404:**

```json
{ "message": "Animal não encontrado" }
```

---

## ⚙️ Validação com Middleware

A API utiliza middleware (`validate-body.js`) com a biblioteca `Joi` para validar os dados recebidos **antes** de chegarem ao controller.

- Corpo `undefined` → erro 400 com mensagem personalizada
- Corpo `{}` → validação detalhada de campos obrigatórios

---

## ✅ Boas Práticas Aplicadas

- Separação de responsabilidades por camadas (controller, routes, middleware, model)
- Uso de middlewares para validação
- Manipulação assíncrona de arquivos com `fs/promises`
- Respostas HTTP apropriadas (200, 201, 204, 400, 404)
- Código modular e reutilizável
- Documentação clara da API (este README)

---

## 🧪 Testes manuais com cURL

```bash
# Criar animal
curl -X POST http://localhost:3000/api/get-all-animals -H "Content-Type: application/json" -d '{"name":"Tobby", "species":"Gato", "age":2}'

# Listar todos
curl http://localhost:3000/api/get-all-animals
```

---

## 🔐 Validação de parâmetros de rota

As rotas que utilizam `:id` possuem verificação obrigatória da presença desse parâmetro.  
Caso a URL seja chamada sem o `id`, a API retornará:

```json
{
  "message": "Parâmetro 'id' é obrigatório. Exemplo: /api/nome-da-rota/id-do-animal"
}
```

### Exemplos

#### ❌ GET sem ID

```bash
GET /api/get-animal-by-id/
```

**Resposta:**

```json
{
  "message": "Parâmetro 'id' é obrigatório. Exemplo: /api/get-animal-by-id/id-do-animal"
}
```

#### ❌ PUT sem ID

```bash
PUT /api/update-animal-by-id/
```

**Resposta:**

```json
{
  "message": "Parâmetro 'id' é obrigatório. Exemplo: /api/update-animal-by-id/id-do-animal"
}
```

#### ❌ DELETE sem ID

```bash
DELETE /api/delete-animal-by-id/
```

**Resposta:**

```json
{
  "message": "Parâmetro 'id' é obrigatório. Exemplo: /api/delete-animal-by-id/id-do-animal"
}
```

---

## 📖 Documentação

- [Node.js](https://nodejs.org/docs/latest/api/)
  - [Módulo nativo `fs/promises`](https://nodejs.org/api/fs.html)
- [Express](https://expressjs.com/)
- [Joi (validação de dados)](https://joi.dev/api/?v=17.13.3)
- [HTTP: Hypertext Transfer Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
  - [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
  - [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [JSON como base de dados local](https://www.json.org/json-en.html)
- [REST API](https://restfulapi.net/)

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

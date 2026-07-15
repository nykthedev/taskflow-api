# TaskFlow API

API REST para gerenciamento de tarefas, desenvolvida com Node.js e Express.

O projeto aplica arquitetura em camadas, validação de dados, persistência em arquivo JSON e boas práticas de versionamento com Git.

## Tecnologias utilizadas

<p>
  <img src="https://skillicons.dev/icons?i=js,nodejs,express,postman" alt="Tecnologias utilizadas" />
</p>

## Funcionalidades

- Listar todas as tarefas
- Buscar uma tarefa por ID
- Cadastrar uma nova tarefa
- Validar e normalizar os dados recebidos
- Gerar ID e data de criação automaticamente
- Persistir os dados em arquivo JSON

## Arquitetura

O projeto está organizado em camadas:

```text
Route
→ Controller
→ Service
→ Repository
→ Database
```

- **Routes:** definem os métodos e caminhos da API.
- **Controllers:** recebem as requisições e definem as respostas HTTP.
- **Services:** concentram validações e regras de negócio.
- **Repositories:** realizam a leitura e escrita dos dados.
- **Database:** armazena temporariamente as tarefas em JSON.

## Estrutura do projeto

```text
taskflow-api/
├── src/
│   ├── controllers/
│   │   └── tarefasController.js
│   ├── database/
│   │   └── tarefas.json
│   ├── repositories/
│   │   └── tarefasRepository.js
│   ├── routes/
│   │   └── tarefasRoutes.js
│   ├── services/
│   │   └── tarefasService.js
│   ├── app.js
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/nykthedev/taskflow-api
```

### 2. Entre na pasta

```bash
cd taskflow-api
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tarefas` | Lista todas as tarefas |
| `GET` | `/tarefas/:id` | Busca uma tarefa pelo ID |
| `POST` | `/tarefas` | Cadastra uma nova tarefa |

## Cadastrar uma tarefa

```http
POST /tarefas
```

### Corpo da requisição

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Praticar desenvolvimento de APIs",
  "prioridade": "alta"
}
```

A descrição é opcional:

```json
{
  "titulo": "Organizar GitHub",
  "prioridade": "media"
}
```

### Resposta de sucesso

```json
{
  "sucesso": true,
  "mensagem": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 1,
    "titulo": "Organizar GitHub",
    "descricao": "",
    "prioridade": "media",
    "concluida": false,
    "criadoEm": "2026-07-15T02:58:27.708Z"
  }
}
```

## Regras de negócio

### Título

- Obrigatório
- Deve ser uma string
- Não pode conter apenas espaços

### Descrição

- Opcional
- Quando enviada, deve ser uma string
- Quando não enviada, recebe uma string vazia

### Prioridade

Valores permitidos:

```text
baixa
media
alta
```

Os dados são normalizados antes do salvamento. Por exemplo:

```text
"  ALTA  " → "alta"
```

### Campos gerados pela API

- `id`
- `concluida`
- `criadoEm`

Toda nova tarefa é criada com:

```json
{
  "concluida": false
}
```

## Status HTTP

| Status | Descrição |
|---|---|
| `200 OK` | Operação realizada com sucesso |
| `201 Created` | Tarefa criada com sucesso |
| `400 Bad Request` | Dados inválidos |
| `404 Not Found` | Tarefa não encontrada |
| `500 Internal Server Error` | Erro interno da aplicação |

## Próximas funcionalidades

- Atualização parcial de tarefas
- Conclusão e reabertura de tarefas
- Exclusão de tarefas
- Filtros por prioridade e status
- Tratamento centralizado de erros
- Testes automatizados
- Banco de dados
- Deploy

## Status

🚧 Em desenvolvimento.

## Autor

Desenvolvido por Nicollas.
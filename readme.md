# TaskFlow API

API REST para gerenciamento de tarefas, desenvolvida com Node.js, Express e JavaScript.

O projeto aplica arquitetura em camadas, validação e normalização de dados, persistência em arquivo JSON e boas práticas de versionamento com Git e GitHub.

## Tecnologias e ferramentas

![JAVASCRIPT](https://img.shields.io/badge/JavaScript-000000?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NODEJS](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=339933)
![EXPRESS](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![POSTMAN](https://img.shields.io/badge/Postman-000000?style=for-the-badge&logo=postman&logoColor=FF6C37)
![GIT](https://img.shields.io/badge/Git-000000?style=for-the-badge&logo=git&logoColor=F05032)
![GITHUB](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)
![VSCODE](https://img.shields.io/badge/VS_Code-000000?style=for-the-badge&logo=visualstudiocode&logoColor=007ACC)

## Funcionalidades

- Listar todas as tarefas
- Buscar uma tarefa por ID
- Cadastrar uma nova tarefa
- Atualizar parcialmente uma tarefa
- Marcar uma tarefa como concluída
- Reabrir uma tarefa concluída
- Excluir uma tarefa
- Validar e normalizar os dados recebidos
- Gerar ID e data de criação automaticamente
- Persistir os dados em arquivo JSON
- Retornar status HTTP adequados para cada situação

## Arquitetura

O projeto está organizado em camadas:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

- **Routes:** definem os métodos e caminhos da API.
- **Controllers:** recebem as requisições e definem as respostas HTTP.
- **Services:** concentram as validações e regras de negócio.
- **Repositories:** realizam a leitura e escrita dos dados.
- **Database:** armazena temporariamente as tarefas em um arquivo JSON.

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
git clone https://github.com/nykthedev/taskflow-api.git
```

### 2. Entre na pasta do projeto

```bash
cd taskflow-api
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie o arquivo `.env` usando o `.env.example` como referência:

``env
PORT=3333

### 5. Inicie o servidor

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
| `PATCH` | `/tarefas/:id` | Atualiza parcialmente uma tarefa |
| `PATCH` | `/tarefas/:id/concluir` | Marca uma tarefa como concluída |
| `PATCH` | `/tarefas/:id/reabrir` | Reabre uma tarefa concluída |
| `DELETE` | `/tarefas/:id` | Exclui uma tarefa |

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

## Atualizar uma tarefa

```http
PATCH /tarefas/1
```

Somente os campos enviados serão atualizados:

```json
{
  "titulo": "Estudar Express avançado",
  "prioridade": "alta"
}
```

## Concluir uma tarefa

```http
PATCH /tarefas/1/concluir
```

A tarefa passa a ter:

```json
{
  "concluida": true
}
```

## Reabrir uma tarefa

```http
PATCH /tarefas/1/reabrir
```

A tarefa passa a ter:

```json
{
  "concluida": false
}
```

## Excluir uma tarefa

```http
DELETE /tarefas/1
```

### Resposta de sucesso

```json
{
  "sucesso": true,
  "mensagem": "Tarefa deletada com sucesso",
  "tarefaRemovida": {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Praticar desenvolvimento de APIs",
    "prioridade": "alta",
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
- É normalizado antes de ser salvo

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

A prioridade é normalizada antes do salvamento:

```text
"  ALTA  " → "alta"
```

### Campos gerados pela API

Os seguintes campos são definidos automaticamente:

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
| `400 Bad Request` | Dados ou identificador inválidos |
| `404 Not Found` | Tarefa não encontrada |
| `409 Conflict` | A operação entra em conflito com o estado atual da tarefa |
| `500 Internal Server Error` | Erro interno da aplicação |

## Próximas melhorias

- Filtros por prioridade e status
- Tratamento centralizado de erros
- Middlewares personalizados
- Testes automatizados
- Integração com banco de dados
- Autenticação e autorização
- Deploy da aplicação

## Status do projeto

✅ Primeira versão funcional concluída.

O projeto continuará sendo evoluído com novos recursos e melhorias na arquitetura.

## Autor

Desenvolvido por [Nicollas](https://github.com/nykthedev).
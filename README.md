# 📝 Todo List - Full Stack Application

Sistema completo de gerenciamento de tarefas (To-Do List) com autenticação JWT, desenvolvido seguindo os princípios de **Clean Architecture**.

## 🎯 Desafio

Aplicação Full Stack para gerenciamento de tarefas com:
- ✅ CRUD completo de tarefas
- ✅ Filtros (todas, pendentes, concluídas)
- ✅ Busca por título/descrição
- ✅ Cadastro/Login de usuários
- ✅ Interface responsiva
- ✅ Validação de formulários
- ✅ Tema claro/escuro
- ✅ Persistência com SQLite

## 🏗️ Arquitetura

### Clean Architecture

Ambos backend e frontend seguem o mesmo padrão de Clean Architecture:

```
├── domain/         # Regras de negócio
├── data/           # Implementações remotas
├── infra/          # Adaptadores externos
├── presentation/   # Interface do usuário (Frontend)
├── application/    # Controllers (Backend)
└── main/           # Composition root
```

## 🛠️ Tecnologias

### Backend (`/api`)
- **Node.js** 22 LTS
- **TypeScript** 5.9
- **Express** 5.1
- **SQLite** (better-sqlite3)
- **JWT** (jsonwebtoken)
- **bcrypt** (hash de senhas)
- **Jest** (testes)
- **Swagger/OpenAPI** (documentação)

### Frontend (`/frontend`)
- **Vite** 7.2
- **React** 19
- **TypeScript** 5.6
- **React Bootstrap** 2.10
- **React Router** 7
- **Axios** 1.7
- **Vitest** (testes)

## 🚀 Como Rodar

### Requisitos
- Node.js 20+ (recomendado 22 LTS)
- npm ou yarn

### Backend (API)

```bash
cd api
npm install
npm run dev      # Desenvolvimento (porta 3000)
# ou
npm run build
npm start        # Produção
```

**Endpoints disponíveis:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /tasks` - Listar tarefas (autenticado)
- `POST /tasks` - Criar tarefa (autenticado)
- `PUT /tasks/:id` - Atualizar tarefa (autenticado)
- `DELETE /tasks/:id` - Deletar tarefa (autenticado)
- `GET /healthz` - Health check
- `GET /docs` - Documentação Swagger

### Frontend (React)

```bash
cd frontend
npm install
npm run dev      # Desenvolvimento (porta 3001)
# ou
npm run build
npm run preview  # Produção
```

## 🧪 Testes

### Backend
```bash
cd api
npm test                 # Todos os testes
npm run test:unit        # Testes unitários
npm run test:integration # Testes de integração
npm run test:cov         # Com coverage
```

**Cobertura atual**: 53 testes (33 integração + 20 unitários) - 100% passing

### Frontend
```bash
cd frontend
npm test                 # Testes
npm run test:watch       # Watch mode
npm run test:coverage    # Com coverage
```

## 📱 Funcionalidades

### Autenticação & Segurança
- ✅ Registro de usuários
- ✅ Login com JWT (válido por 24h)
- ✅ Senha criptografada com bcrypt (salt 12)
- ✅ Rotas protegidas (middleware de autenticação)
- ✅ Isolamento de dados por usuário
- ✅ SQL injection protection (prepared statements)
- ✅ Security headers (Helmet)

### Gerenciamento de Tarefas
- ✅ Criar tarefas
- ✅ Listar tarefas
- ✅ Filtrar por status (pendentes/concluídas)
- ✅ Buscar por título/descrição
- ✅ Atualizar tarefas
- ✅ Deletar tarefas
- ✅ Apenas o dono pode ver/editar suas tarefas

### Interface
- ✅ Design responsivo (mobile-first)
- ✅ Tema claro/escuro (persistido)
- ✅ Loading states
- ✅ Tratamento de erros
- ✅ Validação de formulários
- ✅ Feedback visual (alerts, badges)
- ✅ Modals e componentes interativos

## 📁 Estrutura do Projeto

```
challenge/
├── api/                    # Backend Node.js
│   ├── src/
│   │   ├── domain/        # Use cases, entities
│   │   ├── application/   # Controllers, middlewares
│   │   ├── infra/         # Repositórios, gateways
│   │   └── main/          # Factories, rotas
│   ├── tests/             # Testes unitários e integração
│   ├── docs/              # OpenAPI spec
│   └── data/              # SQLite database
│
├── frontend/              # Frontend React
│   ├── src/
│   │   ├── domain/        # Models, use cases
│   │   ├── data/          # Remote implementations
│   │   ├── infra/         # HTTP, cache adapters
│   │   ├── validation/    # Validadores
│   │   ├── presentation/  # Components, pages
│   │   └── main/          # Factories, router
│   └── dist/              # Build de produção
│
└── README.md              # Este arquivo
```

## 🎨 Screenshots

### Login & Register
- Validação em tempo real
- Mensagens de erro claras
- Links entre páginas

### Dashboard de Tarefas
- Filtros (All/Pending/Completed)
- Busca em tempo real
- Cards com badges de status
- Botões de ação (Complete/Delete)
- Modal para criar tarefas

### Tema Claro/Escuro
- Toggle no header
- Persistência em LocalStorage
- Transições suaves

## 🔐 Segurança

### Backend
- Senhas hasheadas com bcrypt (salt 12)
- JWT para autenticação stateless
- Tokens expiram em 24 horas
- Foreign keys para integridade referencial
- Prepared statements (anti SQL injection)
- Helmet para security headers
- Validação de entrada em todas as rotas

### Frontend
- Rotas protegidas (PrivateRoute)
- Token JWT no header Authorization
- Logout limpa localStorage
- Validação client-side
- HTTPS ready

## 📚 Documentação

### Backend
- **README**: `/api/README.md`
- **Swagger**: `http://localhost:3000/docs`
- **TypeDoc**: Todos os arquivos documentados

### Frontend
- **README**: `/frontend/README.md`
- **Comentários**: Componentes principais documentados
- **Type safety**: TypeScript strict mode

## 🎯 Critérios Atendidos

- ✅ **Qualidade do código**: Clean Architecture, SOLID, DRY
- ✅ **Qualidade dos Testes**: 53 testes (backend) + framework configurado (frontend)
- ✅ **Organização**: Estrutura clara seguindo Clean Architecture
- ✅ **Tratamento de erros**: Errors customizados, middleware de erro
- ✅ **UX/UI**: Bootstrap, responsivo, tema claro/escuro
- ✅ **Documentação**: READMEs completos, Swagger, comentários

## 🚀 Deploy

### Backend
```bash
cd api
npm install
npm run build
npm start
```
Porta: 3000

### Frontend
```bash
cd frontend
npm install
npm run build
npm run preview
```
Porta: 3001 (ou use nginx/Apache para servir `dist/`)

### Variáveis de Ambiente

**Backend** (`.env`):
```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
DB_PATH=./data/database.sqlite
NODE_ENV=production
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:3000
```

## 👨‍💻 Desenvolvimento

### Backend
```bash
cd api
npm run dev      # Hot reload com tsx
npm run lint     # Biome linter
npm run format   # Biome formatter
npm test         # Testes
```

### Frontend
```bash
cd frontend
npm run dev      # Hot reload com Vite
npm run lint     # ESLint
npm test         # Vitest
```

## 📊 Métricas

### Backend
- Arquivos: ~70 TypeScript files
- LOC: ~3000+ lines
- Testes: 53 (100% passing)
- Endpoints: 7
- Build size: ~50KB (gzipped)

### Frontend
- Arquivos: ~80 TypeScript/TSX files
- LOC: ~2500+ lines
- Páginas: 3 (Login, Register, TaskList)
- Build size: ~137KB (gzipped)

## 🎉 Conclusão

Sistema completo de gerenciamento de tarefas demonstrando:
- Clean Architecture em backend e frontend
- Autenticação segura com JWT e bcrypt
- CRUD completo com filtros e busca
- Interface moderna e responsiva
- Tema claro/escuro
- Testes automatizados
- Documentação completa
- Type safety com TypeScript
- Boas práticas de segurança

**Pronto para demonstração e deploy em produção!** 🚀

---

Desenvolvido seguindo os padrões de **Clean Architecture**.

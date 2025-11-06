# Todo List API

REST API for task management (To-Do List) developed with Node.js 22 LTS, TypeScript, Express and SQLite.

## Technologies

- **Node.js**: 22 LTS
- **TypeScript**: 5.9.3
- **Express**: 5.1.0
- **SQLite**: via better-sqlite3 11.5.0
- **Helmet**: 8.1.0 (security)
- **Jest**: 30.2.0 (testing)
- **Biome**: 2.3.0 (linter + formatter)
- **Swagger UI**: 5.0.1 (API documentation)

## Features

- ✅ Full CRUD operations for tasks
- ✅ Filter tasks by status (pending, completed)
- ✅ Search tasks by title or description
- ✅ SQLite database for local persistence
- ✅ REST API following best practices
- ✅ Clean Architecture pattern
- ✅ Comprehensive unit and integration tests
- ✅ TypeDoc documentation
- ✅ OpenAPI/Swagger documentation
- ✅ Input validation
- ✅ Error handling

## Requirements

- **Node.js** 22 LTS
- **npm** or **yarn**

## Installation

```bash
npm install
```

## Available Commands

### Development
```bash
npm run dev
```
Starts the server in watch mode with `tsx`.

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` folder.

### Production
```bash
npm start
```
Runs the compiled server from `dist/`.

### Lint and Formatting

```bash
# Check lint and format issues
npm run lint

# Format code automatically
npm run format

# Check and apply fixes on files (used by lint-staged)
npm run lint:staged
```

**Note:** This project uses **Biome** as a unified linter and formatter.

### Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run all tests (unit + integration)
npm run test:all

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run tests in CI mode
npm run test:ci
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The server will be available at `http://localhost:3000`

4. Access the API documentation at `http://localhost:3000/docs`

## API Documentation

After starting the project locally:

- Access `http://localhost:3000/healthz` to check health status
- Access `http://localhost:3000/docs` to view and test the interactive documentation (Swagger UI generated from OpenAPI 3.1)

The `docs/openapi.yaml` file is the API contract. It describes endpoints, payloads, and responses.

## Endpoints

### GET /healthz

Health check endpoint.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST /tasks

Creates a new task with status 'pending'.

**Request:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "status": "pending",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Validation Rules:**
- `title` is required and cannot be empty
- `description` is required and cannot be empty
- `id`, `status`, `createdAt`, and `updatedAt` should not be provided (automatically generated)

**Response (400 Bad Request):**
```json
{
  "error": "The field title is required"
}
```

### GET /tasks

Lists all tasks with optional filters.

**Query Parameters:**
- `status` (optional): Filter by status ("pending" or "completed")
- `search` (optional): Search in title and description

**Examples:**
- `/tasks` - All tasks
- `/tasks?status=pending` - Only pending tasks
- `/tasks?status=completed` - Only completed tasks
- `/tasks?search=groceries` - Tasks containing "groceries" in title or description
- `/tasks?status=pending&search=buy` - Pending tasks containing "buy"

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Study TypeScript",
    "description": "Learn advanced types and generics",
    "status": "completed",
    "createdAt": "2024-01-14T09:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
]
```

### GET /tasks/:id

Loads a specific task by ID.

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "status": "pending",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Task not found"
}
```

### PUT /tasks/:id

Updates a task (title, description, and/or status).

**Request:**
```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples, and bananas",
  "status": "completed"
}
```

**Note:** All fields are optional. You can update only the fields you want to change.

**Response (204 No Content):**
No response body. Status 204 indicates success.

**Validation Rules:**
- At least one field must be provided
- `status` must be "pending" or "completed" if provided
- `title` and `description` cannot be empty strings if provided

**Response (400 Bad Request):**
```json
{
  "error": "status must be one of: \"pending\", \"completed\""
}
```

**Response (404 Not Found):**
```json
{
  "error": "Task not found"
}
```

### DELETE /tasks/:id

Deletes a task by ID.

**Response (204 No Content):**
No response body. Status 204 indicates success.

**Response (404 Not Found):**
```json
{
  "error": "Task not found"
}
```

## Project Structure

```
api/
├── src/
│   ├── application/          # Application layer
│   │   ├── controllers/      # HTTP controllers
│   │   ├── errors/           # Application errors
│   │   ├── helpers/          # HTTP helpers
│   │   └── validation/       # Input validators
│   ├── domain/               # Domain layer (business logic)
│   │   ├── contracts/        # Interfaces and contracts
│   │   │   └── repos/        # Repository contracts
│   │   ├── custom-error.ts   # Custom error class
│   │   └── use-cases/        # Use cases (business rules)
│   ├── infra/                # Infrastructure layer
│   │   └── repos/            # Repository implementations
│   │       └── sqlite/       # SQLite implementation
│   └── main/                 # Main layer (composition root)
│       ├── adapters/         # Express adapters
│       ├── config/           # Application configuration
│       ├── factories/        # Dependency injection factories
│       ├── middlewares/      # Express middlewares
│       ├── routes/           # Route definitions
│       ├── utils/            # Utility functions
│       └── server.ts         # Application entry point
├── tests/                    # Tests (mirrors src structure)
│   ├── application/          # Application layer tests
│   ├── domain/               # Domain layer tests
│   ├── main/                 # Integration tests
│   └── setup-integration.ts  # Test setup
├── docs/
│   └── openapi.yaml          # OpenAPI/Swagger specification
├── data/                     # SQLite database (created automatically)
├── dist/                     # Compiled JavaScript (generated)
├── coverage/                 # Test coverage reports (generated)
├── biome.json                # Biome configuration
├── jest.config.ts            # Jest unit tests configuration
├── jest.integration.config.ts # Jest integration tests configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.build.json       # TypeScript build configuration
├── tsconfig.test.json        # TypeScript test configuration
├── package.json
└── README.md
```

## Clean Architecture

This project follows Clean Architecture principles:

### Layers

1. **Domain Layer** (`src/domain/`)
   - Contains business logic and entities
   - Independent of frameworks and external concerns
   - Defines contracts/interfaces for dependencies

2. **Application Layer** (`src/application/`)
   - Contains controllers and application logic
   - Orchestrates use cases
   - Handles HTTP concerns (validation, error handling)

3. **Infrastructure Layer** (`src/infra/`)
   - Contains implementations of external dependencies
   - Database access (SQLite repository)
   - External services integrations

4. **Main Layer** (`src/main/`)
   - Composition root (dependency injection)
   - Application configuration
   - Routes and server setup

### Dependency Flow

```
Main → Application → Domain
  ↓         ↓
Infra  →  Domain
```

- Main depends on all layers (composition)
- Application depends on Domain
- Infra depends on Domain (implements contracts)
- **Domain depends on nothing** (pure business logic)

## Database

The project uses **SQLite** for local data persistence:

- Database file: `./data/database.sqlite`
- Automatically created on first run
- Schema is initialized automatically
- No migrations needed for this simple project

### Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'completed')),
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## Testing Strategy

### Unit Tests (`.spec.ts`)

- Test individual functions and classes in isolation
- Use mocks for dependencies
- Fast and focused
- Located in `tests/` mirroring `src/` structure

### Integration Tests (`.test.ts`)

- Test complete flows with real database
- Use supertest for HTTP testing
- Test actual API endpoints
- Located in `tests/main/routes/`

### Coverage

The project requires minimum 80% code coverage:
- Lines: 80%
- Functions: 80%
- Branches: 80%

Run `npm run test:cov` to check coverage.

## Code Quality

This project implements a modern quality pipeline using **automated Git hooks** via Husky:

### 🔍 Pre-commit Hook

Automatically executed before each commit, runs **Biome** (linter + formatter) only on modified files via `lint-staged`:

- ✅ Fixes formatting automatically (4-space indent, 100 columns)
- ✅ Organizes imports automatically
- ✅ Applies TypeScript lint rules
- ❌ **Blocks commit** if there are severe non-auto-fixable lint errors

```bash
# The hook runs automatically, but you can execute manually:
npm run lint:staged
```

### 🚀 Pre-push Hook

Automatically executed before each push, runs the **complete test suite with coverage**:

- ✅ Executes all unit tests
- ✅ Generates coverage report (minimum 80%)
- ❌ **Blocks push** if any test fails or coverage < 80%

```bash
# The hook runs automatically, but you can execute manually:
npm run test:cov
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Runtime environment (development/production/test)
- `DB_PATH`: SQLite database path (default: ./data/database.sqlite)
- `DEBUG`: Enable debug mode (default: false)

Create a `.env` file in the root directory if you need to customize:

```env
PORT=3000
NODE_ENV=development
DB_PATH=./data/database.sqlite
DEBUG=false
```

## Troubleshooting

### Database locked error

If you get "database is locked" error:
1. Close all connections to the database
2. Delete the `database.sqlite-wal` and `database.sqlite-shm` files
3. Restart the application

### Tests failing

1. Make sure you're using Node.js 22 LTS
2. Delete `node_modules` and run `npm install` again
3. Run `npm run test:unit` and `npm run test:integration` separately to identify the issue

## License

ISC


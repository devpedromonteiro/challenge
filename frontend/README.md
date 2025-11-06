# Todo App Frontend

Modern Todo List application built with **Vite + React + TypeScript + Bootstrap** following **Clean Architecture** principles.

## 🚀 Technologies

- **Vite** 7.2.0 - Build tool
- **React** 19 - UI library
- **TypeScript** 5.6 - Type safety
- **React Bootstrap** 2.10 - UI components
- **React Router** 7 - Routing
- **Axios** 1.7 - HTTP client
- **Vitest** - Testing framework

## ✨ Features

### Authentication & Security
- ✅ User registration
- ✅ User login with JWT
- ✅ Protected routes
- ✅ Persistent authentication (LocalStorage)

### Task Management
- ✅ Create tasks
- ✅ List tasks
- ✅ Update task status (pending/completed)
- ✅ Delete tasks
- ✅ Filter by status (all, pending, completed)
- ✅ Search by title/description

### UI/UX
- ✅ Responsive design (Bootstrap)
- ✅ Light/Dark theme toggle
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Smooth animations

### Architecture
- ✅ Clean Architecture (Rodrigo Manguinho pattern)
- ✅ Domain-driven design
- ✅ Dependency injection
- ✅ SOLID principles
- ✅ Separation of concerns

## 📁 Project Structure

```
src/
├── domain/              # Business logic & entities
│   ├── models/          # Data models (Task, Account)
│   ├── use-cases/       # Use case interfaces
│   └── errors/          # Domain errors
│
├── data/                # Data layer implementations
│   ├── protocols/       # HTTP & Cache protocols
│   └── use-cases/       # Remote implementations
│
├── infra/               # Infrastructure adapters
│   ├── http/            # Axios adapter
│   └── cache/           # LocalStorage adapter
│
├── validation/          # Validation layer
│   ├── validators/      # Field validators
│   └── errors/          # Validation errors
│
├── presentation/        # UI layer
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── contexts/        # React contexts
│   └── styles/          # Global styles
│
└── main/                # Composition root
    ├── config/          # App configuration
    ├── factories/       # Dependency injection
    └── routes/          # React Router setup
```

## 🛠️ Installation

```bash
npm install
```

## 📝 Available Scripts

### Development
```bash
npm run dev
```
Starts development server on **port 3001** (backend runs on port 3000).

### Build
```bash
npm run build
```
Creates production build in `dist/` folder.

### Preview
```bash
npm run preview
```
Preview production build locally.

### Tests
```bash
npm test               # Run tests once
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
```

### Lint
```bash
npm run lint
```

## 🔗 API Integration

The frontend connects to the backend API running on `http://localhost:3000`.

**Required backend endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /tasks` - List tasks (with filters)
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

All task endpoints require `Authorization: Bearer <token>` header.

## 🎨 Theme Support

The app supports light and dark themes with a toggle button in the header. Theme preference is persisted in LocalStorage.

## 🧪 Testing

Tests are written using Vitest + React Testing Library following Clean Architecture principles.

```bash
npm test
```

## 🏗️ Clean Architecture Layers

### 1. Domain Layer
- **Purpose**: Business logic and entities
- **Dependencies**: None
- **Contains**: Models, Use cases, Domain errors

### 2. Data Layer
- **Purpose**: Data access implementations
- **Dependencies**: Domain
- **Contains**: Remote implementations, HTTP protocols

### 3. Infrastructure Layer
- **Purpose**: External adapters
- **Dependencies**: Data
- **Contains**: Axios adapter, LocalStorage adapter

### 4. Presentation Layer
- **Purpose**: UI components
- **Dependencies**: Domain
- **Contains**: React components, Pages, Contexts

### 5. Main Layer
- **Purpose**: Composition root
- **Dependencies**: All
- **Contains**: Factories, Router, Config

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile (< 768px)
- 📲 Tablet (768px - 992px)
- 💻 Desktop (> 992px)

## 🔐 Authentication Flow

1. User registers at `/register`
2. After registration, automatically logs in
3. JWT token stored in LocalStorage
4. All task requests include Authorization header
5. If token expires, redirects to login
6. User can logout via header button

## 🎯 Task Management Flow

1. After login, user sees task list
2. Click "New Task" to create
3. Filter by status or search
4. Click "Complete" to toggle status
5. Click "Delete" to remove task

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Serve the `dist` folder with any static server:
```bash
npm run preview  # or use nginx, Apache, etc.
```

### Environment Variables (optional):
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

## 📄 License

This project follows the same license as the backend API.

## 👨‍💻 Author

Built following Rodrigo Manguinho's Clean Architecture pattern for React applications.

---

**Note**: Make sure the backend API is running on port 3000 before starting the frontend.

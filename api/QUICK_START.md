# Quick Start Guide

## Prerequisites

- Node.js 22 LTS
- npm or yarn

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

## Testing the API

### Health Check
```bash
curl http://localhost:3000/healthz
```

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "description": "Task description"}'
```

### List All Tasks
```bash
curl http://localhost:3000/tasks
```

### Get Task by ID
```bash
curl http://localhost:3000/tasks/1
```

### Update a Task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## API Documentation

Access Swagger UI at: `http://localhost:3000/docs`

## Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# With coverage
npm run test:cov
```

## Common Issues

### Port already in use
Change the PORT in your environment or `.env` file

### Database errors
Delete the `data/` folder and restart the application

## Next Steps

- Check the [README.md](./README.md) for complete documentation
- Explore the [OpenAPI specification](./docs/openapi.yaml)
- Review the Clean Architecture structure in `src/`

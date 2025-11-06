#!/bin/bash
echo "=== Testing Todo List API ==="
echo ""

echo "1. Health Check..."
curl -s http://localhost:3000/healthz | jq
echo ""

echo "2. Creating a task..."
TASK=$(curl -s -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test CRUD", "description": "Testing all operations"}')
TASK_ID=$(echo $TASK | jq -r '.id')
echo "Created task ID: $TASK_ID"
echo $TASK | jq
echo ""

echo "3. Listing all tasks..."
curl -s http://localhost:3000/tasks | jq 'length'
echo ""

echo "4. Getting task by ID..."
curl -s http://localhost:3000/tasks/$TASK_ID | jq
echo ""

echo "5. Updating task..."
curl -s -X PUT http://localhost:3000/tasks/$TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "completed", "title": "CRUD Test Complete!"}'
echo "Updated!"
echo ""

echo "6. Verifying update..."
curl -s http://localhost:3000/tasks/$TASK_ID | jq '{title, status}'
echo ""

echo "7. Filtering completed tasks..."
curl -s "http://localhost:3000/tasks?status=completed" | jq 'length'
echo ""

echo "8. Searching tasks..."
curl -s "http://localhost:3000/tasks?search=CRUD" | jq 'length'
echo ""

echo "9. Deleting task..."
curl -s -X DELETE http://localhost:3000/tasks/$TASK_ID
echo "Deleted!"
echo ""

echo "10. Verifying deletion..."
curl -s http://localhost:3000/tasks/$TASK_ID | jq
echo ""

echo "=== All tests completed! ==="

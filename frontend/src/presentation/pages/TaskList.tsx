import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Alert, Modal } from 'react-bootstrap'
import type { LoadTasks, AddTask, UpdateTask, DeleteTask } from '@/domain/use-cases'
import type { TaskModel, TaskStatus } from '@/domain/models'

type Props = {
  loadTasks: LoadTasks
  addTask: AddTask
  updateTask: UpdateTask
  deleteTask: DeleteTask
}

export const TaskList: React.FC<Props> = ({ loadTasks, addTask, updateTask, deleteTask }) => {
  const [tasks, setTasks] = useState<TaskModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'' | TaskStatus>('')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  const loadData = async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await loadTasks.loadAll({
        status: filter || undefined,
        search: search || undefined
      })
      setTasks(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [filter, search])

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) return
    try {
      await addTask.add(newTask)
      setNewTask({ title: '', description: '' })
      setShowModal(false)
      loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleToggleStatus = async (task: TaskModel) => {
    try {
      await updateTask.update({
        id: task.id,
        status: task.status === 'pending' ? 'completed' : 'pending'
      })
      loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure?')) return
    try {
      await deleteTask.delete({ id })
      loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>My Tasks</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShowModal(true)}>+ New Task</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={filter} onChange={e => setFilter(e.target.value as any)}>
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && <div className="text-center"><Spinner animation="border" /></div>}

      <Row>
        {tasks.map(task => (
          <Col key={task.id} md={6} lg={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Badge bg={task.status === 'completed' ? 'success' : 'warning'}>
                  {task.status}
                </Badge>
                <div className="mt-3">
                  <Button size="sm" onClick={() => handleToggleStatus(task)} className="me-2">
                    {task.status === 'completed' ? 'Reopen' : 'Complete'}
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask.title}
                onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

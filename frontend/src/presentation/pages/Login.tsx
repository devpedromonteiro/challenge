import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import type { Authentication } from '@/domain/use-cases'
import { useAuth } from '@/presentation/contexts'
import type { ValidationComposite } from '@/validation/validators'

type Props = {
  authentication: Authentication
  validation: ValidationComposite
}

export const Login: React.FC<Props> = ({ authentication, validation }) => {
  const { setAccount } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleChange = (field: string, value: string) => {
    setState(prev => ({ ...prev, [field]: value }))
    const errorMessage = validation.validate(field, { ...state, [field]: value })
    setErrors(prev => ({ ...prev, [field]: errorMessage || '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading || errors.email || errors.password) return

    setIsLoading(true)
    setError('')

    try {
      const account = await authentication.auth(state)
      setAccount(account)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={state.email}
                onChange={e => handleChange('email', e.target.value)}
                isInvalid={!!errors.email}
                disabled={isLoading}
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={state.password}
                onChange={e => handleChange('password', e.target.value)}
                isInvalid={!!errors.password}
                disabled={isLoading}
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoading || !!errors.email || !!errors.password}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}


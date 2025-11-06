import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '@/presentation/contexts'

export const Header: React.FC = () => {
  const { account, setAccount, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    setAccount(null)
    navigate('/login')
  }

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">📝 Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="me-3"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            {isAuthenticated && (
              <>
                <span className="me-3">Welcome, {account?.name}!</span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


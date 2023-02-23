import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Greeting } from '../greeting/greeting'

export const NaviBar = ({ user, token, onLoggedOut }) => {
  return (
    <Navbar className="bg txt" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Greeting />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <span className="txt">Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/users/${user.Username}">
                  <span className="txt">Profile</span>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <span className="txt">Logout</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
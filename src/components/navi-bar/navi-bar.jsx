import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Greeting } from '../greeting/greeting'

export const NaviBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="bg txt" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Greeting />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav txt" />
        <Navbar.Collapse id="basic-navbar-nav txt">
          <Nav>
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <span className="txt">Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to={'/users/'+user.Username}>
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
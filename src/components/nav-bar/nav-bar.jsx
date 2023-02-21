import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Greeting } from "../greeting/greeting"

export const NavBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Greeting />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>Movies</Link>
            <Link to={`/users/${encodeURIComponent(user.id)}`}>Profile</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../auth/AuthContext";

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Learn by Index
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/files" href="#features">
              My Files
            </Nav.Link>
            <Nav.Link as={Link} to="/library" href="#features">
              Library
            </Nav.Link>
            <Nav.Link as={Link} to="/stats" href="#features">
              Stats
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            {!user ? (
              <>
                <Button as={Link} to="/login" variant="outline-success">
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-secondary"
                  className="ms-2"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

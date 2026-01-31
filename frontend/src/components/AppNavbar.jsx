import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useAuth } from "../auth/AuthContext";

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const ProtectedNavLink = ({ to, children }) => {
    const disabled = !user;

    const link = (
      <span className={disabled ? "d-inline-block" : ""}>
        <Nav.Link
          as={Link}
          to={disabled ? "#" : to}
          disabled={disabled}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
          style={disabled ? { pointerEvents: "none" } : {}}
        >
          {children}
        </Nav.Link>
      </span>
    );

    if (!disabled) return link;

    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>need to be logged in</Tooltip>}
      >
        {link}
      </OverlayTrigger>
    );
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
            <ProtectedNavLink to="/files">My Files</ProtectedNavLink>
            <ProtectedNavLink to="/library">Library</ProtectedNavLink>
            <ProtectedNavLink to="/stats">Stats</ProtectedNavLink>
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
                <Navbar.Text className="me-3">
                  <strong>{user.username}</strong>
                </Navbar.Text>
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

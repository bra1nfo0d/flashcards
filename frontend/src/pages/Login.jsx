import AppNavbar from "../components/AppNavbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  //  const passwordRef = useRef(null);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setStatus("Sending request...");

    emailRef.current?.setCustomValidity("");
    //    passwordRef.current?.setCustomValidity("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        navigate("/");
        return;
      }

      if (res.status === 401) {
        emailRef.current.setCustomValidity("Email or password is wrong.");
        emailRef.current.reportValidity();
        return;
      }

      setStatus(data.message || "Login failed");
    } catch (err) {
      console.log(err);
      setStatus("Request failed.");
    }
  };

  return (
    <>
      <AppNavbar />
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <Card border="success" style={{ width: "25rem" }}>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleClick}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    emailRef.current?.setCustomValidity("");
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    emailRef.current?.setCustomValidity("");
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
      </Container>
    </>
  );
}

export default Login;

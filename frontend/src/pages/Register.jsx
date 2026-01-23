import AppNavbar from "../components/AppNavbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setStatus("Sending request...");

    emailRef.current?.setCustomValidity("");
    usernameRef.current?.setCustomValidity("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          repeatPassword: repeatPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
        return;
      }

      if (res.status === 409) {
        if (data.field === "email") {
          emailRef.current.setCustomValidity("This email is already taken.");
          emailRef.current.reportValidity();
        }
        if (data.field === "username") {
          usernameRef.current.setCustomValidity(
            "This username is already taken.",
          );
          usernameRef.current.reportValidity();
        }
        return;
      }

      setStatus(data.message || "Register failed");
    } catch (err) {
      console.log(err);
      setStatus("Request failed");
    }
  };

  return (
    <>
      <AppNavbar />
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <Card border="secondary" style={{ width: "25rem" }}>
          <Card.Header>Register</Card.Header>
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

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  ref={usernameRef}
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    usernameRef.current?.setCustomValidity("");
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicShowPassword">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  isInvalid={
                    repeatPassword.length > 0 && password !== repeatPassword
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicShowRepeatPassword"
              >
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showRepeatPassword}
                  onChange={(e) => setShowRepeatPassword(e.target.checked)}
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

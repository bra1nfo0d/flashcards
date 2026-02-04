import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { createStack } from "../../api/stacks";

export default function CreatingFolderForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    const stack = await createStack({
      name,
      description,
    });
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div>
          <Card border="primary" style={{ width: "40rem", height: "20rem" }}>
            <Card.Header>Ordner konfigurieren</Card.Header>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <InputGroup className="mb-3">
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <Card.Title>Beschreibung</Card.Title>
              <Form.Control
                value={description}
				onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                aria-label="With textarea"
              />
              <Button className="mt-3" variant="primary">
                Bestaetigen
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="mt-5">
          <Card border="secondary" style={{ width: "18rem" }}>
            <Card.Header>Ordner</Card.Header>
            <Card.Body>
              <Card.Title>Ordner Name</Card.Title>
              <Card.Text>
                Ordner-Beschreibung. Diese Beschreibung enthaelt den Text von
                oben.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

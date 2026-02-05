import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { createStack } from "../../api/stacks";

export default function CreatingStackFrom({ onCreated, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    const created = await createStack({
      name,
      description,
    });
    onCreated?.(created.id);
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div>
          <Card border="primary" style={{ width: "40rem", height: "20rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                Stapel konfigurieren
                <CloseButton aria-label="Hide" onClick={onClose} />
              </div>
            </Card.Header>
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
              <Button onClick={handleSubmit} className="mt-3" variant="primary">
                Bestätigen
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="mt-5">
          <Card border="secondary" style={{ width: "18rem" }}>
            <Card.Header>Stapel</Card.Header>
            <Card.Body>
              <Card.Title>{name || "Stapel-Name"}</Card.Title>
              <Card.Text>{description || "Beschreibung des Stapels"}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

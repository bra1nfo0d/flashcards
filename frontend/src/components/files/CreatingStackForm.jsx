import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

export default function CreatingStackFrom() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div>
          <Card border="primary" style={{ width: "40rem", height: "20rem" }}>
            <Card.Header>Stapel konfigurieren</Card.Header>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <Card.Title>Beschreibung</Card.Title>
              <Form.Control as="textarea" aria-label="With textarea" />
              <Button className="mt-3" variant="primary">
                Bestaetigen
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="mt-5">
          <Card border="secondary" style={{ width: "18rem" }}>
            <Card.Header>Stapel</Card.Header>
            <Card.Body>
              <Card.Title>Stapel-Name</Card.Title>
              <Card.Text>
                Stapel-Beschreibung. Diese Beschreibung enthaelt den Text von
                oben.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

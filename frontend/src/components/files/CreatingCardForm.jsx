import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

export default function CreatingCardForm({ stackId, onClose }) {
  const [frontHeader, setFrontHeader] = useState("");
  const [frontText, setFrontText] = useState("");
  const [backHeader, setBackHeader] = useState("");
  const [backText, setBackText] = useState("");
  const [editSide, setEditSide] = useState("front");

  const isFront = editSide === "front";
  const headerValue = isFront ? frontHeader : backHeader;
  const setHeaderValue = isFront ? setFrontHeader : setBackHeader;
  const textValue = isFront ? frontText : backText;
  const setTextValue = isFront ? setFrontText : setBackText;

  function handleSubmit() {
    console.log({ stackId, frontHeader, frontText, backHeader, backText });
  }

  function handleConfirmSide() {
    if (editSide === "front") {
      setEditSide("back");
      return;
    } else {
      handleSubmit();
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div>
          <Card border="primary" style={{ width: "40rem", height: "20rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                {isFront ? "Frontseite Erstellen" : "Rückseite Erstellen"}
                <CloseButton aria-label="Hide" />
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Überschrift</Card.Title>
              <InputGroup className="mb-3">
                <Form.Control
                  value={headerValue}
                  onChange={(e) => setHeaderValue(e.target.value)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <Card.Title>Inhalt</Card.Title>
              <Form.Control
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                as="textarea"
                aria-label="With textarea"
              />
              <Button
                onClick={handleConfirmSide}
                className="mt-3"
                variant="primary"
              >
                Bestätigen
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="mt-5">
          <Card border="secondary" style={{ width: "18rem" }}>
            <Card.Header>Frontseite</Card.Header>
            <Card.Body>
              <Card.Title>{frontHeader || "Überschrift"}</Card.Title>
              <Card.Text>{frontText || "Inhalt"}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="mt-5">
          <Card border="secondary" style={{ width: "18rem" }}>
            <Card.Header>Rückseite</Card.Header>
            <Card.Body>
              <Card.Title>{backHeader || "Überschrift"}</Card.Title>
              <Card.Text>{backText || "Inhalt"}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

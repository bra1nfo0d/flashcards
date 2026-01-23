import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

function FlashCard() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <ProgressBar>
          <ProgressBar striped variant="success" now={35} key={1} />
          <ProgressBar variant="warning" now={20} key={2} />
          <ProgressBar striped variant="danger" now={10} key={3} />
        </ProgressBar>

        <Card border="dark" style={{ width: "30rem" }}>
          <Card.Header>Front Side</Card.Header>
          <Card.Body>
            <Card.Title>Light Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="dark" style={{ width: "30rem" }}>
          <Card.Header>Back Side</Card.Header>
          <Card.Body>
            <Card.Title>Light Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        {!isRevealed ? (
          <Button variant="secondary" size="lg" onClick={() => setIsRevealed(true)}>
            Reveal
          </Button>
        ) : (
          <div className="d-flex gap-2">
            <Button variant="success" size="lg" onClick={() => setIsRevealed(false)}>
              Correct
            </Button>
            <Button variant="danger" size="lg" onClick={() => setIsRevealed(false)}>
              Wrong
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default FlashCard;

import { useState, useMemo } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

const introFalshCards = [
  {
    id: 1,
    frontTitel: "Frontseite",
    frontText: "Text 1",
    backTitle: "Rueckseite",
    backText: "Antwort 1",
  },
  {
    id: 2,
    frontTitel: "Frontseite",
    frontText: "Text 2",
    backTitle: "Rueckseite",
    backText: "Antwort 2",
  },
  {
    id: 3,
    frontTitel: "Frontseite",
    frontText: "Text 3",
    backTitle: "Rueckseite",
    backText: "Antwort 3",
  },
  {
    id: 4,
    frontTitel: "Frontseite",
    frontText: "Text 4",
    backTitle: "Rueckseite",
    backText: "Antwort 4",
  },
  {
    id: 5,
    frontTitel: "Frontseite",
    frontText: "Text 5",
    backTitle: "Rueckseite",
    backText: "Antwort 5",
  },
  {
    id: 6,
    frontTitel: "Frontseite",
    frontText: "Text 6",
    backTitle: "Rueckseite",
    backText: "Antwort 6",
  },
  {
    id: 7,
    frontTitel: "Frontseite",
    frontText: "Text 7",
    backTitle: "Rueckseite",
    backText: "Antwort 7",
  },
  {
    id: 8,
    frontTitel: "Frontseite",
    frontText: "Text 8",
    backTitle: "Rueckseite",
    backText: "Antwort 8",
  },
  {
    id: 9,
    frontTitel: "Frontseite",
    frontText: "Text 9",
    backTitle: "Rueckseite",
    backText: "Antwort 9",
  },
  {
    id: 10,
    frontTitel: "Frontseite",
    frontText: "Text 10",
    backTitle: "Rueckseite",
    backText: "Antwort 10",
  },
];

function insertAtOrEnd(arr, item, index) {
  const safeIndex = Math.min(Math.max(index, 0), arr.length);
  const copy = arr.slice();
  copy.splice(safeIndex, 0, item);
  return copy;
}

function FlashCard() {
  const totalCards = introFalshCards.length;
  const [queue, setQueue] = useState(introFalshCards);
  





  const [active, setActive] = useState(introFalshCards);
  const [finished, setFinished] = useState([]);
  const [good, setGood] = useState([]);
  const [hard, setHard] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const current = active[0];
  const total = introFalshCards.length;

  const handleAnswer = (type) => {
    if (!current) return;

    setIsRevealed(false);

    setActive((prev) => prev.slice(1));

    if (type === "finished") setFinished((p) => [...p, current]);
    if (type === "good") setGood((p) => [...p, current]);
    if (type === "hard") setHard((p) => [...p, current]);
    if (type === "wrong") setWrong((p) => [...p, current]);
  };

  const perc = (n) => (n / total) * 100;

  if (!current) {
    return <h3>All Cards Finished</h3>;
  }

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <ProgressBar>
          <ProgressBar variant="primary" now={perc(finished.length)} key={0} />
          <ProgressBar variant="success" now={perc(good.length)} key={1} />
          <ProgressBar variant="warning" now={perc(hard.length)} key={2} />
          <ProgressBar variant="danger" now={perc(wrong.length)} key={3} />
        </ProgressBar>

        {/* FRONT */}
        <Card border="dark" style={{ width: "30rem" }}>
          <Card.Header>Front Side</Card.Header>
          <Card.Body style={{ minHeight: "160px" }}>
            <Card.Title>{current.frontTitel}</Card.Title>
            <Card.Text>{current.frontText}</Card.Text>
          </Card.Body>
        </Card>

        {/* BACK */}
        <Card border="dark" style={{ width: "30rem" }}>
          <Card.Header>Back Side</Card.Header>
          <Card.Body style={{ minHeight: "160px" }}>
            <Card.Title
              style={{ visibility: isRevealed ? "visible" : "hidden" }}
            >
              {current.backTitel}
            </Card.Title>
            <Card.Text
              style={{ visibility: isRevealed ? "visible" : "hidden" }}
            >
              {current.backText}
            </Card.Text>
          </Card.Body>
        </Card>

        {!isRevealed ? (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsRevealed(true)}
          >
            Reveal
          </Button>
        ) : (
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleAnswer("finished")}
            >
              Fertig
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => handleAnswer("good")}
            >
              Gut
            </Button>
            <Button
              variant="warning"
              size="lg"
              onClick={() => handleAnswer("hard")}
            >
              Schwer
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={() => handleAnswer("wrong")}
            >
              Falsch
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default FlashCard;

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

function FlashCard() {
  const [queue, setQueue] = useState(introFalshCards);
  const [isRevealed, setIsRevealed] = useState(false);
  const current = queue[0];

  // perc values
  const [finishedArr, setFinishedArr] = useState([]);
  const [goodArr, setGoodArr] = useState([]);
  const [hardArr, setHardArr] = useState([]);
  const [wrongArr, setWrongArr] = useState([]);
  const totalCards = introFalshCards.length;

  function handleAnswer(type) {
    setIsRevealed(false);

    const [card, ...rest] = queue;
    setQueue(rest);

    if (!(type === "finished")) {
      const distance =
        type === "good" ? 10 : type === "hard" ? 5 : type === "wrong" ? 3 : 0;
      findSaveIndex(distance, card);
    }
    calcPerc(current.id, type);
  }

  function findSaveIndex(targetIndex, card) {
    if (targetIndex > queue.length) {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        newQueue.splice(queue.length, 0, card);
        return newQueue;
      });
    } else {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        newQueue.splice(targetIndex, 0, card);
        return newQueue;
      });
    }
  }

  function changeAnswerStack(id, type) {
    if (type === "finished") {
      setFinishedArr((prevArr) => [...prevArr, id]);
    } else if (type === "good") {
      setGoodArr((prevArr) => [...prevArr, id]);
    } else if (type === "hard") {
      setHardArr((prevArr) => [...prevArr, id]);
    } else if (type === "wrong") {
      setWrongArr((prevArr) => [...prevArr, id]);
    }
  }

  function removeIdFromAllStacks(id) {
    setFinishedArr((prevArr) => prevArr.filter((x) => x !== id));
    setGoodArr((prevArr) => prevArr.filter((x) => x !== id));
    setHardArr((prevArr) => prevArr.filter((x) => x !== id));
    setWrongArr((prevArr) => prevArr.filter((x) => x !== id));
  }

  function calcPerc(id, type) {
    removeIdFromAllStacks(id);
    changeAnswerStack(id, type);
  }

  if (!current) {
    return <h3>Finished</h3>;
  }

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <ProgressBar>
          <ProgressBar
            variant="primary"
            now={Math.round((finishedArr.length * 100) / totalCards)}
            key={0}
            label={`${Math.round((finishedArr.length * 100) / totalCards)}%`}
          />
          <ProgressBar
            variant="success"
            now={Math.round((goodArr.length * 100) / totalCards)}
            key={1}
            label={`${Math.round((goodArr.length * 100) / totalCards)}%`}
          />
          <ProgressBar
            variant="warning"
            now={Math.round((hardArr.length * 100) / totalCards)}
            key={2}
            label={`${Math.round((hardArr.length * 100) / totalCards)}%`}
          />
          <ProgressBar
            variant="danger"
            now={Math.round((wrongArr.length * 100) / totalCards)}
            key={3}
            label={`${Math.round((wrongArr.length * 100) / totalCards)}%`}
          />
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
              {current.backTitle}
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

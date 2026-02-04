import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

function FlashCard({ cards }) {
  const [queue, setQueue] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setQueue(cards);
    setIsRevealed(false);
  }, [cards]);

  const current = queue[0];

  // perc values
  const [finishedArr, setFinishedArr] = useState([]);
  const [goodArr, setGoodArr] = useState([]);
  const [hardArr, setHardArr] = useState([]);
  const [wrongArr, setWrongArr] = useState([]);
  const totalCards = cards.length;

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
            <Card.Title>{current.front_header}</Card.Title>
            <Card.Text>{current.front_text}</Card.Text>
          </Card.Body>
        </Card>

        {/* BACK */}
        <Card border="dark" style={{ width: "30rem" }}>
          <Card.Header>Back Side</Card.Header>
          <Card.Body style={{ minHeight: "160px" }}>
            <Card.Title
              style={{ visibility: isRevealed ? "visible" : "hidden" }}
            >
              {current.back_header}
            </Card.Title>
            <Card.Text
              style={{ visibility: isRevealed ? "visible" : "hidden" }}
            >
              {current.back_text}
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
          <div className="d-flex gap-2 w-100">
            <Button
              className="flex-fill"
              variant="primary"
              size="lg"
              onClick={() => handleAnswer("finished")}
            >
              Fertig
            </Button>
            <Button
              className="flex-fill"
              variant="success"
              size="lg"
              onClick={() => handleAnswer("good")}
            >
              Gut
            </Button>
            <Button
              className="flex-fill"
              variant="warning"
              size="lg"
              onClick={() => handleAnswer("hard")}
            >
              Schwer
            </Button>
            <Button
              className="flex-fill"
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

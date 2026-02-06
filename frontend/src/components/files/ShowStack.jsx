import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getStackById } from "../../api/stacks";

export default function ShowStack({ stackId, onBack }) {
  const [stack, setStack] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");
      setStack(null);

      try {
        const data = await getStackById(stackId);
        setStack(data.result ?? data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (stackId) load();
  }, [stackId]);

  if (error) return <div className="text-danger">{error}</div>;
  if (!stack) return <div>Loading...</div>;

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Stapel</Card.Header>
          <Card.Body>
            <Card.Title>{stack.name}</Card.Title>
            <Card.Text>{stack.description || "Keine Beschreibung"}</Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="outline-primary">Lernen</Button>
              <Button onClick={onBack} variant="outline-secondary">Zurück</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

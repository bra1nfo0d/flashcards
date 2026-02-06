import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import { getStackById } from "../../api/stacks";
import { useNavigate } from "react-router-dom";

export default function ShowStack({ stackId, onBack }) {
  const navigate = useNavigate();
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
          <Card.Header>
            <div className="d-flex justify-content-between">
              Stapel
              <CloseButton aria-label="Hide" onClick={onBack} />
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>{stack.name}</Card.Title>
            <Card.Text>{stack.description || "Keine Beschreibung"}</Card.Text>

            <Button
              onClick={() => {
                localStorage.setItem("learnStackId", stackId);
                navigate("/");
              }}
              variant="outline-primary"
            >
              Lernen
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

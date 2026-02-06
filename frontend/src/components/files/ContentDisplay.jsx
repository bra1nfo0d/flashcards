import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { getAllFolders } from "../../api/folders";
import { getAllStacks } from "../../api/stacks";

export default function ContentDisplay({ onStackClick }) {
  const [folders, setFolders] = useState([]);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    async function getAllContent() {
      const foldersData = await getAllFolders([]);
      const stacksData = await getAllStacks([]);

      console.log(foldersData);

      setFolders(foldersData.result ?? []);
      setStacks(stacksData.result ?? []);
    }

    getAllContent();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            border="primary"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => console.log("folder_id:", folder.id)}
            className="shadow-sm"
          >
            <Card.Header>Ordner</Card.Header>
            <Card.Body>
              <Card.Title>{folder.name}</Card.Title>
              <Card.Text>
                {folder.description || "Keine Beschreibung"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        {stacks.map((stack) => (
          <Card
            key={stack.id}
            border="primary"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => onStackClick?.(stack.id)}
            className="shadow-sm"
          >
            <Card.Header>Stapel</Card.Header>
            <Card.Body>
              <Card.Title>{stack.name}</Card.Title>
              <Card.Text>{stack.description || "Keine Beschreibung"}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

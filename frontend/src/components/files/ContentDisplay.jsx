import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
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
          <Card key={folder.id} border="primary" style={{ width: "18rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                Ordner
                <Pencil
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log("edit Folder")}
                />
              </div>
            </Card.Header>
            <Card.Body
              style={{ cursor: "pointer" }}
              onClick={() => onStackClick?.(folder.id)}
              className="shadow-sm"
            >
              <Card.Title>{folder.name}</Card.Title>
              <Card.Text>
                {folder.description || "Keine Beschreibung"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        {stacks.map((stack) => (
          <Card key={stack.id} border="primary" style={{ width: "18rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                Stapel
                <Pencil
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log("edit Folder")}
                />
              </div>
            </Card.Header>
            <Card.Body
              style={{ cursor: "pointer" }}
              onClick={() => onStackClick?.(stack.id)}
              className="shadow-sm"
            >
              <Card.Title>{stack.name}</Card.Title>
              <Card.Text>{stack.description || "Keine Beschreibung"}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

import { useState, useEffect, useMemo } from "react";
import { Trash2 } from "lucide-react";
import Card from "react-bootstrap/Card";
import { getAllFolders, deleteFolder } from "../../api/folders";
import { getAllStacks, deleteStack } from "../../api/stacks";

export default function ContentDisplay({
  onStackClick,
  selectedFolderId,
  onFolderSelected,
  key,
}) {
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

  async function handleDeleteFolder(id) {
    await deleteFolder(id);
    setFolders((prev) => prev.filter((s) => s.id !== id));

    if (selectedFolderId === id) onFolderSelected(null);
  }

  async function handleDeleteStack(id) {
    await deleteStack(id);
    setStacks((prev) => prev.filter((s) => s.id !== id));
  }

  const visibleFolders = useMemo(() => {
    return folders.filter((f) =>
      selectedFolderId === null
        ? f.parent_folder_id == null
        : f.parent_folder_id === selectedFolderId,
    );
  }, [folders, selectedFolderId]);

  const visibleStacks = useMemo(() => {
    return stacks.filter((s) =>
      selectedFolderId === null
        ? s.folder_id == null
        : s.folder_id === selectedFolderId,
    );
  }, [stacks, selectedFolderId]);

  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {visibleFolders.map((folder) => (
          <Card key={folder.id} border="primary" style={{ width: "18rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                Ordner
                <Trash2
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteFolder(folder.id)}
                />
              </div>
            </Card.Header>
            <Card.Body
              style={{ cursor: "pointer" }}
              onClick={() => onFolderSelected(folder.id)}
              className="shadow-sm"
            >
              <Card.Title>{folder.name}</Card.Title>
              <Card.Text>
                {folder.description || "Keine Beschreibung"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        {visibleStacks.map((stack) => (
          <Card key={stack.id} border="primary" style={{ width: "18rem" }}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                Stapel
                <Trash2
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteStack(stack.id)}
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

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import AppNavbar from "../components/common/AppNavbar";
import CreatingStackFrom from "../components/files/CreatingStackForm";

export default function Files() {
  const [isCreatingStack, setIsCreatingStack] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const [flashCardName, setFlashCardName] = useState("");
  const [flashCardDiscripton, setFlashCardDiscription] = useState("");

  function handleCreatingButton(type) {
    if (type === "stack" && isCreatingFolder) {
      console.log("Warning");
    } else if (type === "folder" && isCreatingStack) {
      console.log("Warning");
    } else {
      if (type === "stack") setIsCreatingStack(true);
      if (type === "folder") setIsCreatingFolder(true);
    }
  }

  return (
    <>
      <AppNavbar />
      <div
        className="pt-5 mt-5 d-flex justify-content-between"
        style={{ margin: "40px" }}
      >
        <div>
          <InputGroup className="">
            <Button
              variant="outline-secondary"
              onClick={() => handleCreatingButton("stack")}
            >
              +Karten
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => handleCreatingButton("folder")}
            >
              +Ordner
            </Button>
            <Form.Control
              className="form-control"
              style={{ width: "400px" }}
              aria-label="Example text with two button addons"
              placeholder="Suchen"
            />
          </InputGroup>
        </div>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <CreatingStackFrom />
    </>
  );
}

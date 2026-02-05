import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function FilesNavbar({ onCreateClick }) {
  return (
    <>
      <div
        className="pt-5 mt-5 d-flex justify-content-between"
        style={{ margin: "40px" }}
      >
        <div>
          <InputGroup className="">
            <Button
              variant="outline-secondary"
              onClick={() => onCreateClick("stack")}
            >
              +Stapel
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => onCreateClick("folder")}
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
    </>
  );
}

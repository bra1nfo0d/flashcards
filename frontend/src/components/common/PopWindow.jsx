import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function PopWindow({ show, onButtonClick }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onButtonClick(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onButtonClick(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => onButtonClick(true)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

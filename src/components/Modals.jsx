import { Modal } from "react-bootstrap";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

export const AddCarModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddForm />
      </Modal.Body>
    </Modal>
  );
};

export const EditCarModal = ({ show, car, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditForm theCar={car} />
      </Modal.Body>
    </Modal>
  );
};

export default AddCarModal;

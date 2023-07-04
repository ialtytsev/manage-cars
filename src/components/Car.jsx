import { useContext, useEffect } from "react";
import { CarContext } from "../contexts/CarContext";
import { Dropdown } from "react-bootstrap";
import { EditCarModal, DeleteModal } from "./Modals";
import { useModal } from "../hooks/useModal";

const Car = ({ car }) => {
  const { deleteCar } = useContext(CarContext);
  
  const { show: showEditModal, handleShow: handleShowEditModal, handleClose: handleCloseEditModal } = useModal();
  const { show: showDeleteModal, handleShow: handleShowDeleteModal, handleClose: handleCloseDeleteModal } = useModal();

  useEffect(() => {
    handleCloseEditModal();
    handleCloseDeleteModal();
  }, [car]);

  const handleDelete = (id) => {
    deleteCar(id);
  };

  return (
    <>
      <td>{car.car}</td>
      <td>{car.car_model}</td>
      <td>{car.car_vin}</td>
      <td>{car.car_color}</td>
      <td>{car.car_model_year}</td>
      <td>{`$${car.price}`}</td>
      <td>{car.availability ? "Available" : "Not Available"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShowEditModal}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleShowDeleteModal}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>

      <EditCarModal
        show={showEditModal}
        car={car}
        handleClose={handleCloseEditModal}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => handleDelete(car.id)}
      />
    </>
  );
};

export default Car;

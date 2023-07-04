import { useContext, useState, useEffect } from "react";
import { CarContext } from "../contexts/CarContext";
import { Dropdown } from "react-bootstrap";
import { EditCarModal } from "./Modals";

const Car = ({ car }) => {
  const { deleteCar } = useContext(CarContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
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
      <td>{car.price}</td>
      <td>{car.availability ? "Available" : "Not Available"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(car.id)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>

      <EditCarModal show={show} car={car} handleClose={handleClose} />
    </>
  );
};

export default Car;

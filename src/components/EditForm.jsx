import { Form, Button } from "react-bootstrap";
import { CarContext } from "../contexts/CarContext";
import { useContext, useEffect, useRef, useState } from "react";

const EditForm = ({ theCar }) => {
  const id = theCar.id;

  const [car, setCar] = useState(theCar.car);
  const [car_model, setCarModel] = useState(theCar.car_model);
  const [car_vin, setCarVin] = useState(theCar.car_vin);
  const [car_color, setCarColor] = useState(theCar.car_color);
  const [car_model_year, setCarModelYear] = useState(theCar.car_model_year);
  const [price, setPrice] = useState(theCar.price);
  const [availability, setAvailability] = useState(theCar.availability);

  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  const { updateCar } = useContext(CarContext);

  const handleColorChange = (e) => {
    const color = e.target.value;
    const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);
    setCarColor(capitalizedColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPrice = /^\d+$/.test(price)
      ? parseFloat(price).toFixed(2)
      : price;

    const updatedCar = {
        id,
        car,
        car_model,
        car_vin,
        car_color,
        car_model_year,
        price: formattedPrice,
        availability,
    };

    updateCar(id, updatedCar);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Car *"
          name="car"
          value={car}
          onChange={(e) => setCar(e.target.value)}
          required
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Model</Form.Label>
        <Form.Control
          type="text"
          placeholder="Car Model *"
          name="car_model"
          value={car_model}
          onChange={(e) => setCarModel(e.target.value)}
          required
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>VIN Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Car VIN"
          name="car_vin"
          value={car_vin}
          onChange={(e) => setCarVin(e.target.value)}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Color</Form.Label>
        <Form.Control
        ref={firstInputRef}
          type="text"
          placeholder="Car Color"
          name="car_color"
          value={car_color}
          onChange={handleColorChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="Car Model Year"
          name="car_model_year"
          value={car_model_year}
          onChange={(e) => setCarModelYear(e.target.value)}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Price $</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Availability"
          name="availability"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button variant="success" type="submit">
        Edit Car
      </Button>
      </div>
    </Form>
  );
};

export default EditForm;

import { Form, Button } from "react-bootstrap";
import { CarContext } from "../contexts/CarContext";
import { useContext, useState } from "react";

const AddForm = () => {
  const { addCar } = useContext(CarContext);

  const [newCar, setNewCar] = useState({
    car: "",
    car_model: "",
    car_vin: "",
    car_color: "",
    car_model_year: "",
    price: "",
    availability: false,
  });

  const [vinError, setVinError] = useState("");
  const [yearError, setYearError] = useState("");

  const onInputChange = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.name === "car" || e.target.name === "car_color") {
      // Allow only letters (uppercase and lowercase) and whitespace
      value = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (
      e.target.name === "car" ||
      e.target.name === "car_model" ||
      e.target.name === "car_color"
    ) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (e.target.name === "car_vin") {
      value = value.toUpperCase();
      if (value.length > 17) {
        value = value.slice(0, 17);
      }
      if (value.length !== 17) {
        setVinError("VIN should be exactly 17 characters long.");
      } else {
        setVinError("");
      }
    }

    e.target.name === "car_model_year" && value.length !== 4
      ? setYearError("Year format: xxxx")
      : setYearError("");

    if (e.target.name === "price") {
      // Allow only non-negative numbers
      value = value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    }

    setNewCar({ ...newCar, [e.target.name]: value });
  };

  const {
    car,
    car_model,
    car_vin,
    car_color,
    car_model_year,
    price,
    availability,
  } = newCar;

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();

    if (car_model_year > currentYear) {
      setYearError('year should not be larger than the current');
      return;
    }

    const formattedPrice = /^\d+$/.test(price)
      ? "$" + parseFloat(price).toFixed(2)
      : "$" + price;

    addCar(
      car,
      car_model,
      car_vin,
      car_color,
      car_model_year,
      formattedPrice,
      availability
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company"
          name="car"
          value={car}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Model</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Model"
          name="car_model"
          value={car_model}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>VIN Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter VIN Code"
          name="car_vin"
          value={car_vin}
          onChange={onInputChange}
        />
      </Form.Group>
      {vinError && <p style={{ color: "red" }}>{vinError}</p>}
      <Form.Group className="mb-2">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Color"
          name="car_color"
          value={car_color}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Car Model Year"
          name="car_model_year"
          value={car_model_year}
          onChange={onInputChange}
        />
        {yearError && <p style={{ color: "red" }}>{yearError}</p>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Price $</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={price}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Availability"
          name="availability"
          checked={availability}
          onChange={onInputChange}
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button variant="success" type="submit">
        Add New Car
      </Button>
      </div>
    </Form>
  );
};

export default AddForm;

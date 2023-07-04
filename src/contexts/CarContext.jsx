import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCars } from "../utils/api";

const { confirm } = window;

export const CarContext = createContext();

const CarContextProvider = (props) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCars();
        setCars(data);
        localStorage.setItem("cars", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };

    const storedCars = JSON.parse(localStorage.getItem("cars"));
    if (storedCars) {
      setCars(storedCars);
    } else {
      fetchData();
    }
  }, []);

  const sortedCars = cars.sort((a, b) => (a.id < b.id ? -1 : 1));

  const addCar = (
    car,
    car_model,
    car_vin,
    car_color,
    car_model_year,
    price,
    availability
  ) => {
    const newCar = {
      id: uuidv4(),
      car,
      car_model,
      car_vin,
      car_color,
      car_model_year,
      price,
      availability,
    };
    setCars([...cars, newCar]);
    localStorage.setItem("cars", JSON.stringify([...cars, newCar]));
  };

  const deleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  const updateCar = (id, updatedCar) => {
    const updatedCars = cars.map((car) => (car.id === id ? updatedCar : car));
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  return (
    <CarContext.Provider value={{ sortedCars, addCar, deleteCar, updateCar }}>
      {props.children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;

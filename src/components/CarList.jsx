import { Alert, Dropdown } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "../contexts/CarContext";
import Car from "./Car";
import Pagination from "./Pagination";
import Header from "./Header";
import { AddCarModal } from "./Modals";
import { useModal } from "../hooks/useModal";

const CarList = () => {
  const { sortedCars } = useContext(CarContext);

  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("default");


  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const { show: showAddModal, handleShow: handleShowAddModal, handleClose: handleCloseAddModal } = useModal();

  const sortCars = (cars, sortOption) => {
    switch (sortOption) {
      case "default":
        return cars.sort((a, b) => a.id - b.id);
      case "name":
        return cars.sort((a, b) => a.car.localeCompare(b.car));
      case "model":
        return cars.sort((a, b) => a.car_model.localeCompare(b.car_model));
      case "year-new-old":
        return cars.sort((a, b) => b.car_model_year - a.car_model_year);
      case "year-old-new":
        return cars.sort((a, b) => a.car_model_year - b.car_model_year);
      case "price-low-high":
        return cars.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return cars.sort((a, b) => b.price - a.price);
      default:
        return cars;
    }
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };
  

  useEffect(() => {
    handleCloseAddModal();
    handleShowAlert();
  }, [sortedCars]);

  useEffect(() => {
    const filtered = sortedCars.filter((car) => {
      const searchTerm = search.toLowerCase();
      const isAvailable = showAvailableOnly ? car.availability : true;
  
      return (
        (car.car.toLowerCase().includes(searchTerm) ||
          car.car_model.toLowerCase().includes(searchTerm) ||
          car.car_vin.toLowerCase().includes(searchTerm) ||
          car.car_color.toLowerCase().includes(searchTerm) ||
          car.car_model_year.toString().includes(searchTerm)) &&
        isAvailable
      );
    });
  
    const sortedFiltered = sortCars(filtered, sortOption);
  
    setFilteredCars(sortedFiltered);
    setCurrentPage(1);
  }, [search, showAvailableOnly, sortedCars, sortOption]);
  

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPagesNum = Math.ceil(filteredCars.length / carsPerPage);


  return (
    <>
      <Header
        handleShow={handleShowAddModal}
        setSearch={setSearch}
        search={search}
        showAvailableOnly={showAvailableOnly}
        setShowAvailableOnly={setShowAvailableOnly}
      />

      <Dropdown className="d-flex justify-content-end mb-3">
        <Dropdown.Toggle variant="primary" id="sortDropdown">
          Sort By: {sortOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSortOptionChange("default")}>Default</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("name")}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("model")}>Model</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("year-new-old")}>Year (New to Old)</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("year-old-new")}>Year (Old to New)</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("price-low-high")}>Price (Low to High)</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortOptionChange("price-high-low")}>Price (High to Low)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Alert show={showAlert} variant="success">
        Car List Updated Successfully!
      </Alert>

      {currentCars.length === 0 ? (
        <Alert variant="danger">Car Not Found!</Alert>
      ) : (
        
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map((car) => (
              <tr key={car.id}>
                <Car car={car} />
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentCars={currentCars}
        sortedCars={sortedCars}
      />

      <AddCarModal show={showAddModal} handleClose={handleCloseAddModal} />
    </>
  );
};

export default CarList;

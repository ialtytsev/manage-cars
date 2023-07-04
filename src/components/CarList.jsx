import { Alert } from "react-bootstrap";
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

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const { show: showAddModal, handleShow: handleShowAddModal, handleClose: handleCloseAddModal } = useModal();


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

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [search, showAvailableOnly, sortedCars]);

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

import { Button, Form, InputGroup } from "react-bootstrap";
import logo from '../assets/logo.svg'

const Header = ({
  handleShow,
  setSearch,
  search,
  showAvailableOnly,
  setShowAvailableOnly,
}) => {
  const handleCheckboxChange = (e) => {
    setShowAvailableOnly(e.target.checked);
  };

  return (
    <div className="table-title">
      <div className="row">
        <div className="col-sm-2 ">
          <a href="/">
          <img src={logo} alt="Logo" className="logo-image"/> 
          </a>
        </div>
        <div className="col-sm-6 offset-sm-1">
          <Form>
            <InputGroup className="my-1">
              <Form.Control
                placeholder="Search car"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Form.Check
              type="checkbox"
              label="Show Available Only"
              checked={showAvailableOnly}
              onChange={handleCheckboxChange}
            />
          </Form>
        </div>
        <div className="offset-sm-1 col-sm-2 my-3">
          <Button
            onClick={handleShow}
            className="btn btn-success"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE147;</i> <span>Add New Car</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

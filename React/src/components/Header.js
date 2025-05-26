import React, { useContext } from "react";
import { LoadingContext } from "../App";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { startNewInspection } from '../Services/InspectionService';

function Header(props) {
  const setLoading = useContext(LoadingContext);
  let navigate = useNavigate();
  function handleStartClick() {
    setLoading(true);
    startNewInspection()
      .then(data => {
        navigate(`/newInspection/${data}`);
      });
  }
  //const title = "Monte's Own";

  return <div>
    <Navbar key="md" bg="warning" expand="md" className="m-4 rounded-4justify-content-around" variant="light">
      <Container>
        <Navbar.Brand href="/">BuzzNote</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-around flex-grow-1 pe-3">
              <Nav.Link onClick={handleStartClick}>New Inspection</Nav.Link>
              <Nav.Link href="/pastInspections">View Past Inspections</Nav.Link>
              <Nav.Link href="/search"><i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
              <Nav.Link href="https://github.com/RyanMontville/Bee-Inspection" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  </div>;
};

export default Header;
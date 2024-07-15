import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/styles.css';
import logo from "../images/bookshelf-svgrepo-com.png"

export default function CustomHeader() {
    return (
    <header>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Navbar.Brand href="#home">
      <img src={logo} height={50} width={50}></img>
        {" "} WonderBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
            <Nav.Item>
                <LinkContainer to="/">
                <Nav.Link eventKey="Link-0">Home</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/ListBooks">
                <Nav.Link eventKey="Link-1">Books</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/ListAuthors">
                <Nav.Link eventKey="Link-2">Authors</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/ListGenres">
                <Nav.Link eventKey="Link-3">Genres</Nav.Link>
                </LinkContainer>
            </Nav.Item>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    </header>
    )
}

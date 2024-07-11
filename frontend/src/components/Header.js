import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/styles.css';

export default function CustomHeader() {
    return (
    <header>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Navbar.Brand href="#home">MyBookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
            <Nav.Item>
                <LinkContainer to="/">
                <Nav.Link eventKey="Link-0">Home</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
            Books
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
            <LinkContainer to="/ListBooks">
                <Nav.Link eventKey="link-1">Find a book</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            <Dropdown.Item>
            <LinkContainer to="/AddBook">
                <Nav.Link eventKey="link-2">Add New Book</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
            Authors
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
            <LinkContainer to="/ListAuthors">
                <Nav.Link eventKey="link-3">List Authors</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            <Dropdown.Item>
            <LinkContainer to="/AddAuthor">
                <Nav.Link eventKey="link-4">Add New Author</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
            Genres
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
            <LinkContainer to="/ListGenres">
                <Nav.Link eventKey="link-5">List Genres</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            <Dropdown.Item>
            <LinkContainer to="/AddGenre">
                <Nav.Link eventKey="link-6">Add New Genre</Nav.Link>
            </LinkContainer>
            </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    </header>
    )
}

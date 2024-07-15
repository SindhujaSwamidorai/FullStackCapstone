import { Row } from "react-bootstrap";
import imageBook from "./images/screenshot_listbooks.png";
import imageAuthor from "./images/screenshot_listauthor.png";
import imageGenre from "./images/screenshot_listgenres.png";
import logo from "./images/bookshelf-svgrepo-com.png";
import {Col} from "react-bootstrap";
import { Carousel } from "react-bootstrap";

export default function Home () {
    return (
        <div className="home">
            <Row className="row1">
            <Col xs md lg={2} className="col1">
            <h4>Welcome to WonderBooks</h4>
            <img src={logo} className="image"></img>
            <p>A complete website for all your book store needs</p>
            </Col>
            <Col xs md lg={8} className="col2">
            <p>Manage all your book collections in a single window</p>
            <Carousel data-bs-theme = "dark">
              <Carousel.Item>
                <img src={imageBook} alt={"window"} className="imageBig"></img>
                <Carousel.Caption>
                <h3>View, Update, Add or Delete books and authors easily</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={imageAuthor} alt={"window"} className="imageBig"></img>
                <Carousel.Caption>
                <h3>Find books by author, title or genre</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={imageGenre} alt={"window"} className="imageBig"></img>
                <Carousel.Caption>
                <h3>Organize your book store with this easy to use interface</h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
            </Col>
            <Col xs md lg={2} className="col3">
            </Col>
            </Row>
            <Row className="row2">
            <Col xs md lg={2} className="col1">
            </Col>
            <Col xs md lg={8} className="col2">
            </Col>
            <Col xs md lg={2} className="col3">
            </Col>
            </Row>
            <Row className="row3">
            </Row>
            <Row className="row4">
            </Row>
        </div>
    )
}


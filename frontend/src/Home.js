import { Row } from "react-bootstrap";
import imageBook from "./images/screenshot_books_window.png";
import imageAuthor from "./images/screenshot_author_window.png";
import imageGenre from "./images/screenshot_genre_window.png";
import logo from "./images/bookshelf-svgrepo-com.png";
import {Col} from "react-bootstrap";

export default function Home () {
    return (
        <div className="home">
            <Row className="row1">
            <h2>Welcome to MyBookStore</h2>
            <Col xs md lg={4} className="col1">
            </Col>
            <Col xs md lg={4} className="col2">
            </Col>
            <Col xs md lg={4} className="col3">
            </Col>
            </Row>
            <Row className="row2">
            <Col xs md lg={4} className="col1">
            <img src={imageBook} alt={"window"} className="imageBig"></img>
            </Col>
            <Col xs md lg={4} className="col2">
            <img src={logo} alt={"window"} className="image"></img>
            <p>Manage all your book collections in a single window</p> 
            <p>View, Update, Add or Delete books and authors easily</p>
            </Col>
            <Col xs md lg={4} className="col3">
            <img src={imageAuthor} alt={"window"} className="imageBig"></img>
            </Col>
            </Row>
            <Row className="row3">
            </Row>
            <Row className="row4">
            <p>A comprehensive website for all your needs </p>
            </Row>
        </div>
    )
}


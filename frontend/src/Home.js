import { Row } from "react-bootstrap";

export default function Home () {
    return (
        <div>
            <Row className="row1">
            <h2>Welcome to MyBookStore</h2>
            </Row>
            <Row className="row2">
            <p>Manage all your book collections in a single window</p> 
            </Row>
            <Row className="row3">
            <p> A comprehensive website for all your needs </p>
            </Row>
            <Row className="row4">
            <p>View, Update, Add or Delete books and authors easily</p>
            </Row>
        </div>
    )
}


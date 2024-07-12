import { Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

export default function BookDetails(props) {
    const book_id = props.book_id;
    //const {book_id} = useParams();
    const [book, setBook] = useState(null);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(props.show);

    const navigate = useNavigate();

    function handleSubmit(event) {

        const formData = event.currentTarget;

        console.log(formData.price);
        setEdit(false);

        let bookData = {};
        bookData.book_id = book_id;
        bookData.price = formData.price.value;
        console.log(bookData);
    
        fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${book_id}`, {
            method: "PUT",
            body: JSON.stringify(bookData),
            headers: { "Content-type": "application/json; charset = UTF-8" } 
            })
            .then(response => response.json())
            .then(data => {
                if(!alert('Updated book details!')){navigate(-1)}; 
                })
           .catch(error => {
            if(!alert('ERROR!!! ' + error)){navigate(-1)}; 
            })
    }

    function handleDelete(event) {
        console.log(event.target.value);

        if (!window.confirm('Are you sure you wish to delete this book?')){
            console.log("Delete not confirmed.")
            return;
        }
        
        fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${book_id}`, {
            method: "DELETE",
            })
          .then(data => {
            if(!alert(`Deleted Book ${book.title}!`)){navigate(-1);}
            })
            .catch(error => {
                 alert(`ERROR Deleting Book ${book.title}!!!` + error); 
            })
    }

    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${book_id}`;

    const {responseData, loading, error } = useFetch(fetch_url);
    useEffect(() => {
        setBook(responseData);
    },[responseData]);

    //console.log(responseData, loading, error);
    if(error) {
        return <div>error!!</div>
    }

    if (loading) {
        return <div>loading...</div>
    }
    if (!loading) {
    
    if(responseData) {
        const date= new Date(responseData.publication_date);
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    /* return (
                <Container>
                <Row>
                <Col xs md lg={3} className='firstCol'>
                </Col>
                <Col xs md lg={6}>
                <Form onSubmit={handleSubmit}>
                <Row className='justify-content-center'>
                <Card>
                    <Card.Text>Title: {responseData.title}</Card.Text>
                    <Card.Text>Author: {responseData.name}</Card.Text>
                    <Card.Text>Price: <input defaultValue={responseData.price} type='number' name='price' readOnly={!edit}></input>
                    </Card.Text>
                    <Card.Text>Month and Year of publication: {months[date.getMonth()]}, {date.getFullYear()}</Card.Text>
                    <Card.Text>Genre: {responseData.genre_name}</Card.Text>
                </Card>
                </Row>
                <Row className='justify-content-center'>
                <Col xs md lg={2}>
                <Button type="button" onClick={()=> {if(!alert('Cancelled!')){navigate(-1);}}}>CANCEL</Button>
                </Col>
                <Col xs md lg={2}>
                {(!edit) && <Button type="button" value="SAVE" name="SAVE" onClick={() => {setEdit(true)}}>Edit</Button>}
                {(edit) && <Button type="button" value="SAVE" name="SAVE">Save Changes</Button>}
                </Col>
                <Col xs md lg={2}>
                <Button type="button" value="DELETE" name="DELETE" onClick={handleDelete}>DELETE</Button>
                </Col>
                </Row>
                </Form>                    
                </Col>
                </Row>
                </Container>
            )
*/

function handleClose() {
    setShow(false);
    props.setParentFn(false);
}
 return (
                <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                      <Modal.Title>Edit Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Card>
                    <Card.Text>Title: {responseData.title}</Card.Text>
                    <Card.Text>Author: {responseData.name}</Card.Text>
                    <Card.Text>Price: <input defaultValue={responseData.price} type='number' name='price'
                     onChange={() => {setEdit(true)}}></input>
                    </Card.Text>
                    <Card.Text>Month and Year of publication: {months[date.getMonth()]}, {date.getFullYear()}</Card.Text>
                    <Card.Text>Genre: {responseData.genre_name}</Card.Text>
                </Card>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                <Button type="button" onClick={()=> {if(!alert('Cancelled!')){
                    //navigate(-1);
                    setShow(false);
                    props.setParentFn(false);
                }}}>CANCEL</Button>
                <Button type="button" value="SAVE" name="SAVE">Save Changes</Button>
                <Button type="button" value="DELETE" name="DELETE" onClick={handleDelete}>DELETE</Button>
                </Modal.Footer>
                </Form>                    
                </Modal>
            )

    }
}
}

export function LoadBookDetails(props) {
    console.log(props);
    //const {book_id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${props.book_id}`;

    const {responseData, loading, error } = useFetch(fetch_url);

    if(error) {
        return <div>error!! {error.message}</div>
    }

    if (loading) {
        return <div>loading...</div>
    }
    if (!loading) {
    
    if(responseData) {
        const date= new Date(responseData.publication_date);
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    return (
                <Container>
                <Card>
                <Card.Header> Details of Book </Card.Header>
                <Card.Title> {responseData.title} </Card.Title>
                <Card.Body>
                    <ListGroup>
                    <ListGroup.Item>Author: {responseData.name}</ListGroup.Item>
                    <ListGroup.Item>Genre: {responseData.genre_name}</ListGroup.Item>
                    <ListGroup.Item>Month and Year of publication: {months[date.getMonth()]}, {date.getFullYear()}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>Price: {responseData.price}</Card.Footer>
                <Button type="button" className="btn btn-info" onClick={()=> {
                    //</Container>navigate(`/BookDetails/${responseData.book_id}`)
                    setShow(true);
                }}> Click to update record </Button>
                {(show) && <BookDetails book_id = {responseData.book_id} show={show} setParentFn = {setShow}></BookDetails>}
                </Card>
                </Container>
            )

    }
}
}


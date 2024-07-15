import { Alert, Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate} from "react-router-dom";
import useFetch from '../hooks/useFetch';
import Container from 'react-bootstrap/esm/Container';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

export default function BookDetails(props) {
    const book_id = props.book_id;
    //const {book_id} = useParams();
    const [book, setBook] = useState(null);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(props.show);

    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${book_id}`;
    const {responseData, loading, error } = useFetch(fetch_url);

    const navigate = useNavigate();
    useEffect(() => {
        //setResponseData(data);
        setBook(responseData);
    },[responseData]);
    

    //console.log(responseData, loading, error);
    if(error) {
        return <div>error!!</div>
    }

    if (loading) {
        return <div>loading...</div>
    }

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
                    props.setDataFn(data);
                    if(!alert('Updated book details!')){navigate(-1)}; 
                })
           .catch(error => {
                alert('ERROR!!! ' + error); 
            })
            handleClose();
    }

    function handleClose() {
        setShow(false);
        props.setParentFn(false);
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
            if(!alert(`Deleted Book ${book.title}!`)){
                setShow(false); 
                setBook(null);
                props.setDataFn(null);
                }
            })
            .catch(error => {
                 alert(`ERROR Deleting Book ${book.title}!!!` + error); 
            })
    }

    if (!loading) {
    
    if(responseData) {
        const date= new Date(responseData.publication_date);
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];

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
                <Button type="button" onClick={()=> {if(!alert('Cancelling changes!')){
                    //navigate(-1);
                    setShow(false);
                    props.setParentFn(false);
                }}}>CANCEL</Button>
                <Button type="submit" value="SAVE" name="SAVE">Save Changes</Button>
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
    //const [data, setData] = useState(null);
    const [book, setBook] = useState(null);

    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${props.book_id}`;

    const {responseData, loading, error } = useFetch(fetch_url);

    useEffect(() => {
        setBook(responseData);
    },[responseData])

    if(error) {
        return <Alert>error!! {error.message}</Alert>
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
                (book) && 
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
                <Card.Footer>Price: {(book) ? book.price: responseData.price}</Card.Footer>
                <Button type="button" className="update-btn" onClick={()=> {
                    //</Container>navigate(`/BookDetails/${responseData.book_id}`)
                    setShow(true);
                }}> Click to update record </Button>
                {(show) && <BookDetails book_id = {responseData.book_id} show={show} setParentFn = {setShow} setDataFn = {setBook}></BookDetails>}
                </Card>
                </Container>
            )

    }
}
}


import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import useFetch from '../hooks/useFetch';

export default function AddNewBook() {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        let formData = event.target;
    
        let valid = true;
        let date = new Date(formData['publicationDate'].value);

        if ( Object.prototype.toString.call(date) === "[object Date]") {
            if ( !isNaN(date.getTime()) )         
            {
                formData['publicationDate'].classList.remove("is-invalid");
                formData['publicationDate'].setCustomValidity("")
                formData['publicationDate'].classList.add("is-valid");
            } 
            else {
                formData['publicationDate'].setCustomValidity("Invalid date format. Please enter a valid date!")
                formData['publicationDate'].classList.add("is-invalid");
                valid = false;
            }
        }
        else {
            formData['publicationDate'].setCustomValidity("Invalid date format. Please enter a valid date!")
            formData['publicationDate'].classList.add("is-invalid");
            valid = false;
        }
   
        if (formData.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();      
        }
        else {
    
        if (!valid) {
            event.preventDefault();
            event.stopPropagation();      
        }
        else
        {
        let newBook = {};
    
        newBook.author_id = formData["authors"].value;
        newBook.genre_id = formData["genres"].value;
        newBook.title = formData["title"].value;
        newBook.price = formData["price"].value;
        newBook.publication_date = formData["publicationDate"].value;
        
        console.log(newBook);
        console.log(JSON.stringify(newBook));
        
        /* TBD: Port number should be picked from env */ 
        fetch('http://localhost:3000/books/', {
           method: "POST",
           body: JSON.stringify(newBook),
           headers: { "Content-type": "application/json; charset = UTF-8" }
           })
         .then(response => response.json())
         .then(data => {
            alert('Added new book!'); 
           })
           .catch(error => {
                alert('ERROR!!!'); 
            })
        }
        
    }
    setValidated(true);    
    }
    
    return (
    <Container>
    <Row className='justify-content-center'>
    <Col>
    <h4>Add New Book</h4>
    <Form id="newBookForm" noValidate onSubmit={handleSubmit} validated={validated} 
     onChange={(e) => e.target.checkValidity()}>
    <Form.Group>
    <Form.Label>Choose an author:</Form.Label>
    <Form.Select name="authors" id="authors" required>
        <option value="" key="select">Select an author</option>    
        <LoadAuthors></LoadAuthors>
    </Form.Select>
    <Form.Control.Feedback type="invalid">
    Please select an author from the list.
    </Form.Control.Feedback>
    </Form.Group>
    <Form.Label>Choose a genre:</Form.Label>
    <Form.Select name="genres" id="genres" required> 
        <option value="" key='select'>Select a genre</option>    
        <LoadGenres></LoadGenres>
    </Form.Select>
    <Form.Control.Feedback type="invalid">
    Please select a genre from the list.
    </Form.Control.Feedback>
    <Form.Label>Title:</Form.Label>
    <Form.Control type="text" id="title" name="title" required/>
    <Form.Label>Price:</Form.Label>
    <Form.Control type="number" id="price" name="price" required/>
    <Form.Label>Publication Date:</Form.Label>
    <Form.Control type="date" id="publicationDate" name="publicationDate"/>
    <Button className='col-md-2' type="submit" name="ADD" value="ADD">
        ADD
    </Button>{'  '}
    <Button className='col-md-2' type="button" name="CANCEL" value="CANCEL" onClick={() => {
            if(!alert("Cancelled!!!")){
                navigate(-1);
            }}}>
    CANCEL
    </Button>
    </Form>
    </Col>
    </Row>
    </Container>
    )
}

export function LoadAuthors() {
    let fetch_url = `http://localhost:3000/authors`;

    const {responseData, loading, error } = useFetch(fetch_url);

    //console.log(responseData, loading, error);
    if(error) {
        return "error!!"
    }

    if (loading) {
        return "loading..."
    }
    if (responseData) {
            return (responseData.map((author) => <option value={author.author_id} key={author.author_id}>{author.name}</option>))    
    }
}


export function LoadGenres() {
    let fetch_url = `http://localhost:3000/genres`;

    const {responseData, loading, error } = useFetch(fetch_url);

    //console.log(responseData, loading, error);
    if(error) {
        return "error!!"
    }

    if (loading) {
        return "loading..."
    }
    if(responseData) {
    return (
            responseData.map((genre) => <option value={genre.genre_id} key={genre.genre_id}>{genre.genre_name}</option>)
        )
    }
    
}

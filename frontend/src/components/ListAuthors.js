import useFetch from "../hooks/useFetch";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadBookDetails } from "./BookDetails";
import {OrbitProgress} from "react-loading-indicators";
import { Button, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../css/styles.css';
import AddNewAuthor from "./AddNewAuthor";
import { ListGroup } from "react-bootstrap";
import { ListBooksWithDetails } from "./ListBooks";
import { Card } from "react-bootstrap";
import { Alert } from "react-bootstrap";

export default function ListAuthors() {

    const [author, setAuthor] = useState(null);
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const [addNew, setAddNew] = useState(false);

    function handleAuthor(author) {
        console.log(author.author_id, author.name);
        setAuthor(author);
        setAddNew(false);
    }

    function handleDetails(book) {
        console.log("Book Details of : ", book);
        setBook(book);
        setAddNew(false);
    }

    function LoadAuthors() {
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors`;
    
        const {responseData, loading, error } = useFetch(fetch_url);
    
        //console.log(responseData, loading, error);
        if(error) {
            return <Alert>Server Error: {error.message} </Alert>
        }
    
        if (loading) {
            return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
        }
        if(responseData) {
            let current_alpha='';
            let last_alpha='';
            return (
                <ul>
                {responseData.map((author) => {
                    last_alpha = current_alpha;
                    current_alpha = author.name[0]; 
                    return (
                    <li key={author.author_id}>
                        <Row>
                            {(current_alpha !== last_alpha) && <span>{current_alpha}</span>}
                            <Col>
                             <Link onClick={() => handleAuthor(author)}>
                            {author.name} 
                            </Link>
                            <ListCountByAuthor author_id={author.author_id}></ListCountByAuthor>
                            </Col>
                        </Row>
                    </li>
                    )})}
                </ul>
            )
        }
    }

    function ListBooksByAuthor(props) {
        console.log(props);
        //const { author_id } = useParams();
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?author_id=${props.author.author_id}`;
    
        const {responseData, loading, error } = useFetch(fetch_url);
        const [edit,setEdit] = useState(false);
    
        //console.log(responseData, loading, error);
        if(error) {
            return "error!!"
        }
    
        if (loading) {
            return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
        }

        function handleSubmit(event) {
            const formData = event.currentTarget;            
            console.log(formData);
            setEdit(false);
            event.preventDefault(); 

            let authorData = {};
            authorData.author_id = props.author.author_id;
            //authorData.name = formData.name.value;
            authorData.biography = formData.biography.value;

            console.log(authorData);

            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorData.author_id}`, {
                method: "PUT",
                body: JSON.stringify(authorData),
                headers: { "Content-type": "application/json; charset = UTF-8" } 
                })
                .then(response => response.json())
                .then(data => {
                    if(!alert('Updated author details!')){
                        //navigate(-1)
                        console.log("Updated author details")}; 
                    })
               .catch(error => {
                    if(!alert('ERROR!!! ' + error)){
                        //navigate(-1)
                        console.log(error)}; 
                })    
        }

        function handleDelete(event) {
            console.log(event.target.value);
    
            if(responseData.length > 0){
                if (!alert('Cannot delete author as there are books referencing the author!')){
                    console.log("Cannot delete author.")
                    return;
                }    
            }

            if (!window.confirm('Are you sure you wish to delete this author?')){
                console.log("Delete not confirmed.")
                return;
            }
            
            fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${props.author.author_id}`, {
                method: "DELETE",
                })
              .then(data => {
                if(!alert(`Deleted Author ${props.author.name}!`)){navigate(-1);}
                })
                .catch(error => {
                     alert(`ERROR Deleting Author ${props.author.name}!!!` + error); 
                })
        }
            
        if(responseData) {
        return (
                <Container>
                <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                <Col>
                <Card>
                <Card.Title>
                 {props.author.name}                 
                    <Button variant='outline-danger' type="button" value="DELETE" name="DELETE" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                    </Button>
                </Card.Title>    
                <Card.Text>
                <Form.Label>Biography</Form.Label>
                </Card.Text>
                <Card.Body>
                <Form.Control name="biography" as="textarea" rows={3} defaultValue={props.author.biography} type="text" disabled={!edit}></Form.Control>
                </Card.Body>
                <Card.Footer>
                {(edit) && <Button type="button" value="CANCEL" name="CANCEL" onClick={()=> {if(!alert('Cancelled!')){setEdit(false)}}}>CANCEL</Button>}
                {!(edit) && <Button className="col-1" variant='outline-primary' type="button" value="EDIT" name="EDIT" onClick={()=>setEdit(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
                </Button>}
                {(edit) && <Button type="submit" name="SAVE" value="SAVE" >Save Changes</Button>}
                </Card.Footer>
                </Card>
                </Col>
                </Row>
                </Form>
                <br/>
                <h4>List of books by {props.author.name}</h4>
            <ListGroup>
            {responseData.map((book) => <ListGroup.Item key={book.book_id}>
                                        <ListBooksWithDetails book={book} onClickfn={handleDetails}></ListBooksWithDetails>
                                        </ListGroup.Item>)}
            </ListGroup>
            </Container>
            )
/* 
        <ul>
        {responseData.map((book) => 

                <li key={book.book_id}>
                                                <Link onClick={() => handleDetails(book)}>
                                                    {book.title}
                                                </Link>
                                            </li>)
                }
                </ul>
*/        }
    }
        
    return (
        <Container>
        <Row>
        <Col xs md lg={3} className="firstCol">
            <div className="authors">
            <h4>Select an author</h4>
            <LoadAuthors></LoadAuthors>
            </div>
        </Col>
        <Col xs md lg={6}>
            {
            (author) &&
            <ListBooksByAuthor author={author}></ListBooksByAuthor>
            }
            {(addNew) && <AddNewAuthor></AddNewAuthor>}
        </Col>
        <Col xs md lg={3}>  
        <Button onClick={()=> {setAddNew(true); setBook(null); setAuthor(null)}}> {" + "} Add New Author </Button>  
        <br/><br/>
            {(book) &&
                <LoadBookDetails book_id={book.book_id}></LoadBookDetails> }
        </Col>
        </Row>
        </Container>
    )
}

export function ListCountByAuthor(props) {
    //const { genre_id } = useParams();
    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?author_id=${props.author_id}&count=true`;

    console.log(process.env);

    const {responseData, loading, error } = useFetch(fetch_url);

    if(error) {
        return "error!!"
    }

    if (loading) {
        return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
    }
    if(responseData) {
        return(<span>{" "}({responseData[0].count})</span>)
    }
}





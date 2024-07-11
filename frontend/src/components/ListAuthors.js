import useFetch from "../hooks/useFetch";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadBookDetails } from "./BookDetails";
import {OrbitProgress} from "react-loading-indicators";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../css/styles.css';

export default function ListAuthors() {

    const [author, setAuthor] = useState(null);
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    

    function handleAuthor(author) {
        console.log(author.author_id, author.name);
        setAuthor(author);
    }

    function handleDetails(book) {
        console.log("Book Details of : ", book);
        setBook(book);
    }

    function LoadAuthors() {
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors`;
    
        const {responseData, loading, error } = useFetch(fetch_url);
    
        //console.log(responseData, loading, error);
        if(error) {
            return "error!!"
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
            authorData.name = formData.name.value;
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
                Author Name:  <Form.Control name="name" defaultValue={props.author.name} type="text" readOnly={!edit}></Form.Control>
                Biography: <Form.Control name="biography" as="textarea" rows={3} defaultValue={props.author.biography} type="text" readOnly={!edit}></Form.Control>
                </Col>
                </Row>
                <Row className="justify-content-center">
                <Col>
                    <Button type="button" value="CANCEL" name="CANCEL" onClick={()=> {if(!alert('Cancelled!')){setEdit(false)}}}>CANCEL</Button>
                </Col>
                <Col>
                {!(edit) && <Button type="button" value="EDIT" name="EDIT" onClick={()=>setEdit(true)}>Edit</Button>}
                {(edit) && <Button type="submit" name="SAVE" value="SAVE" >Save Changes</Button>}
                </Col>
                <Col>
                <Button type="button" value="DELETE" name="DELETE" value="DELETE" onClick={handleDelete}>DELETE</Button>
                </Col>
                </Row>
                </Form>
                <br/>
                <p>List of books by {props.author.name}</p>
                <ul>
                {responseData.map((book) => <li key={book.book_id}>
                                                <Link onClick={() => handleDetails(book)}>
                                                    {book.title}
                                                </Link>
                                            </li>)
                }
                </ul>
                </Container>
            )
        }
    }
        
    return (
        <Container>
        <Row>
        <Col xs md lg={3} className="firstCol">
            <h4>Select an author</h4>
            <LoadAuthors></LoadAuthors>
        </Col>
        <Col xs md lg={6}>
            {
            (author) &&
            <ListBooksByAuthor author={author}></ListBooksByAuthor>
            }
        </Col>
        <Col xs md lg={3}>    
            {(book) &&
                <LoadBookDetails book_id={book.book_id}></LoadBookDetails>           }
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





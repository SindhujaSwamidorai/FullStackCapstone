import useFetch from "../hooks/useFetch";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadBookDetails } from "./BookDetails";
import {OrbitProgress} from "react-loading-indicators";
import '../css/styles.css';
import AddNewGenre from "./AddNewGenre";
import { Button } from "react-bootstrap";


export default function ListGenres() {
    const [genre, setGenre] = useState(null);
    const [book, setBook] = useState(null);
    const [addNew, setAddNew] = useState(false);

    function handleGenre(genre) {
        console.log(genre);
        setGenre(genre);
        setAddNew(false);
    }

    function handleDetails(book) {
        console.log("Book Details of : ", book);
        setBook(book);
        setAddNew(false);
    }

    function LoadGenres() {
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
            let current_alpha='';
            let last_alpha='';
        return (
                responseData.map((genre) => { 
                    last_alpha = current_alpha;
                    current_alpha = genre.genre_name[0]; 
                    return (
                    <li key={genre.genre_id}>
                        <Row>
                        {(current_alpha !== last_alpha) && <span>{current_alpha}</span>}
                        <Col>
                        <Link onClick={() => handleGenre(genre)}>
                            {genre.genre_name}
                        </Link>
                        <ListCountByGenre genre_id={genre.genre_id}></ListCountByGenre>
                        </Col>
                        </Row>
                    </li>)})
            )
        }
    }

    function ListBooksByGenre(props) {
        //const { genre_id } = useParams();
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?genre_id=${props.genre_id}`;
    
        console.log(process.env);
    
        const {responseData, loading, error } = useFetch(fetch_url);
    
        //console.log(responseData, loading, error);
        if(error) {
            return "error!!"
        }
    
        if (loading) {
            return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
        }
        if(responseData) {
        return (
                <div>
                <p> List of books of genre "{genre.genre_name}" </p>
                <ul>
                {responseData.map((book) =>  <li key={book.book_id}>
                                                <Link onClick={() => handleDetails(book)}>
                                                        {book.title}
                                                </Link>
                                             </li>)}
                </ul>
                </div>
            )
        }
    }

    function ListCountByGenre(props) {
        //const { genre_id } = useParams();
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?genre_id=${props.genre_id}&count=true`;
    
        console.log(process.env);
    
        const {responseData, loading, error } = useFetch(fetch_url);
    
        //console.log(responseData, loading, error);
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
    
    return (
        <Container>
        <Row>
        <Col xs md lg={3} className="firstCol">
            <h4>Select a genre</h4>
            <LoadGenres></LoadGenres>
        </Col>
        <Col xs md lg={6}>
            {
            (genre) && 
            <ListBooksByGenre genre_id={genre.genre_id}></ListBooksByGenre>
            }
            { (addNew) && <AddNewGenre></AddNewGenre> }
        </Col>
        <Col xs md lg={3}>    
        <Button onClick={()=> {setAddNew(true); setBook(null); setGenre(null)}}> Add New Genre </Button>
                {(book) &&
                <LoadBookDetails book_id={book.book_id}></LoadBookDetails>           }
        </Col>
        </Row>
        </Container>
    )
}



import '../css/styles.css';
import useFetch from "../hooks/useFetch";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { LoadBookDetails } from "./BookDetails";
import {OrbitProgress} from "react-loading-indicators";

export default function ListBooks() {
    const [search, setSearch] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [book, setBook] = useState(null);

    function handleSearch() {
        setSearch(true);
    }
    function handleChange(e) {
        console.log(e.target.value);
        if(e.target.name === 'title'){
            setTitle(e.target.value)
        }
        else if (e.target.name === 'author') {
            setAuthor(e.target.value)
        }
        setSearch(false);
    }

    function handleIndex(event) {
        //console.log(event.target.innerText);
        setAlpha(event.target.innerText);
    }

    function handleDetails(book) {
        console.log("Book Details of : ", book);
        setBook(book);
    }

    function ListBookTitles() {
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`;
    
        const {responseData,loading, error } = useFetch(fetch_url);
    
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
            responseData.map((book) => 
                  {
                    last_alpha = current_alpha;
                    current_alpha = book.title[0].toUpperCase();
                    return ((last_alpha !== current_alpha) && 
                    <li key={current_alpha}>
                        <Link onClick={handleIndex}>
                        {"            "}{current_alpha}{"      "}
                        </Link>
                    </li>   
                    ) 
                  }
                )
            )
        }
    }


    function ListBooksByTitle(props) {
        //const { start } = useParams();
        let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?start=${props.start}`;
    
        const {responseData, loading, error } = useFetch(fetch_url);
    
        if(error) {
            return "error!!"
        }
    
        if (loading) {
            return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />);
        }

        if(responseData) {
        return (
                <ul>
                {responseData.map((book) => <li key={book.book_id}>
                                                <Link onClick={() => handleDetails(book)}>
                                                    {book.title}
                                                </Link>
                                            </li>)}
                </ul>
            )
        }
    }
    
    /* <Link to={`/ListBooksByTitle/${current_alpha}`}>
    </Link> */

    return (
        <Container>
        <Row>
        <Col xs md lg={3} className="firstCol">
        <h4>Index</h4>
        <ListBookTitles></ListBookTitles>
        <h4>New Arrivals</h4>
        <ListBooksByDate onClickfn = {handleDetails}></ListBooksByDate>
        <br/>
        </Col>
        <Col xs md lg={6}>
        <InputGroup>
        <InputGroup.Text>Title</InputGroup.Text>
        <Form.Control 
                    type="text" 
                    id="title" name="title" onInput={handleChange}/>
        </InputGroup>
        <br/>
        <InputGroup>
        <InputGroup.Text>Author</InputGroup.Text>
        <Form.Control type="text" id="author" name="author" onInput={handleChange}/>
        </InputGroup>        
        <br/>
        <Button type='button' class='button button-primary' onClick={handleSearch}>        
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg> {"   "} Search
        </Button>
        <br/>
        <Row>
        {(search) && 
            <div>
                List of books
                {(title) && <span> with title {title} </span>} 
                {(author) && <span> by {author}</span>}
                <ListBooksByTitleAuthor params = {{ "title" : title, "author_name" : author}} onClickfn={handleDetails}></ListBooksByTitleAuthor>
            </div>
            }
            {(alpha) && 
            <div>
                List of books at index {alpha}
                <ListBooksByTitle start={alpha}></ListBooksByTitle>
            </div>}
        </Row>
        </Col>
        <Col xs md lg={3}>    
            {(book) &&
                <LoadBookDetails book_id={book.book_id}></LoadBookDetails>           }
        </Col>
        </Row>
        </Container>
    )
}

export function ListBooksByTitleAuthor( props) {
    /* TBD: get author_id with given author name */
    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`;
    const {responseData, loading, error } = useFetch(fetch_url, props.params);

    if(error) {
        return "error!!"
    }

    if (loading) {
        return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
    }
    if(responseData) {
    return (
            <ul>
                {responseData.map((book) => <li key={book.book_id}>
                                            <ListBooksWithDetails book={book} onClickfn={props.onClickfn}></ListBooksWithDetails>
                                            </li>)}
            </ul>
        )
    }
    
   //return responseData;
}

export function ListBooksWithDetails(props){
    //<Link to={`/BookDetails/${book.book_id}`}>
    return (
        <Link onClick={()=> props.onClickfn(props.book)}>
        {props.book.title}
        </Link>
    )
}

export function ListBooksByDate(props) {
    let fetch_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books?sort=publication_date&order=desc&limit=10`;

    const {responseData, loading, error } = useFetch(fetch_url);

    if(error) {
        return "error!!"
    }

    if (loading) {
        return (<OrbitProgress color="#32cd32" size="medium" text="" textColor="" />)
    }

    if(responseData) {
    return (
            <ul>
            {responseData.map((book) => <li key={book.book_id}>
                                        <ListBooksWithDetails book={book} onClickfn={props.onClickfn}></ListBooksWithDetails>
                                        </li>)}
            </ul>
        )
    }
}

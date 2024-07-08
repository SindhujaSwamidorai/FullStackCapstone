import useFetch from "../hooks/useFetch";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { useState } from "react";


export default function ListBooks() {
    const [search, setSearch] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
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
    return (
        <Container>
        <Row>
        <Col xs md lg={3}>
        <h4>Index</h4>
        <ListBookTitles></ListBookTitles>
        </Col>
        <Col xs={6} md={6} lg={3}>
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
        </Col>
        <Col xs md lg={3}>    
            <h4>Select by genre</h4>
            <ListGenres></ListGenres>
        </Col>
        <Col xs md lg={3}>
        <h4>New Arrivals</h4>
        <ListBooksByDate></ListBooksByDate>
        </Col>
        </Row>
        <Row>
            {(search) && 
            <div>
                Searching for books
                {(title) && <span> with title {title} </span>} 
                {(author) && <span> by {author}</span>}
                <ListBooksByTitleAuthor title={title} author={author}></ListBooksByTitleAuthor>
            </div>}
        </Row>
        </Container>
    )
}


export function ListGenres() {
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
            responseData.map((genre) => { 
                return (
                <li key={genre.genre_id}>
                    <Link to={`/ListBooksByGenre/${genre.genre_id}`}>
                        {genre.genre_name}
                    </Link>
                </li>)})
        )
    }
}

export function ListAuthors() {
    let fetch_url = `http://localhost:3000/authors`;

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
            <ul>
            {responseData.map((author) => { 
                return (
                <li key={author.author_id}>
                    <Link to={`/ListBooksByAuthor/${author.author_id}`}>
                        {author.name}
                    </Link>
                </li>)})}
            </ul>
        )
    }
}

export function ListBookTitles() {
    let fetch_url = `http://localhost:3000/books`;

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
        responseData.map((book) => 
              {
                last_alpha = current_alpha;
                current_alpha = book.title[0].toUpperCase();
                return ((last_alpha !== current_alpha) && 
                <li>
                <Link to={`/ListBooksByTitle/${current_alpha}`}>
                    {"            "}{current_alpha}{"      "}
                    </Link>
                </li>   
                ) 
              }
            )
        )
    }
}

export function ListBooksByGenre() {
    const { genre_id } = useParams();
    let fetch_url = `http://localhost:3000/books?genre_id=${genre_id}`;

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
            <ul>
            {responseData.map((book) => <ListBooksWithDetails book={book}></ListBooksWithDetails>)}
            </ul>
        )
    }
}

export function ListBooksByTitle() {
    const { start } = useParams();
    let fetch_url = `http://localhost:3000/books?start=${start}`;

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
            <ul>
            {responseData.map((book) => <ListBooksWithDetails book={book}></ListBooksWithDetails>)}
            </ul>
        )
    }
}


export function ListBooksByTitleAuthor({title, author}) {
    /* TBD: get author_id with given author name */
    let fetch_url = `http://localhost:3000/books?title=${title}&author_name=${author}`;

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
            <ul>
            {responseData.map((book) => <ListBooksWithDetails book={book}></ListBooksWithDetails>)}
            </ul>
        )
    }
}

export function ListBooksWithDetails({book}){
    return (
        <li key={book.book_id}>
        <Link to={`/BookDetails/${book.book_id}`}>
        {book.title}
        </Link>
        </li>
    )
}

export function ListBooksByAuthor() {
    const { author_id } = useParams();
    let fetch_url = `http://localhost:3000/books?author_id=${author_id}`;

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
            responseData.map((book) => <ListBooksWithDetails book={book}></ListBooksWithDetails>)
        )
    }
}

export function ListBooksByDate() {
    let fetch_url = `http://localhost:3000/books?sort=publication_date&order=desc&limit=10`;

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
            responseData.map((book) => <ListBooksWithDetails book={book}></ListBooksWithDetails>)
        )
    }
}

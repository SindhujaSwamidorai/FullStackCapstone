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
import { useState, useReducer } from "react";
import { LoadBookDetails } from "./BookDetails";
import {OrbitProgress} from "react-loading-indicators";
import AddNewBook from "./AddNewBook";

export default function ListBooks() {
    const [search, setSearch] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [book, setBook] = useState(null);
    const [addNew, setAddNew] = useState(false);
    const [state, dispatch] = useReducer(reducer, null);

    function reducer(state, action) {
        switch(action.type){
            case "book":
                setBook(action.state);
                setAddNew(false);
                break;
            case "author":
                setAuthor(action.state);
                //setAlpha(null);
                //setAddNew(false);
                break;
            case "title":
                setTitle(action.state);
                //setAddNew(false);
                //setAlpha(null);
                break;
            case "search":
                setSearch(action.state);
                setAddNew(false);
                setAlpha(null);
                break;
            case "alpha":
                setAlpha(action.state);
                setAddNew(false);
                setSearch(false);
                break;
            case "addNew":
                setAddNew(action.state);
                //setTitle(null);
                //setAuthor(null);
                setBook(null);
                setAlpha(null);
                setSearch(null);        
                break;
            default:
                break;
        }
    return [addNew, alpha, author, book, search, title]
   }


    function handleSearch() {
        //setSearch(true);
        dispatch({type: "search", state: true});
    }

    function handleChange(e) {
        console.log(e.target.value);
        if(e.target.name === 'title'){
            //setTitle(e.target.value)
            dispatch({state: e.target.value, type: "title"});
        }
        else if (e.target.name === 'author') {
            //setAuthor(e.target.value)
            dispatch({state: e.target.value, type: "author"});
        }
        console.log("Current state of components: ", state);
    }

    function handleIndex(event) {
        //console.log(event.target.innerText);
        //setAlpha(event.target.innerText);
        dispatch({state: event.target.innerText, type: "alpha"});
    }

    function handleDetails(book) {
        console.log("Book Details of : ", book);
        //setBook(book);
        dispatch({state: book, type: "book"});
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
        <div>
        <h4>Search by Title or Author</h4>
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
        </div>
        <br/>
        <h4>Search By Index</h4>
        <ListBookTitles></ListBookTitles>
        <br/>
        </Col>
        <Col xs md lg={6}>
        { (addNew) && <AddNewBook></AddNewBook> }
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
                <ListBooksByTitleAuthor params = {{"start" : alpha}} onClickfn={handleDetails}></ListBooksByTitleAuthor>
            </div>}
        </Row>
        </Col>
        <Col xs md lg={3}>    
        <Button onClick={()=> {dispatch({state: true, type: "addNew"})}}> Add New Book </Button>
        <h4>New Arrivals</h4>
        <ListBooksByDate onClickfn = {handleDetails}></ListBooksByDate>
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
        <div>
        <Link onClick={()=> props.onClickfn(props.book)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
          </svg>
        </Link> {" "}
        {props.book.title}
        </div>
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

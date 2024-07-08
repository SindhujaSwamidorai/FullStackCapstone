import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate, Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import Container from 'react-bootstrap/esm/Container';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function BookDetails() {
    const {book_id} = useParams();

    let fetch_url = `http://localhost:3000/books/${book_id}`;

    const {responseData, loading, error } = useFetch(fetch_url);

    function handleChange(event) {
    }

    function saveChanges(event) {
    }

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
    return (
                <Container>
                <Card>
                    <Card.Text>Title: {responseData.title}</Card.Text>
                    <Card.Text>Author: {responseData.name}</Card.Text>
                    <Card.Text>Price: {responseData.price}</Card.Text>
                    <Card.Text>Month and Year of publication: {months[date.getMonth()]}, {date.getFullYear()}</Card.Text>
                    <Card.Text>Genre: {responseData.genre_name}</Card.Text>
                </Card>
                </Container>
            )

    }
}
}

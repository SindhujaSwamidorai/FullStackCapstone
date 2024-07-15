import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function AddNewGenre() {
    
const [validated, setValidated] = useState(false);
const navigate = useNavigate();

const handleSubmit = (event) => {

    const formData = event.currentTarget;
    event.preventDefault();
    if (formData.checkValidity() === false) {
        event.stopPropagation();
    }
  else {

    console.log("Entering add new genre");
    let newGenre = {};
    newGenre.genre_name = formData['genre_name'].value;

    console.log(newGenre);
    console.log(JSON.stringify(newGenre));
    
    
    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/genres`, {
       method: "POST",
       body: JSON.stringify(newGenre),
       headers: { "Content-type": "application/json; charset = UTF-8" }
       })
     .then(response => { 
        const data = response.json();
        if(Object.keys(data).length > 0) {
            alert('Added new genre!', data);
          } 
          else {
            alert(`Invalid data! + ${response.status}`)
        }
       })
      .catch(error => {
        alert(`Server Error! ${error}`); 
        })
    }
    setValidated(true);
}

return (
    <Container>
    <Row className='justify-content-center'>
    <Col>
    <h4> Add New Genre </h4>
    <Form id="newAuthorForm" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Genre Name</Form.Label>    
        <Form.Control type="text" id="genre_name" required name="genre_name"/>
        <Form.Control.Feedback type="invalid">
        Please provide a genre name.
       </Form.Control.Feedback>
        </Form.Group>
        <br/>
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
`   </Col>
    </Row>
    </Container>)
}

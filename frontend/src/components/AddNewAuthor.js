import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function AddNewAuthor() {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
    
        const formData = event.currentTarget;
        if (formData.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
      else {
    
        console.log("Entering add author");
        let newAuthor = {};
        newAuthor.name = formData['name'].value;
        newAuthor.biography = formData['biography'].value;
    
        console.log(newAuthor);
        console.log(JSON.stringify(newAuthor));
        
        
        fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors`, {
           method: "POST",
           body: JSON.stringify(newAuthor),
           headers: { "Content-type": "application/json; charset = UTF-8" }
           })
         .then(response => response.json())
         .then(data => {
            alert('Added new author!'); 
           })
          .catch(error => {
                alert('ERROR!!!'); 
            })
        
        }
        setValidated(true);
    }
    
return (
    <Container>
    <Row className='justify-content-center'>
    <Col>
    <h4> Add New Author </h4>
    <Form id="newAuthorForm" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Name</Form.Label>    
        <Form.Control type="text" id="name" required name="name"/>
        <Form.Control.Feedback type="invalid">
        Please provide a name.
       </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Biography</Form.Label>
        <Form.Control type="text" id="biography" required name="biography"/>
        <Form.Control.Feedback type="invalid">
        Please provide a biography.
       </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
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
    </Container>
);
}

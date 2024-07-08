import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AddNewAuthor() {

const navigate = useNavigate();

return (
    <Container>
    <Row className='justify-content-center'>
    <Col xs md lg={6}>
    <h4> Add New Author </h4>
    <Form id="newAuthorForm">
        <Form.Group>
        <Form.Label>Name</Form.Label>    
        <Form.Control type="text" id="name" required name="name"/>
        <Form.Control.Feedback type="invalid">
        Please provide a name.
       </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Biography</Form.Label>
        <Form.Control type="text" id="bio" required name="bio"/>
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
            alert("Cancelled!!!");
            navigate('/');
            }}>
           CANCEL
        </Button>
    </Form>   
`   </Col>
    </Row>
    </Container>
);
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          Please <Link to='/login'>Login</Link> or{' '}
          <Link to='/register'>Register</Link> to view journal entries. Please
          note, you can only add, update, or delete entries if you are an
          administrator.
        </Col>
      </Row>
    </Container>
  );
};

export default App;

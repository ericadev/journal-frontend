import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          Please <Link to='/login'>Login</Link> or{' '}
          <Link to='/register'>Register</Link> to view or add journal entries.
        </Col>
      </Row>
    </Container>
  );
};

export default App;

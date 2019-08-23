import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>
            Please note: You must be an administrator in order to add, update,
            or delete entries yourself.
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

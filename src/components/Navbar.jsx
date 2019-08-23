import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.props.history.push('/');
  };

  login = () => {
    this.props.history.push('/login');
  };

  goToEntries = () => {
    this.props.history.push('/entries');
  };

  register = () => {
    this.props.history.push('/register');
  };

  render() {
    const token = localStorage.getItem('token');
    let buttons;

    if (token) {
      buttons = (
        <>
          <Button onClick={this.logout}>Log out</Button>
          <Button onClick={this.goToEntries} style={{ marginLeft: '1rem' }}>
            View Entries
          </Button>
        </>
      );
    } else {
      buttons = (
        <>
          <Button onClick={this.register}>Register</Button>
          <Button onClick={this.login} style={{ marginLeft: '1rem' }}>
            Log in
          </Button>
        </>
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <h1>Welcome to Simple Journal Application</h1>
            {buttons}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Navbar);

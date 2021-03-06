import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import rootUrl from '../rootUrl';

export default class AddEntry extends Component {
  state = {
    title: '',
    date: '',
    content: '',
    error: ''
  };

  submitForm = e => {
    const { title, date, content } = this.state;

    if (!title || !date || !content) {
      this.setState({
        error: 'Please enter a value for all fields and try again.'
      });
      e.preventDefault();
      return;
    }

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (token) {
      axios
        .post(
          `${rootUrl}/entries/${user_id}`,
          {
            title,
            date,
            content,
            user_id
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.props.history.push(`/entries/${user_id}`);
        })
        .catch(err => {
          this.setState({
            error: err.response.data.message
          });
        });
    } else {
      this.setState({ error: 'Not logged in, please login again' });
    }
    e.preventDefault();
  };

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>Add Entry</h1>
          </Col>
        </Row>
        <Row>
          <Col>{error ? <h2>Error: {error}</h2> : null}</Col>
        </Row>
        <Row>
          <Col>
            <form>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  placeholder='Enter title'
                  onChange={this.changeValue}
                  name='title'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Date</label>
                <input
                  type='text'
                  className='form-control'
                  id='date'
                  placeholder='Date'
                  onChange={this.changeValue}
                  name='date'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='content'>Content</label>
                <input
                  type='text'
                  className='form-control'
                  id='content'
                  placeholder='Content'
                  onChange={this.changeValue}
                  name='content'
                />
              </div>
              <Button onClick={this.submitForm} className='btn btn-primary'>
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

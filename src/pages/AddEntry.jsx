import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
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

    if (token) {
      axios
        .post(
          `${rootUrl}/entries`,
          {
            title,
            date,
            content
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.props.history.push('/entries');
        })
        .catch(err => {
          this.setState({
            error:
              'There was an error saving data, please check all fields are entered and try again.'
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
              <button onClick={this.submitForm} className='btn btn-primary'>
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

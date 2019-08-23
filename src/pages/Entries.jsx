import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import rootUrl from '../rootUrl';

export default class Entries extends Component {
  state = {
    entries: [],
    editingMode: false
  };

  componentDidMount() {
    this.getEntries();
  }

  getEntries = () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (token) {
      axios
        .get(`${rootUrl}/entries/${user_id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => this.setState({ entries: response.data.data }))
        .catch(err =>
          this.setState({
            error:
              'There was an error getting entries, please reload to try again'
          })
        );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { editingMode: prevEditingMode } = prevState;
    const { editingMode: currEditingMode } = this.state;

    if (prevEditingMode !== currEditingMode) {
      this.getEntries();
    }
  }

  handleAddEntryClick = () => {
    this.props.history.push('/addEntry');
  };

  editEntry = id => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (token) {
      axios
        .get(`${rootUrl}/entries/${user_id}/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const { title, content, date } = response.data.data.entry;
          this.setState({
            title,
            date,
            content,
            editingMode: true,
            id
          });
        })
        .catch(err => {
          this.setState({
            error: err.message
          });
        });
    }
  };

  deleteEntry = id => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (token) {
      axios
        .delete(`${rootUrl}/entries/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          axios
            .get(`${rootUrl}/entries/${user_id}`, {
              headers: {
                authorization: `Bearer ${token}`
              }
            })
            .then(response => this.setState({ entries: response.data.data }));
        })
        .catch(err => {
          this.setState({
            error: err.response.data.message
          });
        });
    }
  };

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = (e, id) => {
    const { title, date, content } = this.state;
    const user_id = localStorage.getItem('user_id');

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
        .put(
          `${rootUrl}/entries/${id}`,
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
          this.setState({ editingMode: false });
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

  render() {
    const { entries, error, editingMode, id } = this.state;

    if (!editingMode) {
      if (entries.length > 0) {
        return (
          <Container>
            <Row>
              <Col>
                <h1>Entries</h1>
              </Col>
            </Row>
            <Row>
              <Col>{error ? <h2>Error: {error}</h2> : null}</Col>
            </Row>
            <Row>
              <Col>
                <ul>
                  {entries.map(entry => (
                    <Card
                      key={entry._id}
                      style={{
                        width: '20rem',
                        float: 'left',
                        margin: '2rem',
                        height: '20rem',
                        overflow: 'auto'
                      }}
                    >
                      <Card.Body>
                        <Card.Title>
                          <h3>{entry.title}</h3>
                        </Card.Title>
                        <Card.Subtitle>
                          <small>{entry.date}</small>
                        </Card.Subtitle>
                        <Card.Text>{entry.content}</Card.Text>
                        <Card.Subtitle>
                          <Button
                            onClick={() => this.editEntry(entry._id)}
                            style={{ marginRight: '1rem' }}
                          >
                            Edit
                          </Button>
                          <Button onClick={() => this.deleteEntry(entry._id)}>
                            Delete
                          </Button>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.handleAddEntryClick}>Add Entry</Button>
              </Col>
            </Row>
          </Container>
        );
      } else {
        return (
          <Container>
            <Row>
              <Col>
                Please login to see journal entries If you are logged in, there
                are no entries, so add one.
              </Col>
            </Row>
            <Row>
              <Col>
                <button onClick={this.handleAddEntryClick}>Add Entry</button>
              </Col>
            </Row>
          </Container>
        );
      }
    } else {
      return (
        <Container>
          <Row>
            <Col>
              <h1>Edit Entry</h1>
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
                    value={this.state.title}
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
                    value={this.state.date}
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
                    value={this.state.content}
                  />
                </div>
                <button
                  onClick={e => this.submitForm(e, id)}
                  className='btn btn-primary'
                >
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

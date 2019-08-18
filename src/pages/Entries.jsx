import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
const rootUrl = 'http://localhost:3001/api/v2';

export default class Entries extends Component {
  state = {
    entries: []
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${rootUrl}/entries`, {
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
  }

  handleAddEntryClick = () => {
    this.props.history.push('/addEntry');
  };

  deleteEntry = id => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`${rootUrl}/entries/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          axios
            .get(`${rootUrl}/entries`, {
              headers: {
                authorization: `Bearer ${token}`
              }
            })
            .then(response => this.setState({ entries: response.data.data }));
        })
        .catch(err =>
          this.setState({
            error: 'There was an error deleting this entry, please try again.'
          })
        );
    }
  };

  render() {
    const { entries, error } = this.state;

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
                  <div key={entry._id}>
                    <h3>{entry.title}</h3>
                    <small>{entry.date}</small>
                    <p>{entry.content}</p>
                    <button onClick={() => this.deleteEntry(entry._id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <button onClick={this.handleAddEntryClick}>Add Entry</button>
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
  }
}

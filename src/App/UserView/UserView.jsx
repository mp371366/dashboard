import React, { useState, useEffect } from 'react';
import './UserView.css';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { Link, withRouter, useParams } from "react-router-dom";
import _ from 'lodash';
import * as api from 'lib/api.js';

function UserView({ history, location: { state } }) {
  const [user, setUser] = useState(state || {});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { email, name } = user;

  useEffect(() => {
    if (id !== undefined && user.id !== id) {
      api.fetchUser(id)
        .then(setUser)
        .then(() => setError(null))
        .catch(() => setError('Error fetching user.'));
    }
  }, [id, user.id]);

  if (error !== null) {
    return <p>{error}</p>
  }

  return (
    <div className="UserView">
      <Card className="UserView-card">
        <Card.Header className="UserView-card-header">
          Form
        </Card.Header>
        <Card.Body className="UserView-card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Form.Row} controlId="name">
              <Form.Label
                className="UserView-label"
                column
                xs={4}
              >
                Name
              </Form.Label>
              <Col xs={6}>
                <Form.Control type="text" defaultValue={name} required />
              </Col>
            </Form.Group>
            <Form.Group as={Form.Row} controlId="email">
              <Form.Label
                className="UserView-label"
                column
                xs={4}
              >
                Email
              </Form.Label>
              <Col xs={6}>
                <Form.Control type="email" defaultValue={email} required />
              </Col>
            </Form.Group>
            <Form.Row className="UserView-form-footer">
              <Link to="/">
                <Button
                  className="UserView-form-footer-button"
                  variant="outline-danger"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                className="UserView-form-footer-button"
                variant="success"
                type="submit"
              >
                Submit
              </Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

  async function request({ name, email }) {
    if (!_.isEmpty(id)) {
      return api.editUser({
        ...user,
        id,
        name,
        email,
      });
    } else {
      return api.addUser({
        name,
        email
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let { name, email } = event.target;
    name = name.value;
    email = email.value;

    request({ name, email })
      .then(() => history.push('/'))
      .catch(() => setError('Error modifying users.'));
  }
}

export default withRouter(UserView);

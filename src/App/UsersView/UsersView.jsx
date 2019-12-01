import React from 'react';
import './UsersView.css';
import { Card, Button } from 'react-bootstrap';
import UserList from './UserList';
import { Link } from "react-router-dom";

function UsersView() {
  return (
    <div className="UsersView">
      <Card className="UsersView-card">
        <Card.Header className="UsersView-card-header">
          User List
          <Link to="/user" state={null}>
            <Button className="UsersView-button">
              Add new
            </Button>
          </Link>
        </Card.Header>
        <Card.Body className="UsersView-card-body">
          <UserList />
        </Card.Body>
      </Card>
    </div>
  );
}

export default UsersView;

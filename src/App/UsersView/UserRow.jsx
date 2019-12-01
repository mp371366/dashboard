import React from 'react';
import './UserList.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserRow(user, handleDelete) {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.address.city}</td>
        <td>
          <Link
            to={{
              pathname: `/user/${user.id}`,
              state: user
            }}
          >
            <Button
              className="UserList-button"
              variant="warning"
            >
              Edit
            </Button>
          </Link>
        </td>
        <td>
          <Button
            className="UserList-button"
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }

  export default UserRow;
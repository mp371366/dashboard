import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteUserModal({ show, handleCancel, handleSubmit, user }) {
  user = user || {};

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure, that you want to delete {user.username} user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleSubmit(user)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;

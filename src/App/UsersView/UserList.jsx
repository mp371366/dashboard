import React, { useState, useEffect } from 'react';
import './UserList.css';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import DeleteUserModal from './DeleteUserModal';
import * as api from 'lib/api.js';
import UserRow from './UserRow';

const none = 'none';
const asc = 'asc';
const desc = 'desc';
const orders = [none, asc, desc];

function UserList() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState(none);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setWaiting(true);

    api.fetchUsers()
      .then(setUsers)
      .then(() => setWaiting(false))
      .then(() => setError(null))
      .catch(() => setError("bad data fetching"));
  }, []);

  if (error) {
    return <p>Error has occur: {error}.</p>;
  }

  if (waiting) {
    return <p>Waiting ...</p>;
  }

  if (_.isEmpty(users)) {
    return <p>There is no users.</p>;
  }

  const changeOrder = () => setOrder(orders[(_.indexOf(orders, order) + 1) % orders.length]);
  const orderSign = {
    [asc]: '↑',
    [desc]: '↓',
    [none]: ' ',
  }[order];

  function closeModal() {
    setShowModal(false);
    setUser(null);
  }

  function deleteUser(user) {
    api.deleteUser(user)
      .then(() => setUsers(_.differenceBy(users, [user], 'id')))
      .then(closeModal)
      .catch(() => setError("unable to remove user"));
  }

  return (
    <div className="UserList">
      <DeleteUserModal
        show={showModal}
        handleCancel={closeModal}
        handleSubmit={deleteUser}
        user={user}
      />
      <Table className="UserList-table" responsive>
        <thead className="UserList-table-head">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th
              className="UserList-sortable"
              onClick={changeOrder}
            >
              {`Username${orderSign}`}
            </th>
            <th>Email</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="UserList-table-body">
          {_.map(
            order !== none ? _.orderBy(users, 'username', order) : users,
            user => UserRow(user, () => {
              setUser(user);
              setShowModal(true);
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;

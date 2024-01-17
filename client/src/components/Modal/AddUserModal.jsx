// src/components/AddUserModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const handleAddUser = () => {
    onAddUser({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
    });
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add User Modal"
    >
      <h2>Add New User</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
        />

        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;

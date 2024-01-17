// Inside the Dashboard component

import React, { useLayoutEffect, useState } from 'react';
import AddUserModal from '../../components/Modal/AddUserModal';
import AdminNav from '../../components/AdminNav';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import EditUserComponent from '../../components/EditUserComponent';

const Dashboard = () => {
  useLayoutEffect(() => {
    axios.get("http://localhost:8080/admin/get-all-users",{withCredentials:true})
      .then(response => {
        console.log(response,'response');
        const usersData = response.data.users
        setUsers(usersData)
      })
  }, []);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  }

  const handleEditUser = (userId, newName) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, name: newName } : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const cancelEditingUser = () => {
    setEditingUserId(null);
  };

  const createUser = () => {
    navigate('/admin/add-user');
  }

  const startEditingUser = (userId) => {
    setEditingUserId(userId);
  };

  return (
    <>
      <AdminNav/>
      <div className="container mx-auto pt-20">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border p-2 w-1/2 ms-4 outline-none border-b-[1px] border-b-black"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 py-2 me-4 rounded hover:bg-slate-400 hover:text-black"
            onClick={createUser}
          >
            Create User
          </button>
        </div>

        <table className="w-full border">
          <thead className=''>
            <tr>
              <th className="p-3 border">Users' name</th>
              <th className="p-3 border">Users' Email</th>
              <th className="p-3 border">Edit user' details</th>
              <th className="p-3 border">Delete user</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-3 border">
                  {editingUserId === user.id ? (
                    <EditUserComponent
                      user={user}
                      onSave={handleEditUser}
                      onCancel={cancelEditingUser}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">
                  {editingUserId !== user.id && (
                    <button
                      className="bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded transition duration-500"
                      onClick={() => startEditingUser(user.id)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="p-3 border">
                  <button
                    className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 rounded transition duration-500"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;

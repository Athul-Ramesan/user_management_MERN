
// src/components/EditUserComponent.js

import React, { useState } from 'react';

const EditUserComponent = ({ user, onSave, onCancel }) => {
  const [editedName, setEditedName] = useState(user.name);

  const handleSave = () => {
    onSave(user._id, editedName);
  };

  return (
    <div>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <button className='px-4 font-bold text-green-600 cursor-pointer' onClick={handleSave}>Save</button>
      <button className='px-4 font-bold cursor-pointer' onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditUserComponent;

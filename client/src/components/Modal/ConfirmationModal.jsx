// ConfirmationModal.js

import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, userId, onClose,deleteUser,userName  }) => {
  const handleCloseModal = () => {
    onClose(false)
  };
  const handleConfrim = ()=>{
    console.log('inside confirmation modal');
    console.log(userName,'user name in component');
    deleteUser(userId)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-bg-overlay"
      className="bg-white flex flex-col items-center py-4 shadow-xl rounded-md fixed top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"
    >
      <h2 className="mb-8 bg-red-400 w-full text-white border-2 border-slate-400 px-24">
        Are you sure?
      </h2>

      <div className='flex'>
      <button className="ms-32 font-bold text-green-600 cursor-pointer" onClick={handleConfrim}>Confirm</button>
      <button className="px-4 font-bold cursor-pointer" onClick={handleCloseModal}>
        Cancel
      </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

import axios from 'axios'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { SERVER_BASE_URL } from '../../Constants/url'
Modal.setAppElement('#root')


const EditProfileModal = ({userData,isOpen,onClose,updateProfileName,isEditPicture,setIsProfileUpdated,setUserData}) => {
    // const [isEditPicture,setIsEditPicture] = useState(isEditPicture)
    const [newImage, setNewImage] = useState(null)
    const [newName,setNewName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const handleChangeImage= (e)=>{
        console.log(e.target.files[0],'inside hangle image chanfe');
        setNewImage(e.target.files[0])

    }
    const handleChangeName = (e)=>{
        setNewName(e.target.value)
    }
    const handleUpdateProfileName = ()=>{
        console.log(userData,'inside save changes');
        const userId = userData._id
        updateProfileName(newName,userId)
    }
    const closeModal =()=>{
        onClose(false)
    }
    const handleUpdateProfileImage =()=>{
      const userId = userData._id
      console.log(newImage,'newimageeeeeeee');

      const formData = new FormData()
      formData.append("file",newImage);

      console.log(formData.get('file'),'form dataaaaa');
      axios.post(SERVER_BASE_URL+'/add-image/'+`${userId}`,formData,{
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(response=>{
        console.log(response.data);
        setIsProfileUpdated(true)
        setUserData(response.data)
        closeModal()
      })
      .catch(err=>{
        console.log(err.message);
      })
      
    }

  return (
    <Modal   isOpen={isOpen} onRequestClose={onClose}    overlayClassName="modal-bg-overlay" className='bg-white 
    flex flex-col items-center  py-4 shadow-xl rounded-md fixed top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]'>

      {isEditPicture ?  <><h2 className='mb-8 bg-black w-full text-white border-2 border-slate-400 px-24'>Edit Profile Image</h2>
    
       <input type="file" name="image" onChange={handleChangeImage} className='px-6'/>
       <div className='mt-10'>
       <button className='ms-32 font-bold text-green-600 cursor-pointer'onClick={handleUpdateProfileImage}>Save Changes</button>
      <button className='px-4 font-bold cursor-pointer' onClick={closeModal}>Cancel</button>
      </div>
       </> 
       
       :
      <> <h2 className='mb-8 bg-black w-full text-white border-2 border-slate-400 px-24'>Edit Profile</h2>
       <input type="text" onChange={handleChangeName} placeholder='Enter new name' /> 
       <div className='mt-10'>
      <button className='ms-32 font-bold text-green-600 cursor-pointer'onClick={handleUpdateProfileName}>Save Changes</button>
      <button className='px-4 font-bold cursor-pointer' onClick={closeModal}>Cancel</button>
       </div>
       </> }
       
    
    </Modal>
  )
}

export default EditProfileModal

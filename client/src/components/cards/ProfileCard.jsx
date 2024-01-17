import React, { useLayoutEffect, useState } from 'react'
import EditProfileModal from '../../components/Modal/EditProfileModal';
import {useNavigate} from 'react-router-dom'
import { editUserAction, setUser } from '../../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../Constants/url';

const ProfileCard = () => {
    const [isEditPicture,setIsEditPicture] = useState(false)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})
    const [isProfileUpdated,setIsProfileUpdated] = useState(false)
    const [isUpdated, setIsupdated] = useState(false)

    
    useLayoutEffect(()=>{
      axios.get("http://localhost:8080/auth",{withCredentials:true})
        .then(response=>{
          console.log(response,'response');
          const userData=response.data.userData
          console.log(userData,'userdata');
          setUserData(userData)
          setIsProfileUpdated(false)
          
        })
    },[isProfileUpdated])
    const handleUpdateProfile = ()=>{
      setIsEditPicture(false)
      setIsModalOpen(true)
    }
    const handleCloseModal = ()=>{
        setIsModalOpen(false)
    }
    const handleUpdateImage = ()=>{
        setIsEditPicture(true)
        setIsModalOpen(true)
    }
    const updateProfileName =(userId,newName)=>{
       dispatch( editUserAction(newName,userId,setIsModalOpen,setIsupdated))
       setIsProfileUpdated(true)
    }
    
    console.log(userData,'userData in profile card');
  return (
    <>
    <div className="bg-white p-8 rounded-md shadow-md w-2/4 ">
      <div className="flex items-center justify-between mb-6 p-5">
        <div className="mr-8">
          <img src={userData.profileImage ? SERVER_BASE_URL+'/uploads/'+`${userData.profileImage}` : ''} alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md cursor-pointer"/>

          <div onClick={handleUpdateImage} className="text-center mt-2 cursor-pointer font-bold text-green-500"  >
            Update image
          </div>
        </div>
        <div>
          <h3 className='pe-10'>Name: {userData.name}</h3>
          <h4 className='pe-10'>Email: {userData.email}</h4>
        <div onClick={handleUpdateProfile} className="text-center mt-2 cursor-pointer font-bold text-green-500"  >
            Update Data
          </div>
        </div>
        
    
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-4 ml-5 py-2 rounded-md border-[1px] border-black hover:bg-white hover:text-black transition duration-500"
      >
        Back to Home
      </button>
      <EditProfileModal updateProfileName={updateProfileName} setIsProfileUpdated={setIsProfileUpdated} setUserData={setUserData} isEditPicture={isEditPicture} userData={userData} isOpen={isModalOpen} onClose={handleCloseModal}  />
    </div>
  </>
  )
}

export default ProfileCard

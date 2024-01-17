import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SERVER_BASE_URL } from '../../Constants/url';
import ProfileCard from '../../components/cards/ProfileCard';

const Profile = () => {
    // const user = useSelector((state)=> state.user)
    // const [userData,setUserData] = useState({})


    
    // const getUser = ()=>{
    //     console.log('inside getuser');
    //     axios
    //     .get(SERVER_BASE_URL+`/get-user/${user.userId}`)
    //     .then(response=>{
    //         const userData = response.data.userData
    //         setUserData(userData)
    //     })
    //     .catch(err=>{
    //         console.log(err.message);
    //     })
    // }
    
    // useEffect(()=>{
    //     getUser()
    // },[])
  return (
    <>
    <h1 className='font-bold pt-28'> Your Profile</h1>
    <div className='pt-20 flex justify-center items-center'>
      <ProfileCard/>
      
    </div>
    </>
  )
}

export default Profile

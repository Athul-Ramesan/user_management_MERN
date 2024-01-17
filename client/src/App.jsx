import { useLocation,Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/user/Login'
import SignUp from './Pages/user/SignUp'
import Home from './Pages/user/Home'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser,setAdmin } from './store/redux'
import Navbar from './components/Navbar'
import Profile from './Pages/user/Profile'
import Dashboard from './Pages/admin/Dashboard'
import AdminLogin from './Pages/admin/AdminLogin'
import AdminNav from './components/AdminNav'
import AdminAddUser from './Pages/admin/AdminAddUser'

function App() {
  const user = useSelector((state)=>state.user)
  const admin = useSelector((state)=>state.admin)
  const dispatch = useDispatch()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  console.log(isAdminRoute,'is admin route');
  // const isUserUrl = location.pathname('/*')
  console.log(admin,'admin in app.js after useSelector');
  useEffect(()=>{
    if(!user.isAuthenticated){
      axios.get("http://localhost:8080/auth",{withCredentials:true})
        .then(response=>{
          console.log(response,'response');
          const userData=response.data.userData
          console.log(userData,'userdata');
          dispatch(setUser({
            userId:userData._id,
            name: userData.name
          }))
        })
    }
    if(!admin.isAuthenticated){
      axios.get("http://localhost:8080/admin/admin-auth",{withCredentials:true})
      .then(response=>{
        const adminData=response.data.adminData
        console.log(adminData,'admindata');
        dispatch(setAdmin({
          adminId:adminData._id,
          name: adminData.name
        }))
      })  
    }
  },[user,admin])
  
  return (
    <>
    <Toaster position='top-center'/>
    {(user.isAuthenticated && !isAdminRoute )? (
      <>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Navigate to="/home"/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/profile' element={<Profile/> }/>
      <Route path='/login' element={<Navigate to={'/home'}/>} />
      <Route path='/sign-up' element={<Navigate to={'/home'}/>} />
      {/* <Route path="*" element={<NotFound/>} /> */}
    </Routes>
      </>
    ) : ( !isAdminRoute &&
      <>
      <Navbar/>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path='/profile' element={<Navigate to={'/home'}/>} />
            {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
          </>
    )}
    {admin.isAuthenticated 
    ?
    (<>
    
    <Routes>
    <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/login' element={<Navigate to={'/admin/dashboard'}/>} />  
      <Route path='/admin/dashboard' element={<Dashboard/>} />
      <Route path='/admin/add-user' element={<AdminAddUser/>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes> 
    </>)
    :
     ( <Routes>
        <Route path='/admin/login' element={<AdminLogin/>} />
        {/* <Route path='admin/dashboard' element={<Navigate to={'/admin/login'}/>} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>)
     }
    </>
  )
}

export default App

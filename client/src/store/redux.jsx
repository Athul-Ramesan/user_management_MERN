import axios from "axios";
import { createStore,combineReducers,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { SERVER_BASE_URL } from "../Constants/url";
import toast from 'react-hot-toast'
axios.defaults.baseURL ='http://localhost:8080'


const userReducer = (prevState = {isAuthenticated:false},action)=>{    //initially authentication setting false. if there is no other action happened or no new state comes.
    switch (action.type) {
        case 'set_user':
            return {
                ...prevState,
                userId: action.payload.userId,
                name:action.payload.name,
                isAuthenticated: true
            }
        case 'log_out_user':
            return {
                ...prevState,
                userId: '',
                name: '',
                isAuthenticated: false
            }
        default:
            return prevState;
    }
}
const adminReducer = (prevState={isAuthenticated:false},action)=>{

        switch (action.type){
            case 'set_admin':
                return {
                    ...prevState,
                    adminId: action.payload.id,
                    name: action.payload.name,
                    isAuthenticated: true   
                }
                case 'log_out_admin':
            return {
                ...prevState,
                adminId: '',
                name: '',
                isAuthenticated: false
            }
            case 'get_all_users':
                return{
                    ...prevState,
                    users:action.payload.users
                }
            default:
                return prevState 
        }
}


const combinedReducer = combineReducers({
    user: userReducer,
    admin: adminReducer
})

//
export const setUser = ({userId,name})=>({
    type: 'set_user',
    payload : {userId,name}
})

export const signupUserAction = ({name,email,password},navigate,setErrorMessage,isAdmin)=>{
    return (dispatch)=>{
        console.log(name,email,password);
        console.log('inside dispatch');
        axios
        .post('/sign-up',{name,email,password},{withCredentials:true})
        .then(response=>{
            console.log(response.data);
           if(response.data.success==true){
               const userId = response.data.user.userId;
               const name = response.data.user.name
               const message = isAdmin ?  "successfully created user!" :"You are successfully registered!"
               toast.success(message);
               dispatch(setUser({userId,name}))

               isAdmin ? navigate('/admin/dashboard') : navigate('/home')
           }else{

           }
        }).catch(err=>{
            toast.error(err.response.data.error)
        })
    }
}
export const loginUserAction = ({email,password},navigate)=>{
    return (dispatch)=>{
        axios
            .post('/login',{email,password},{withCredentials:true})
            .then(response=>{
                console.log(response,'response');
                if(response.data.success){
                    const userId =response.data.userData._id;
                const name = response.data.userData.name
                dispatch(setUser({userId,name}))
                toast.success("You have successfully logged in")
                navigate('/home')
                }else{
                    toast.error(response.data.message)
                }
            })
            .catch(err=>{
                console.log(err.message);
            })

    }
}
export const logoutUserAction = (navigate)=>{
    return (dispatch)=>{
        axios
         .get('/logout',{withCredentials:true})
         .then(response=>{
            console.log(response.data)
            dispatch({
                type:'log_out_user'
            })
            navigate('/sign-up')
            toast.success('You have logged out successfully !')
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }
}
export const userEditProfileAction =(name,image)=>{
    return (dispatch)=>{
        data= {name,image}
        axios.put(SERVER_BASE_URL+'/edit-profile',{data},{headers: {
            'Content-Type': 'multipart/form-data',
          }})
        .then(response=>{
            console.log(response);

        })
        .catch(err=>{
            console.log(err.message);
        })
    }
}

///admin
export const setAdmin = ({ name, id }) => ({
    type: 'set_admin',
    payload: { name, id }
})

export const loginAdminAction = ({email,password},navigate)=>{
    return (dispatch)=>{
        axios
            .post('/admin/login',{email,password},{withCredentials:true})
            .then(response=>{
                console.log(response,'response in loggin admin action');
                if(response.data.success){
                    const adminId =response.data.adminData._id;
                const name = response.data.adminData.name
                dispatch(setAdmin({adminId,name}))  
                toast.success("You have successfully logged in")
                navigate('/admin/dashboard')
                }else{
                    toast.error(response.data.message)
                }
            })
            .catch(err=>{
                console.log(err.message);
            })

    }
}
export const logoutAdminAction = (navigate)=>{
    return (dispatch)=>{
        axios
        .get('/admin/logout',{withCredentials:true})
        .then(response=>{
            console.log(response.data)
            dispatch({
                type:'log_out_admin'
            })
            navigate('/admin/login')
            toast.success('You have logged out successfully !')
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }
}
export const editUserAction = (userId,newName,setIsModalOpen,setIsupdated)=>{
    return (dispatch)=>{
        console.log(userId, newName,'newusername and userid');
        axios.post(SERVER_BASE_URL+'/admin/edit-user',{userId,newName},{withCredentials:true})
        .then(response=>{
            console.log(response, 'response inside eidt user action');
            const userId = response.data.user._id;
               const name = response.data.user.name
            dispatch(setUser({userId,name}))
            // setIsupdated(true)
            setIsModalOpen(false)
            toast.success('Profile updated')
        })
        .catch(err=>{
            console.log(err.message);
            return
        })
    }

}
export const fetchUsers = ()=>{
    return (dispatch)=>{
        axios
            .get('/get-all-users',{withCredentials:true})
            .then(response=>{
                console.log(response.data);
                const users = response.data.users
                dispatch({
                    type: 'get_all_users',
                    payload:users
                })
            })
            .catch(error=>{
                console.log(error.message);
                toast.error('something went wrong when fetching users data')
            })
    }
}

export default createStore(combinedReducer,applyMiddleware(thunk))
const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const userModel = require('../models/userModel')


module.exports ={

    loginAdmin:async (req,res)=>{
        const {email,password} = req.body
        console.log(req.body,'reqqqqqq');
        console.log(email,password ,'email nd pasword admin');
            try {
                 await adminModel.findOne({email:email})
                 .then(async(admin)=>{
                     console.log(admin,'admin in login');
                     if(admin){
                        const result = (password === admin.password)
                         if(result){
                             console.log(result,'result after compare');
                             const token = jwt.sign({admin:admin._id},'jwtadminsecret',{expiresIn:'10d'})
                             res.cookie('jwtadmintoken',token,{maxAge: 10*24*60*60*1000})
                             return res.json({success:true,adminData:admin,message: 'password is correct'})
                             
                            }else{
                                res.json({success:false,message:'email or passowrd incorrect'})
                                return
                            }
                        }else{
                            res.json({success:false,message:'email or password incorrect'})
                        }
                    })
    
            } catch (error) {
                res.status(500).json({success:false,message:'Some internal server error'})
                console.log(error.message,'error in catch');
                return
            }
        },
        adminAuth :async(req,res)=>{
            console.log('inside admin auth');
        const token = req.cookies.jwtadmintoken
        if(!token){
            res.json({success:false})
        }else{
            jwt.verify(token,'jwtadminsecret',async(err,decoded)=>{
                if(err){
                    res.json({success:false,message:err.message})
                }else{
                    console.log(decoded,'decoded')
                    const adminId= decoded.admin
                    const admin = await adminModel.findOne({_id:adminId})
                    res.json({success: true, adminData:admin})
                }
            })
        }
    
    },
    logoutAdmin: (req,res)=>{
        console.log('inside logout admin');
        res.clearCookie('jwtadmintoken')
        res.status(200).json({success:true})
    },
    getAllUsersAdmin : async(req,res)=>{
        try {
            await userModel.find({})
            .then(response=>{
                res.json({success:true, users:response})
                return
            })
            .catch(err=>{
                res.json({success:false,message:'Something went wrong'})
            })

        } catch (error) {
            
        }
        console.log('inside get all users');
    },
    editUserAdmin:async(req,res)=>{
        console.log('inside edit user admin');
        console.log(req.body,'req.body');

        await userModel.findOneAndUpdate({_id:req.body.userId},{name:req.body.newName},{new:true})
            .then(result=>{
                console.log(result);
                res.json({success:true, user:result})
                return
            })
            .catch(err=>{
                console.log(err.message);
                return res.json({success:false,message:'something went wrong'})
            })

    },
    deleteUserAdmin:async(req,res)=>{
        console.log(req.params)
        try {
            await userModel.findByIdAndDelete(req.params.id)
            .then(result=>{
                console.log(result,'result inside delete user');
                res.json({success: true,message:'User deleted'})
            })
            .catch(err=>{

                res.json({success:false, message:'some internal error'})
            })
        } catch (error) {
            
        }
    }
}

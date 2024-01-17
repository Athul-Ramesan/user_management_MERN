const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const { findByIdAndUpdate } = require('../models/adminModel')

module.exports={

    loginUser:async (req,res)=>{
        const {email,password} = req.body
        console.log(req.body,'reqqqqqq');
        console.log(email,password ,'email nd pasword user');
            try {
                 await userModel.findOne({email:email})
                 .then(async(user)=>{
                     console.log(user,'user in login');
                     if(user){
                         const result = await bcrypt.compare(password,user.password)
                         if(result){
                             console.log(result,'result after compare');
                             const token = jwt.sign({user:user._id},'jwtusersecret',{expiresIn:'10d'})
                             res.cookie('jwtusertoken',token,{maxAge: 10*24*60*60*1000})
                             return res.json({success:true,userData:user,message: 'password is correct'})
                             
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
    signupUser : async(req,res)=>{
        console.log(req.body,'req.body');

        const {name,email,password} = req.body
        try {
            const hashedPassword = await bcrypt.hash(password,10)
            const user = await userModel.findOne({email:email})
            console.log(user,'user');
            if(user){
                console.log('user exists');
               return res.status(400).json({success:false,error: 'User already exists'})
            }

            await userModel.create(
                {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    createdAt: Date.now().toLocaleString()
                }
            ).then(user=>{
                console.log(user,'user after register');
                const token = jwt.sign({user:user._id},'jwtusersecret',{expiresIn:"10d"})
                res.cookie('jwtusertoken',token,{
                    maxAge: 10*24*60*60*1000
                })
               return res.status(200).json({success:true,user:{name,userId:user._id}})
            })
        } catch (error) {
            res.json({success:false,message: error.message})
        }
    },
    auth: async(req,res)=>{
        const token = req.cookies.jwtusertoken
        if(!token){
            res.json({success:false})
        }else{
            jwt.verify(token,'jwtusersecret',async(err,decoded)=>{
                if(err){
                    res.json({success:false,message:err.message})
                }else{
                    console.log(decoded,'decoded')
                    const userId= decoded.user
                    const user = await userModel.findOne({_id:userId})
                    res.json({success: true, userData:user})
                }
            })
        }
    },
    logoutUser: (req,res)=>{
        console.log('inside logout');
        res.clearCookie('jwtusertoken')
        res.status(200).json({success:true})
    },
    getUser: async(req,res)=>{
        const userId = req.params.id;
        try {
            await userModel.findOne({_id: new mongoose.Types.ObjectId(userId)})
            .then(response=>{
                const userData = response
                res.json({success:true,userData:userData})
                return
            })
        } catch (error) {
            console.log(error.message);
            return res.json({success:false,message:error.message})

        }
    },
    addImage:async(req,res)=>{
        const userId = req.params.id;
        try {
            const user = await userModel.findOne({_id:userId})
            if(user){
                console.log(req.file,'req.file');
                const newUser = await userModel.findByIdAndUpdate(user.id,{profileImage:req.file.filename},{new:true})
                res.json({success:true,userData:newUser})
                return
            }else{
                return res.json({success:false,message:'something went wrong'})
            }
        } catch (error) {
            console.log(error.message);
            return res.json({success:false,message:'something went wrong'})
        }
    }
}
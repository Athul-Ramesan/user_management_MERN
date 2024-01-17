const jwt = require('jsonwebtoken')


module.exports = {

     adminAuth : (req,res,next)=>{
        const token = req.cookies.jwtadmintoken;
        if(token){
            jwt.verify(token, 'jwtadminsecret',(err,decoded)=>{
                if(err){
                    res.json({status:false, message:'Protected, route token doesnt exist'})
                }else{
                    next()
                }
            })
        }else{
            res.json({status:false, message:'Protected route, token doesnt exist'})
        }
    },
    userAuth : (req,res,next)=>{
        const token = req.cookies.jwtusertoken;
        if(token){
            jwt.verify(token, 'jwtusersecret',(err,decoded)=>{
                if(err){
                    res.json({status:false, message:'Protected, route token doesnt exist'})
                }else{
                    next()
                }
            })
        }else{
            res.json({status:false, message:'Protected route, token doesnt exist'})
        }
    }

}


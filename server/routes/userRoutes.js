const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/auth')

router.post('/login',userController.loginUser)
router.post('/sign-up',userController.signupUser)
router.get('/auth',auth.userAuth,userController.auth)
router.get('/logout',userController.logoutUser)
router.get('/get-user/:id',auth.userAuth,userController.getUser)
// router.get('/edit-profile',userController.editUser)
router.post('/add-image/:id',auth.userAuth,upload.single("file"),userController.addImage)

module.exports = router
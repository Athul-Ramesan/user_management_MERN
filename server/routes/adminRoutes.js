const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminContorller')
const auth = require('../middlewares/auth')

router.post('/login',adminController.loginAdmin)
router.get('/admin-auth',auth.adminAuth, adminController.adminAuth)
router.get('/logout',adminController.logoutAdmin)
router.get('/get-all-users',auth.adminAuth,adminController.getAllUsersAdmin)
router.post('/edit-user',auth.adminAuth,adminController.editUserAdmin)
router.delete('/delete-user/:id',auth.adminAuth,adminController.deleteUserAdmin)


module.exports = router
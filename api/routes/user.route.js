import express from 'express'
import { deleteUser, getAllUser, getUser,updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()
router.use(authenticate)
router.get('/get-user/:userid', getUser)
router.put('/update-user/:userid', upload.single('file'), updateUser)
router.get('/get-all-user', getAllUser)
router.get('/delete/:id', deleteUser)




export default router
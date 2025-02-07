import express from 'express'
import { addComment, commentCount, deleteComment, getAllComments, getComments } from '../controllers/comment.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()

router.post('/add' , authenticate, addComment)
router.get('/get/:blogid', getComments)
router.get('/get-count/:blogid', commentCount)
router.get('/get-all-comment',authenticate, getAllComments)
router.delete('/delete/:commentid',authenticate, deleteComment)




export default router
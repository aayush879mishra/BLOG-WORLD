import express from 'express'
import { doLike, likeCount } from '../controllers/bloglike.controller.js'
import { authenticate } from '../middleware/authenticate.js'


const router = express.Router()

router.post('/do-like',authenticate, doLike)
router.get('/get-like/:blogid/:userid?', likeCount)



export default router
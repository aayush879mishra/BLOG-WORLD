import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/blog.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()

router.post('/add',authenticate, upload.single('file'), addBlog)
router.get('/edit/:blogid',authenticate, editBlog)
router.put('/update/:blogid',authenticate, upload.single('file'), updateBlog)
router.delete('/delete/:blogid',authenticate, deleteBlog)
router.get('/get-all',authenticate, showAllBlog)

router.get('/get-blog/:slug', getBlog)
router.get('/get-related-blog/:category/:blog', getRelatedBlog)
router.get('/get-blog-by-category/:category', getBlogByCategory)
router.get('/search', search)

router.get('/blogs', getAllBlogs)



export default router
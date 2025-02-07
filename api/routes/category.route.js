import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/category.controller.js'
import { onlyadmin } from '../middleware/onlyadmin.js'


const router = express.Router()

router.post('/add', onlyadmin,  addCategory)
router.put('/update/:categoryid',onlyadmin,  updateCategory)
router.get('/show/:categoryid',onlyadmin,  showCategory)
router.delete('/delete/:categoryid',onlyadmin,  deleteCategory)
router.get('/all-category', getAllCategory)


export default router
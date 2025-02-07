import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import AuthRoute from './routes/auth.route.js'
import UserRoute from './routes/user.route.js'
import CategoryRoute from './routes/category.route.js'
import BlogRoute from './routes/blog.route.js'
import CommentRoute from './routes/comment.route.js'
import BlogLikeRoute from './routes/bloglike.route.js'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// Routes
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)


mongoose.connect(process.env.MONGODB_CONN, { dbName: 'mernblog'})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log(error)
    })



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'
    res.status(statusCode).json({ success: false, statusCode,message })
})

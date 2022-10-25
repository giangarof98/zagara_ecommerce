import express from 'express';
import morgan from 'morgan';
import path from 'path'
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/upload', uploadRoutes);

//custom middleware

app.get('/api/config/paypal', (req,res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static('uploads'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} 

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {`Server running in ${process.env.NODE_ENV} on port ${PORT}`});
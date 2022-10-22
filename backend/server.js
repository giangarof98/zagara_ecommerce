import express from 'express';
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
app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {`Server running in ${process.env.NODE_ENV} on port ${PORT}`});
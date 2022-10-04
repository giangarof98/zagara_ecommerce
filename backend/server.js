import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express();

app.get('/', (req,res) => {
    res.send('yes')
});

app.use('/api/products', productRoutes);

//custom middleware

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {`Server running in ${process.env.NODE_ENV} on port ${PORT}`});
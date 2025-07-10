const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectdb = require('./db/connectdb');
const userRoutes = require('./routes/userRoutes');
const domainRoutes = require('./routes/domainRoutes');
const companyRoutes = require('./routes/companyRoutes');
const productRoutes = require('./routes/productRoutes');
const companyUserRoutes = require('./routes/companyUserRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes);
app.use('/api/domain',domainRoutes);
app.use('/api/company',companyRoutes);
app.use('/api/product',productRoutes);
app.use('/api/order',companyUserRoutes);
app.use('/api/cart',cartItemRoutes);
app.use('/api/order',orderItemRoutes);

app.listen(PORT, ()=>{
    connectdb();
    console.log(`Server is running on port ${PORT}`);
});
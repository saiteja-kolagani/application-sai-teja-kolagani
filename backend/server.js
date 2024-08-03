const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); 


const authMiddleware = require('./middleware/authMiddleware');


dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use(bodyParser.json());


app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    httpOnly: true
  }
}));

app.use('/api/auth', authRoutes); 
app.use('/api/products', authMiddleware, productRoutes); 
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/orders', authMiddleware, orderRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

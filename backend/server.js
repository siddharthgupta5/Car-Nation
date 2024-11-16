require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

const cors = require('cors');

const AuthRouters = require("./routes/authRoute");
const CarRouters = require("./routes/carRoute");

const app = express()

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth',AuthRouters)
app.use('/api/car',CarRouters)

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
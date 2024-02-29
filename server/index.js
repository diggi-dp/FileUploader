const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/index')
const connectDB = require('./db')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

// Connect to MongoDB
connectDB();

//routes
app.use('/api/v1', routes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
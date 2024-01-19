require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// Routes
const authRouter = require('./routes/auth');

app.use(express.json());
app.use('/api/v1/auth', authRouter);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`\nServer is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
start()  
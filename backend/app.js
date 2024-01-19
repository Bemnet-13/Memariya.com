require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// Middleware
const authenticateUser = require('./middleware/authentication');

// Routes
const authRouter = require('./routes/auth');
const coursesRouter = require('./routes/courses');


//error handling

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', authenticateUser,coursesRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
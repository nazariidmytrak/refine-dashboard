import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(function (req, res, next) {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log('Server started on port http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

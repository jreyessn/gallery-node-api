import express from 'express';
import morgan from 'morgan';
import Router from './routes/index';
import path from 'path';
const cors = require('cors');

const app = express();

// Settings 

app.set('port', 3001)

// Middlewares

app.use(morgan('dev'));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

// Routes

app.use(express.json());
app.use('/api', Router);

// Almacenar y acceder a los archivos publicos

app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
import express from 'express';
import morgan from 'morgan';
import Router from './routes/index';
import path from 'path';
const cors = require('cors');

const app = express();

// Settings 

app.set('port', 3000)

// Middlewares

app.use(morgan('dev'));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

// Routes

app.use('/api', Router);
app.use(express.json());

// Almacenar y acceder a los archivos publicos

app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
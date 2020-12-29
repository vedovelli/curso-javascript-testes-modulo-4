import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import { attachRouters } from '@/routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

attachRouters(app);

// Custom Error Handler
app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

export default app;

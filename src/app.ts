import express from 'express';
import { NextFunction, Request, Response } from 'express';
import HttpException from './exceptions/HttpException';

const app = express();

// middleware
app.use(express.json());
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.statusCode || 500).json({ error: err.message })
})

// routing
const router = require('./routes/')
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port' + port);
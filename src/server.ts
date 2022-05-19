import express from 'express';
import "reflect-metadata";
import "express-async-errors";
import './database';
import {exceptionsHandle} from './middleware/handleExceptions';

import {router} from './routes';

const app = express();
app.use(express.json());

app.use(router);

app.use(exceptionsHandle);

app.listen(3000, ()=>{
  console.log("listening on port 3000");
});


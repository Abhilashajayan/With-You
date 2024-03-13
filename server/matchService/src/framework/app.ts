import express from 'express';
import cors from 'cors';
import nocache from 'nocache';
import { dbConnection } from './database/database.con';
import { matchRouter } from '../adapters/routes/match.routes';

const app = express();
const port =  process.env.PORT || 3004;
app.use(cors());

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(matchRouter);
app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });
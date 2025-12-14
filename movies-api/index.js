import dotenv from 'dotenv';
import express from 'express';
import './db';
// other imports
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';   


dotenv.config();

const errHandler = (err, req, res, _next) => {
  console.error('ERROR:', err);        
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173',   // allow your React dev server
}));

app.use(express.json());

//Users router
app.use('/api/users', usersRouter);

app.use('/api/movies', moviesRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

console.log("MONGO_DB:", process.env.MONGO_DB);

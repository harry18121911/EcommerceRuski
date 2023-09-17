import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//configure dotenv
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//rest api
app.get('/', (req, res) =>{
    res.send(
        '<h1>Welcome to Ruski</h1>'
        
    )
})

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
    console.log('Server UP')
})
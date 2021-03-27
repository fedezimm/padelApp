/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express, { Application,Request, Response } from 'express';
import { urlencoded,json } from 'body-parser';
import dotenv from 'dotenv';

import api from './routes/index';
import connectToDB from './db/connection';

dotenv.config();

const port:string = process.env.PORT!;
const app:Application = express();
app.use(urlencoded({ extended: false}));
app.use(json());

api(app);

app.use(( req:Request, res:Response )=>{
    res.status(404).send('Not Found')
});

connectToDB().then((connected:boolean) =>{
    if(connected){
        app.listen(parseInt(port),() => {
            console.log('running on port',parseInt(port))
        });
    }else{
        console.log("ERROR MONGO DB")
    }
});
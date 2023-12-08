import express from 'express'
import mongoose from 'mongoose'
import app from './server/index.js'
import config from './config/config.js'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri).then(() => {
        console.log("Connected to the database");
        console.log()
    });

mongoose.connection.on('error', () =>{
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
})

app.get('/', (req,res)=>{
    res.json('Welcome to the FlashBurger House Application');
});

app.listen(config.port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server started on port: ${config.port}`);
})


const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require("body-parser");

const app=express();

const log = require("./logger/log")
const validateRequest = require('./middleware/validateRequest');
const router = require('./router/todoRouter');
const notfound =require("./controller/404file");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.076ljp2.mongodb.net/?retryWrites=true&w=majority`

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validateRequest);    
app.use('/',router);
app.use(notfound.File404);

mongoose.connect(MONGO_URL).then(res=>{
    app.listen(process.env.PORT || 3001, () => {
        log.info(`Server is running ... `);
      });
}).catch(error=>{
    log.error("Db is not connecting")
})

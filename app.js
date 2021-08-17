const express = require('express');
const db = require('./db');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/createQuiz/:topic", (req, res)=>{
    let result = db.createQuiz(req.params.topic);
    if (result.error){
        res.sendStatus(400).send(result);
    }else{
        console.log();
        res.sendStatus(200);
    }

})

app.listen('3000', ()=>{
    console.log("Server Listening on Port 3000")
})
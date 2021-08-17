const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen('3000', ()=>{
    console.log("Server Listening on Port 3000")
})
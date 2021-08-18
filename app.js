const express = require('express');
const student = require('./Routes/student');
const teacher = require('./Routes/teacher');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/student', student);
app.use('/teacher', teacher);

app.listen('3000', ()=>{
    console.log("Server Listening on Port 3000")
})
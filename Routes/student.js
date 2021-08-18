const express = require('express');
const db = require('../db');

let app = express.Router();


app.get("/getQuizzes/:topic", (req, res) => {
    db.getQuizzes(req.params.topic)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            res.sendStatus(400);
        })
})

app.get("/takeQuiz/:quiz_id", (req, res) => {
    db.takeQuiz(req.params.quiz_id)
        .then((quiz) => {
            res.status(200).send(quiz);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
})


module.exports = app;
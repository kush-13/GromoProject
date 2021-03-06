const express = require('express');
const db = require('../db');

let app = express.Router();


app.post("/createQuiz/:topic", (req, res) => {
    db.createQuiz(req.params.topic)
        .catch((error) => {
            res.status(400).send(error);
        })
        .then(() => {
            res.sendStatus(200);
        })
})

app.post("/addQuestion", (req, res) => {
    const { quiz_id, brief, op1, op2, op3, op4, ans } = req.body;
    db.addQuestion(quiz_id, brief, op1, op2, op3, op4, ans)
        .then((results, fields) => {
            res.status(200).send({ message: "addition successfull", results: results, fields: fields });
        })
        .catch((error) => {
            res.status(400).send(error);
        });

})

app.delete("/deleteQuestion/:question_id", (req, res) => {
    db.deleteQuestion(req.params.question_id)
        .then(() => {
            res.status(200).send({ message: "deletion successfull !!" })
        })
        .catch((error) => {
            res.status(400).send(error);
        })

})

app.delete("/deleteQuiz/:quiz_id", (req, res) => {
    db.deleteQuiz(req.params.quiz_id)
        .then(() => {
            res.status(200).send({ message: "deletion Sucessfull !!" });
        })
        .catch((error) => {
            res.status(400).send(error);
        })
})


app.patch("/modifyQuiz/:quiz_id/:newtopic", (req, res) => {
    const { quiz_id, newtopic } = req.params;
    db.modifyQuiz(quiz_id, newtopic)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
})

app.patch("/modiyQuestion", (req, res) => {
    const { question_id, brief, ans, op1, op2, op3, op4 } = req.body;
    db.modifyQuestion(question_id, brief, ans, op1, op2, op3, op4)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
})

module.exports = app;
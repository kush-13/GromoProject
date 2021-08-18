var mysql = require('mysql');
const config = require('./config');

// function to return connection object {connection to sql database}
// returns null if can't establish connection

const connection = mysql.createConnection(config);

connection.connect((err)=>{
    if (err){
        console.log("error connecting to the database ...")
    }
});


module.exports.createQuiz = (topic)=>{
    // fxn to run a query on dataBase to 
    // create a quiz on the given topic
    // return's a promise

    return new Promise((resolve, reject)=>{
        return connection.query(`insert into quiz (topic) values ("${topic}");`, function (error, results, fields) {
            if (error){
                reject(error);
            }else{
                console.log(`successfully created quiz on topic ${topic}`);
                resolve();
            }; 
        });
    });

}


module.exports.addQuestion = (quiz_id, brief, op1, op2, op3, op4, ans)=>{
    // fxn to run a query on dataBase to 
    // add a question for a given quiz_id
    // and given information {briefs, op1, op2 ...}
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`select * from quiz where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error||results.length == 0){
                reject(error||{error:"invalid quiz_id"});
                }else{
                connection.query(`insert into questions (quiz_id, brief, op1, op2, op3, op4, ans) value (${quiz_id}, "${brief}", "${op1}", "${op2}", "${op3}", "${op4}", "${ans}")`, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log("Sucessfully added question ...")
                        resolve();
                    }
                })
                }
            });
    })

}


module.exports.deleteQuestion = (question_id)=>{
    // fxn to run a query on dataBase to 
    // delete a question with a given question_id
    // and given information {briefs, op1, op2 ...}
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`delete from questions where question_id = ${question_id}`, (error, results, fields)=>{
            if (error||(results&&results.affectedRows==0)){
                reject(error||{error: "invalid queston id"});
            }else{
                resolve();
            }
        })
    })
}


module.exports.deleteQuiz = (quiz_id)=>{
    // fxn to run a query on dataBase to 
    // delete a Quiz for a given quiz_id
    // and all the question associated with
    // that quiz_id
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`delete from quiz where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error||(results&&results.affectedRows==0)){
                reject(error||{error: "invalid quiz_id"})
            }else{
                connection.query(`delete from questions where quiz_id = ${quiz_id}`, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                })
            }
        })


    })
}

module.exports.modifyQuiz = (quiz_id, topic)=>{
    // fxn to run a query on dataBase to 
    // modify quiz information for a given quiz_id
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`update quiz set topic = "${topic}" where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error||(results&&results.affectedRows == 0)){
                reject(error||{error:"invalid quiz_id"});
            }else{
                resolve();
            }
        })
    })
}

module.exports.modifyQuestion = (question_id, brief, ans, op1, op2, op3, op4)=>{
    // fxn to run a query on dataBase to 
    // modify question information
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`update questions set brief = "${brief}", op1 = "${op1}", op2 = "${op2}",
        op3 = "${op3}", op4 = "${op4}", ans = "${ans}" where question_id = ${question_id}`, (error, results, fields)=>{
            if (error||(results&&results.affectedRows == 0)){
                reject(error||{error: "invalid question id "})
            }else{
                resolve();
            }
        })
    })
}

module.exports.getQuizzes = (topic)=>{
    // fxn to run a query on dataBase to 
    // get quizzes with given topic
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`select * from quiz where topic = "${topic}"`, (error, results, fields) => {
            if (error) {
                reject();
            } else {
                resolve(results)
            }
        })

    })
}

module.exports.takeQuiz = (quiz_id)=>{
    // fxn to run a query on dataBase to 
    // get quiz with given quiz_id
    // return's a promise

    return new Promise((resolve, reject)=>{
        connection.query(`select * from questions where quiz_id = ${quiz_id}`, (error, results)=>{
            if (error||results==null||results.length ==0){
                reject()
            }else{
                resolve(results);
                }
            })
        })
           
}
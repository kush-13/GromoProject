var mysql = require('mysql');
const config = require('./config');

module.exports.getConnection = ()=>{
    var connection = mysql.createConnection(config);

    connection.connect((err)=>{
        if (err){
            console.log("error connecting to the database ...")
            return null;
        }
    });

    return connection;
}

module.exports.createQuiz = (topic, connection)=>{
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


module.exports.addQuestion = (quiz_id, brief, op1, op2, op3, op4, ans, connection)=>{

    return new Promise((resolve, reject)=>{
        connection.query(`select * from quiz where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error||results.length == 0){
                reject(error||{error:"invalid quiz_id"});
                }
            });
        connection.query(`insert into questions (quiz_id, brief, op1, op2, op3, op4, ans) value (${quiz_id}, "${brief}", "${op1}", "${op2}", "${op3}", "${op4}", "${ans}")`, (error, results, fields)=>{
            if (error){
                reject(error);
            }else{
                console.log("Sucessfully added question ...")
                resolve();
            }
        })

    })

}


module.exports.deleteQuestion = (question_id, connection)=>{
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


module.exports.deleteQuiz = (quiz_id, connection)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`delete from quiz where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error||(results&&results.affectedRows==0)){
                reject(error||{error: "invalid quiz_id"})
            }
        })

        connection.query(`delete from questions where quiz_id = ${quiz_id}`, (error, results, fields)=>{
            if (error){
                reject(error);
            }else{
                resolve();
            }   
        })
    })
}

module.exports.modifyQuiz = (quiz_id, topic, connection)=>{
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

module.exports.modifyQuestion = (question_id, brief, ans, op1, op2, op3, op4, connection)=>{
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

module.exports.getQuizzes = (topic, connection)=>{

    return new Promise((resolve, reject)=>{
        connection.query(`select * from quiz where topic = "${topic}"`, (error, results, fields) => {
            console.log(results);
            if (error) {
                reject();
            } else {
                resolve(results)
            }
        })

    })
}

module.exports.takeQuiz = (quiz_id, connection)=>{
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
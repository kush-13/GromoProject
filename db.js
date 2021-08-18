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
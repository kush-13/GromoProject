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
    return connection.query(`insert into quiz (topic) values ("${topic}");`, function (error, results, fields) {
        if (error){
            return {error:true, message:error}
        }else{
            console.log(`successfully created quiz on topic ${topic}`);
            return {error:false}
        };
        
    });

}
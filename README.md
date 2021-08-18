# GromoProject
Backend Assignement for GroMo

### Requirements to run this project
- mysql database installed and running
- node installed
- npm installed

## how to install this project
1. clone the repo
2. cd in to the repo
3. run ``` npm i ```
4. after the installation run ``` npm start```

# DataBase Schema
  - **Quiz**
    ```CREATE TABLE Quiz ( quiz_id INT NOT NULL AUTO_INCREMENT , topic VARCHAR(35) NOT NULL , PRIMARY KEY (quiz_id));  ```
  - **Questions**
    ``` CREATE TABLE Questions ( question_id INT NOT NULL AUTO_INCREMENT , quiz_id INT NOT NULL, brief VARCHAR(350) NOT NULL, op1 VARCHAR(35) NOT NULL, op2 VARCHAR(35) NOT NULL, op3 VARCHAR(35) NOT NULL, op4 VARCHAR(35) NOT NULL, ans VARCHAR(35) NOT NULL,   PRIMARY KEY (question_id)); ```

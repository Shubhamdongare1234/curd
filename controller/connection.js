var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'shubham',
    password:'shubham',
    database:'curd1'
});
connection.connect((err)=>{
    if(err){
        console.log("connection not established");

    }else{
        console.log("connection established");

    }
});
module.exports=connection;
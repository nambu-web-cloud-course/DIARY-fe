const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'dbuser',
    password:'Pass1234',
    database:'school',
});
con.connect();
con.query('select * from test_service', (error, rows)=> {
    if (error) throw error;
    console.log('test:',rows);
});
con.end();

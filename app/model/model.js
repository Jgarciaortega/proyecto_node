module.exports.getConnection=function(){

    const mysql = require('mysql');
    
    let config = {
        host     : 'localhost',
        user     : 'admin',
        password : 'admin',
        database : 'db_rtw',
        insecureAuth : true
    };

    return mysql.createConnection(config);
}

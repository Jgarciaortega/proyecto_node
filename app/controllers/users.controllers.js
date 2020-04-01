const model = require('../model/model');

exports.isValidUser = async (req, res) => {
    const connection = await model.getConnection();
    let passIsCorrect = false;
    connection.connect(async err => {
        if (err) {
            return console.error(
                "Database not connected!  : " +
                JSON.stringify(err, undefined, 2)
            );
        }

        const { nickname, password } = req.body;

        let sql = `SELECT * FROM usuario WHERE nickname ='${nickname}'`;

        connection.query(sql, (error, results) => {
            if (error) {
                return console.error(error.message);
            }

            //si no existe el usuario...
            if (results.length == 0) {
                return res.send({ msg: "Usuario not valid" });

            }

            if (password == results[0].password) {
                passIsCorrect = true;
            }

            if (passIsCorrect) {
                console.log('usuario correcto')
                return res.send({ msg: "Usuario correcto" });
            } else {
                return res.send({ msg: "Contraseña incorrecta" });
            };

        });
    });
};

exports.createUser = async (req, res) => {

    const connection = await model.getConnection();

    /* Averiguamos primero si el nickname o el email ya existen en la BBDD */
    let sqlNickname = `SELECT * FROM usuario WHERE nickname ='${req.body.nickname}'`;
    let sqlEmail = `SELECT * FROM usuario WHERE email ='${req.body.email}'`;

    checkIfExist(sqlNickname, connection);
    
    

 // if (checkIfExist(sqlEmail)) {

    // }


    // connection.query(sql, (error, results) => {



    // });

}


 async function checkIfExist(sql, connection) {

     await connection.query(sql, (error, results) => {

        // console.log(sql);
        // console.log(results.length);

        if (results.length == 0) {
            console.log('false');
            return false;
        }
        else {
            console.log('true');
            return true;
        }
    });

    console.log('despues');

}

const connection = require("../config/db");

//REQUERIMOS LA LIBRERÍA SOLAMENTE DONDE LA NECESITEMOS.
const bcrypt = require('bcrypt');

class TrainerController {

// MUESTRA TODOS LOS ENTRENADORES.

getAllTrainer = (req, res) => {
                            //  no borrados
let sql = `SELECT * FROM trainer WHERE is_deleted = 0;`

connection.query(sql, (error, result) => {
    if (error) throw error;

    res.render('allTrainers', {result});
});
};

// MÉTODO PARA MOSTRAR EL FORMULARIO DE REGISTRO DEL TRAINER:

viewRegisterForm = (req, res) => {
    res.render("register", {message: ""});
};

// REGISTRA UN NUEVO ENTRENADOR:

register = (req, res) => {
    let {name, last_name, email, password, description, phone} = req.body;

// si me viene la imagen, la recojo

    let img = "";
    if (req.file != undefined) {

        img = req.file.filename;
    }
// imagen por defecto:
    else {
        img = "defecto.jpg";
};

// ENCRIPTAR CONTRASEÑA.
bcrypt.hash(password, 10, function (err, hash) {
    if(err) throw err;

 // GUARDAR CONTRASEÑA EN BD
    let sql = `INSERT INTO trainer (name, last_name, email, password, description, phone, image) VALUES ("${name}","${last_name}", "${email}", "${hash}", "${description}", "${phone}", "${img}")`;
   
    connection.query(sql, (error, result) => {
        
        if(error) {
            //email duplicado
            if(error.code == "ER_DUP_ENTRY"){
                res.render("register", {message: "El email ya existe"});
            } else {
                //otro error
                throw error;
            }
            } else {
                res.render("register", {message: "Bienvenido a la familia"}); 
            }
        });
    });
};

 // VISTA DE PERFIL DE UN TRAINER CON SUS PUPPY
viewOneTrainer = (req, res) => {
    let trainer_id = req.params.id;
    let sqlTrainer = `SELECT * FROM trainer WHERE is_deleted = 0 AND trainer_id = ${trainer_id}`
    
    let sqlPuppy = `SELECT * FROM puppy WHERE is_deleted = 0 AND trainer_id = ${trainer_id}`

    connection.query(sqlTrainer, (errorTrainer, resultTrainer) => {

        if(errorTrainer) throw errorTrainer;

        connection.query(sqlPuppy, (errorPuppy, resultPuppy) => {

            if(errorPuppy) throw errorPuppy;

            res.render("oneTrainer", {resultTrainer, resultPuppy});
            console.log(resultPuppy);
        })

    })
};



    // FORMULARIO DE LOGIN
    viewLoginForm = (req, res) => {
        res.render("loginForm", {message: ""});
        };

        // COMPROBAR CREDENCIALES 

    login = (req, res) => {
        let {email, password} = req.body;
        let sql = `SELECT * FROM trainer WHERE email = '${email}' AND is_deleted = 0`;

        connection.query(sql, (error, result) => {
            if(error) throw error;
            //porque me va a devolver un array
            if(result.length == 1){

                let hash = result[0].password;

                bcrypt.compare(password, hash,(err, resultCompare) => {
                    if(resultCompare){

                         // email y contra correctos
                        res.redirect(`/trainer/oneTrainer/${result[0].trainer_id}`);
                       
                    } else{
                        //email correcto pero contra incorrecta

                        res.render("loginForm", {message: "Contraseña incorrecta"});
                    }
                });

            } else {
                res.render("loginForm", {message: "Email incorrecto"});
            }
        })

    }

    //ELIMINA UN TRAINER DEL TODO.

    deleteTrainer = (req, res) => {
        let trainer_id = req.params.trainer_id;
        let sql = `DELETE FROM trainer WHERE trainer_id = ${trainer_id}`;

        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.redirect("/trainer")
        })
    }

    // RENDERIZA LA VISTA PARA EDITAR UN TRAINER
    
    viewEditTrainer = (req, res) => {

        let trainer_id = req.params.trainer_id;

        let sql = `SELECT * FROM trainer WHERE trainer_id = ${trainer_id}`;

        connection.query(sql, (error, result) => {
            if (error) throw error;

            res.render("editTrainer", {result});
        })
    }

    //GUARDA LA INFO DEL EDIT 


    saveEditTrainer = (req, res) => {
        let trainer_id = req.params.trainer_id;

        let {name, last_name, password, description, phone} = req.body

        let sql = `UPDATE trainer SET name = '${name}', last_name = '${last_name}', description = '${description}', phone = '${phone}'`;
        let final = ` WHERE trainer_id = ${trainer_id}`;

        if (req.file != undefined){
            let img = req.file.filename;
            sql += `, image = '${img}' `;
        }
            if(password != ""){

                bcrypt.hash(password, 10, (error, hash) => {
                    sql += `, password = '${hash}'`;
                    sql += final;

                
                    connection.query(sql, (error, result) => {
                        if (error) throw error;

                        res.redirect(`/trainer/oneTrainer/${trainer_id}`);
                    });
                });
            } else {
                sql += final;

                connection.query(sql, (error2, result) => {
                    if(error2) throw error2;

                    res.redirect(`/trainer/oneTrainer/${trainer_id}`);
                } );
            };
        
        

    };
    }
    
    
  
     



module.exports = new TrainerController();
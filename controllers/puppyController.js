const connection = require("../config/db");

class PuppyController {


    //CREAR NUEVO PUPPY
    viewPuppyForm = (req, res) => {
        let sql = `SELECT name, last_name, trainer_id FROM trainer WHERE is_deleted = 0`

        connection.query(sql, (error, result) => {
            if (error) throw error;

            res.render("createPuppy", {result});
        })
       
    };

    // GUARDA LA INFO DEL FORMULARIO DE CREATEPUPPY:

    saveCreatePuppy = (req, res) => {
        let img = req.file.filename;

        let {name, information, trainer_id} = req.body;

        let sql = `INSERT INTO puppy (name, information, trainer_id) VALUES ('${name}', '${information}', ${trainer_id})`;

        if (req.file != undefined) {
            
            sql = `INSERT INTO puppy (name, information, photo, trainer_id) VALUES ('${name}', '${information}', '${img}', ${trainer_id})`;
        }

        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.redirect(`/trainer/oneTrainer/${trainer_id}`)
        });
    };


     // BORRADO REAL

    delete = (req, res) => {
    let { puppy_id, trainer_id } = req.params;

    let sql = `DELETE FROM puppy WHERE puppy_id = ${puppy_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  
  //RENDERIZAR VISTA PRA EDITAR PUPPY
  viewEditForm = (req, res) => {

    let puppy_id = req.params.puppy_id;

    let sql = `SELECT * FROM puppy WHERE puppy_id = ${puppy_id}`;

    connection.query(sql, (error, result) => {
        if(error) throw error;

        res.render("editPuppy", {result});
    })
 
  }

  // GUARDA LA INFO EDITADA

  saveEditPuppy = (req, res) => {
    let puppy_id = req.params.puppy_id;

    let trainer_id = req.params.trainer_id;

    let name = req.body.name;

    let information = req.body.information;

    let sql = `UPDATE puppy SET name = '${name}', information ='${information}' WHERE puppy_id = ${puppy_id}`
  
  connection.query(sql, (error, result) => {

        if (error) throw error;

        res.redirect(`/trainer/oneTrainer/${trainer_id}`)

  })  
  }
  }





module.exports = new PuppyController();


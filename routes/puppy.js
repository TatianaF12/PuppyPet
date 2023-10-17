var express = require('express');
const puppyController = require("../controllers/puppyController");
const uploadImage = require("../middleware/multer");
var router = express.Router();


//RUTA BASE ARCHIVO:
//localhost:3000/puppy 

//MUESTRA LOS ANIMALES NO ELIMINADOS DE TODOS LOS TRAINERS:

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//FORM PARA CREAR NUEVO PUPPY
//localhost:3000/puppy/createPuppy
router.get("/createPuppy", puppyController.viewPuppyForm);


//GUARDA LA INFO DEL FORMULARIO
//localhost:3000/puppy/createPuppy
router.post("/puppy/createPuppy", uploadImage("puppys"), puppyController.saveCreatePuppy);


//BORRADO REAL
// localhost:3000/puppy/delete/:puppy_id/:trainer_id
router.get("/delete/:puppy_id/:trainer_id", puppyController.delete);

//RENDERIZA VISTA PARA EDITAR MASCOTA
//localhost:3000/puppy/editPuppy/:puppy_id
router.get("/editPuppy/:puppy_id", puppyController.viewEditForm);


//GUARDA LA INFO EDITADA DEL PUPPY
//localhost:3000/puppy/editPuppy/:puppy_id/:trainer_id

router.post("/editPuppy/:puppy_id/:trainer_id", puppyController.saveEditPuppy);




module.exports = router;





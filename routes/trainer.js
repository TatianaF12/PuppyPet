var express = require('express');
const trainerController = require('../controllers/trainerController');
const uploadImage = require("../middleware/multer")
var router = express.Router();

// Ruta base: localhost:3000/trainer 

//MUESTRA LOS ENTRENADORES.
//localhost:3000/trainer
router.get('/',trainerController.getAllTrainer);

//MUESTRA EL FORMULARIO DE REGISTRO DEL TRAINER.
//localhost:3000/trainer/register

router.get('/register', trainerController.viewRegisterForm);

//MÉTODO PARA RECOGER LA INFO DEL FORMULARIO (guardarla)
//localhost:3000/trainer/register

router.post("/register", uploadImage("trainers"), trainerController.register);

// VISTA DEL TRAINER CON SUS PUPPY
//localhost:3000/trainer/oneTrainer/:id

router.get("/oneTrainer/:id", trainerController.viewOneTrainer);


//FORMULARIO DE LOGIN
//localhost:3000/trainer/login
router.get("/login", trainerController.viewLoginForm);

// COMPROBAR LAS CREDENCIALES DEL LOGIN
// localhost:3000/trainer/login

router.post("/login", trainerController.login);


//BORRADO REAL DE UN TRAINER
//localhost:3000/trainer/delete/:trainer_id

router.get("/delete/:trainer_id", trainerController.deleteTrainer);

// RENDERIZA LA VISTA PARA EDITAR TRAINER
// localhost:3000/trainer/editTrainer/:trainer_id
router.get("/editTrainer/:trainer_id", trainerController.viewEditTrainer);

//GUARDA LA INFO DEL EDIT
 router.post("/editTrainer/:trainer_id", uploadImage("trainers"), trainerController.saveEditTrainer);



module.exports = router;

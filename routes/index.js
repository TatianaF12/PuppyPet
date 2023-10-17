var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

// RENDERIZAMOS LA VISTA LLAMADA INDEX.
/* GET home page. */
//localhost:3000
router.get('/', indexController.viewHome);

module.exports = router;

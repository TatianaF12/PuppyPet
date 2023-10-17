var express = require('express');
const uploadImage = require("../middleware/multer")
var router = express.Router();;

router.get('/vistaMas', function(req, res, next) {
  res.render('vistaMas');
});

module.exports = router;
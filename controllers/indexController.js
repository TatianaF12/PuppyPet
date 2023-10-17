class IndexController {

    //MUESTRA LA VISTA HOME 
    viewHome = (req, res) => {
        res.render('index', { title: 'Express' });
      }
}

module.exports = new IndexController();
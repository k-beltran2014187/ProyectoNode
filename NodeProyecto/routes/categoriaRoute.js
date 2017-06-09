var express = require('express');
var categoria = require('../model/categoria');
var router = express.Router();

router.get('/api/categoria', function(req, res) {
  categoria.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay categorias"});
    }
  });
});

router.get('/api/categoria/:idCategoria', function(req, res) {
  var idCategoria = req.params.idCategoria;

  categoria.select(idCategoria, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay categorias"});
    }
  });
});

router.post('/api/categoria', function(req, res) {
  var data = {
    idCategoria : null,
    nombreCategoria : req.body.nombreCategoria
  }
  categoria.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idCategoria = resultado.insertId;
      res.redirect("api/categoria/" + idCategoria);
    } else {
      res.json({"Mensaje": "No se inserto ninguna categoria"});
    }
  });
});

module.exports = router;

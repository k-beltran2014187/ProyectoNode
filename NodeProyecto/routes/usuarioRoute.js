var express = require('express');
var usuario = require('../model/usuario');
var router = express.Router();

router.get('/api/usuario', function(req, res) {
  usuario.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay usuarios"});
    }
  });
});

router.get('/api/usuario/:idUsuario', function(req, res) {
  var idUsuario = req.params.idUsuario;

  usuario.select(idUsuario, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay usuarios"});
    }
  });
});

router.post('/api/usuario', function(req, res) {
  var data = {
    idUsuario : null,
    nick : req.body.nick,
    contrasena : req.body.contrasena
  }
  usuario.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idUsuario = resultado.insertId;
      res.redirect("api/usuario/" + idUsuario);
    } else {
      res.json({"Mensaje": "No se inserto ningun usuario"});
    }
  });
});

router.put('/api/usuario/:idUsuario', function(req, res) {
  var idUsuario = req.params.idUsuario;
  var data = {
    idUsuario : req.body.idUsuario,
    nick : req.body.nick,
    contrasena : req.body.contrasena
  }
  if (idUsuario === data.idUsuario) {
    usuario.update(data, function(error, resultado){
      if (resultado !== undefined) {
        res.redirect("api/usuario");
      } else {
        res.json({"Mensaje": "No se modifico el usuario"});
      }
    });
  } else {
    res.json({"Mensaje": "Los Id's no coinciden"});
  }
});

router.delete('/api/usuario/:idUsuario', function(req, res) {
  var idUsuario = req.params.idUsuario;

  usuario.select(idUsuario, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No se elimino el usuario"});
    }
  });
});

module.exports = router;

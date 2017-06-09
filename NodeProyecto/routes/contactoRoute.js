var express = require('express');
var contacto = require('../model/contacto');
var router = express.Router();

router.get('/api/contacto', function(req, res) {
  contacto.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay contactos"});
    }
  });
});

router.get('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;

  contacto.select(idContacto, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay contactos"});
    }
  });
});

router.post('/api/contacto', function(req, res) {
  var data = {
    idContacto : null,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    direccion : req.body.direccion,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }
  contacto.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idUsuario = resultado.insertId;
      res.redirect("api/contacto/" + idContacto);
    } else {
      res.json({"Mensaje": "No se inserto ningun contacto"});
    }
  });
});                                                                                                                                                                                   

router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    direccion : req.body.direccion,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }
  if (idContacto === data.idContacto) {
    contacto.update(data, function(error, resultado){
      if (resultado !== undefined) {
        res.redirect("api/contacto");
      } else {
        res.json({"Mensaje": "No se modifico el contacto"});
      }
    });
  } else {
    res.json({"Mensaje": "Los Id's no coinciden"});
  }
});

router.delete('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;

  contacto.select(idContacto, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No se elimino el contacto"});
    }
  });
});

module.exports = router;

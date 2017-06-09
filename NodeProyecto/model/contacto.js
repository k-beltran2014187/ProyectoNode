var database = require('./database');
var contacto = {};
contacto.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Contacto",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });
  }
}

contacto.select = function(idContacto, callback) {
  if(database) {
    var consulta = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(consulta,idContacto, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

contacto.insert = function(data, callback) {
    if (database) {
      database.query("INSERT INTO Contacto SET ?", data, function(error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, {"insertId": resultado.insertId});
        }
      });
    }
}

contacto.update = function(data, callback) {
    if (database) {
      var sql = "UPDATE Contacto SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, correo = ?, idCategoria = ? WHERE idContacto = ?";
      database.query(sql, [data.nombre, data.idContacto],
        function(error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, data);
        }
      });
    }
}

contacto.delete = function(idContacto, callback) {
  if(database) {
    var consulta = "DELETE FROM Contacto WHERE idContacto = ?";
    database.query(consulta,idContacto, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var notificacion = {"Mensaje" : ""};

        if (resultado.affectedRows > 0) {
          notificacion.Mensaje = "Se elimino el contacto";
        } else {
          notificacion.Mensaje = "No se elimino el contacto";
        }
        callback(null, notificacion);
      }
    });
  }
}

module.exports = contacto;

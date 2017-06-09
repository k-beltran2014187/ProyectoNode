var database = require('./database');
var usuario = {};
usuario.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Usuario",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });
  }
}

usuario.select = function(idUsuario, callback) {
  if(database) {
    var consulta = "SELECT * FROM Usuario WHERE idUsuario = ?";
    database.query(consulta,idUsuario, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

usuario.insert = function(data, callback) {
    if (database) {
      database.query("INSERT INTO Usuario SET ?", data, function(error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, {"insertId": resultado.insertId});
        }
      });
    }
}

usuario.update = function(data, callback) {
    if (database) {
      var sql = "UPDATE Usuario SET nick = ?, contrasena = ? WHERE idUsuario = ?";
      database.query(sql, [data.nick, data.idUsuario],
        function(error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, data);
        }
      });
    }
}

usuario.delete = function(idUsuario, callback) {
  if(database) {
    var consulta = "DELETE FROM Usuario WHERE idUsuario = ?";
    database.query(consulta,idUsuario, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var notificacion = {"Mensaje" : ""};

        if (resultado.affectedRows > 0) {
          notificacion.Mensaje = "Se elimino el usuario";
        } else {
          notificacion.Mensaje = "No se elimino el usuario";
        }
        callback(null, notificacion);
      }
    });
  }
}

module.exports = usuario;

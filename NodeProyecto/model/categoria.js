var database = require('./database');
var categoria = {};
categoria.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Categoria",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });
  }
}

categoria.select = function(idCategoria, callback) {
  if(database) {
    var consulta = "SELECT * FROM Categoria WHERE idCategoria = ?";
    database.query(consulta,idCategoria, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

categoria.insert = function(data, callback) {
  if(database) {
    var consulta = "INSERT INTO Categoria SET ?";
    database.query(consulta, data, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

categoria.update = function(data, callback) {
  if(database) {
    var consulta = "UPDATE Categoria SET nombreCategoria = ? WHERE idCategoria = ?";
    database.query(consulta, [data.nombreCategoria, data.idCategoria], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });
  }
}

categoria.delete = function(idCategoria, callback) {
  if(database) {
    var consulta = "DELETE FROM Categoria WHERE idCategoria = ?";
    database.query(consulta, idCategoria, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var notificacion = {"Mensaje" : ""};
        if (resultado.affectedRows > 0) {
          notificacion.Mensaje = "Se elimino la categoria";
        } else {
          notificacion.Mensaje = "No se elimino la categoria";
        }
        callback(null, notificacion);
      }
    });
  }
}

module.exports = categoria;

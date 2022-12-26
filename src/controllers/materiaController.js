const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const materiaModel = require("../models/materiaModel");// invocando archivo model

app.set('llave', config.llave);// actualizar llave en app
app.use(bodyParser.urlencoded({ extended: true }));// agregar parseo
app.use(bodyParser.json());// retornar body en json

router.use((req, res, next) => {// autenticando token en las rutas
  const token = req.headers['access-token'];// obt. token del header
  
  if (token) {
    jwt.verify(token, app.get('llave'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválida' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token no asignada.' 
    });
  }
 });

app.get('/', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  materiaModel
  .mostrarReg()// llamar metodo
  .then(mate => {
      console.log(mate?.length);// num de registros
      if(mate?.length > 0){
          res.json(mate?.sort()); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo materia");
  });
});

app.get('/bsq/:idmat', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  materiaModel
  .obtPorBsq(req.params.idmat)// enviar datos al metodo
  .then(mate => {
      if(mate?.length > 0){
          res.json(mate); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo materia");
  });
});

app.post('/insert', router, function (req, res, next) {// insertar datos
  const { nombres, grado } = req.body;
  
  if (!nombres || !grado) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  materiaModel
  .insert(nombres,grado)// env datos al metodo
  .then(idalumInsert => {
      res.status(200).send("REGISTRO INSERTADO");
  })
  .catch(err => {
      return res.status(500).send("Error insertando materia");
  });
});

app.put('/update',router, function (req, res, next) {// insertar datos
  const { idmat, nombres, grado } = req.body;
  
  if (!nombres || !grado) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  materiaModel
  .update(nombres, grado, idmat)// env datos al metodo
  .then(mate => {
    if(mate > 0){            
      res.status(200).send("REGISTRO ACTUALIZADO"); // enviar mensaje
  }else{
      return res.status(500).send("El registro seleccionado no existe");
  }
  })
  .catch(err => {
      return res.status(500).send("Error actualizando materia");
  });
});

app.delete('/delete/:idmat',router, function (req, res, next) {// insertar datos
  // enviar datos al modelo
  materiaModel
  .delete(req.params.idmat)// env datos al metodo
  .then(mate => {
      if(mate > 0){            
          res.status(200).send("REGISTRO ELIMINADO"); // enviar mensaje
      }else{
          return res.status(500).send("El registro seleccionado no existe");
      }
  })
  .catch(err => {
      return res.status(500).send("Error eliminando materia");
  });
});

module.exports = app;

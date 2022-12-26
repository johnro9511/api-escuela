const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const maestroModel = require("../models/maestroModel");// invocando archivo model

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
  maestroModel
  .mostrarReg()// llamar metodo
  .then(maes => {
      console.log(maes?.length);// num de registros
      if(maes?.length > 0){
          res.json(maes?.sort()); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo maestros");
  });
});

app.get('/bsq/:idmaes', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  maestroModel
  .obtPorBsq(req.params.idmaes)// enviar datos al metodo
  .then(maes => {
      if(maes?.length > 0){
          res.json(maes); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo maestro");
  });
});

app.post('/insert', router, function (req, res, next) {// insertar datos
  const { nombres, apellidos } = req.body;
  
  if (!nombres || !apellidos) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  maestroModel
  .insert(nombres,apellidos)// env datos al metodo
  .then(idalumInsert => {
      res.status(200).send("REGISTRO INSERTADO");
  })
  .catch(err => {
      return res.status(500).send("Error insertando maestro");
  });
});

app.put('/update',router, function (req, res, next) {// insertar datos
  const { idmaes, nombres, apellidos } = req.body;
  
  if (!nombres || !apellidos) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  maestroModel
  .update(nombres, apellidos, idmaes)// env datos al metodo
  .then(maes => {
    if(maes > 0){            
      res.status(200).send("REGISTRO ACTUALIZADO"); // enviar mensaje
  }else{
      return res.status(500).send("El registro seleccionado no existe");
  }
  })
  .catch(err => {
      return res.status(500).send("Error actualizando maestro");
  });
});

app.delete('/delete/:idmaes',router, function (req, res, next) {// insertar datos
  // enviar datos al modelo
  maestroModel
  .delete(req.params.idmaes)// env datos al metodo
  .then(maes => {
      if(maes > 0){            
          res.status(200).send("REGISTRO ELIMINADO"); // enviar mensaje
      }else{
          return res.status(500).send("El registro seleccionado no existe");
      }
  })
  .catch(err => {
      return res.status(500).send("Error eliminando maestro");
  });
});

module.exports = app;

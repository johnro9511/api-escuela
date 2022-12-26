const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const mat_alum_profModel = require("../models/mat_alum_profModel");// invocando archivo model

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
  mat_alum_profModel
  .mostrarReg()// llamar metodo
  .then(mape => {
      console.log(mape?.length);// num de registros
      if(mape?.length > 0){
          res.json(mape?.sort()); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo (\__/)");
  });
});

app.get('/bsq/:idcns', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  mat_alum_profModel
  .obtPorBsq(req.params.idcns)// enviar datos al metodo
  .then(mape => {
      if(mape?.length > 0){
          res.json(mape); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo (\__/)");
  });
});

app.post('/insert', router, function (req, res, next) {// insertar datos
  const { idalum, idmat, idmaes } = req.body;
  
  if (!idalum || !idmat || !idmaes) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  mat_alum_profModel
  .insert(idalum,idmat,idmaes)// env datos al metodo
  .then(idalumInsert => {
      res.status(200).send("REGISTRO INSERTADO");
  })
  .catch(err => {
      return res.status(500).send("Error insertando (\__/)");
  });
});

app.put('/update',router, function (req, res, next) {// insertar datos
  const { idcns, idalum, idmat, idmaes } = req.body;
  
  if (!idalum || !idmat || !idmaes) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  mat_alum_profModel
  .update(idalum,idmat,idmaes,idcns)// env datos al metodo
  .then(mape => {
    if(mape > 0){            
      res.status(200).send("REGISTRO ACTUALIZADO"); // enviar mensaje
  }else{
      return res.status(500).send("El registro seleccionado no existe");
  }
  })
  .catch(err => {
      return res.status(500).send("Error actualizando (\__/)");
  });
});

app.delete('/delete/:idcns',router, function (req, res, next) {// insertar datos
  // enviar datos al modelo
  mat_alum_profModel
  .delete(req.params.idcns)// env datos al metodo
  .then(mape => {
      if(mape > 0){            
          res.status(200).send("REGISTRO ELIMINADO"); // enviar mensaje
      }else{
          return res.status(500).send("El registro seleccionado no existe");
      }
  })
  .catch(err => {
      return res.status(500).send("Error eliminando (\__/)");
  });
});

module.exports = app;

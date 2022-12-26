const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const reportesModel = require("../models/reportesModel");// invocando archivo model

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
  reportesModel
  .repTotal()// llamar metodo
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
      return res.status(500).send("Error obteniendo reporte");
  });
});

app.get('/matxalum', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  reportesModel
  .matxalum()// llamar metodo
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
      return res.status(500).send("Error obteniendo reporte");
  });
});

app.get('/maexmat', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  reportesModel
  .maexmat()// llamar metodo
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
      return res.status(500).send("Error obteniendo reporte");
  });
});

app.get('/alumxmae', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  reportesModel
  .alumxmae()// llamar metodo
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
      return res.status(500).send("Error obteniendo reporte");
  });
});

app.get('/bsq/:idcns', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  reportesModel
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

module.exports = app;

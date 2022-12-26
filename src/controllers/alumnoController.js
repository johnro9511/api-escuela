const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const alumnoModel = require("../models/alumnoModel");// invocando archivo model

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
  alumnoModel
  .mostrarReg()// llamar metodo
  .then(alum => {
      console.log(alum?.length);// num de registros
      if(alum?.length > 0){
          res.json(alum?.sort()); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo alumnos");
  });
});

app.get('/bsq/:idalum', router, function (req, res, next) {// mostrar todos los registros
  // enviar datos al modelo
  alumnoModel
  .obtPorBsq(req.params.idalum)// enviar datos al metodo
  .then(alum => {
      if(alum?.length > 0){
          res.json(alum); // convertir a json
      }else{
          return res.status(500).send("No se encontraron registros");
      }
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo alumno");
  });
});

app.post('/insert', router, function (req, res, next) {// insertar datos
  const { nombres, apellidos } = req.body;
  
  if (!nombres || !apellidos) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  alumnoModel
  .insert(nombres,apellidos)// env datos al metodo
  .then(idalumInsert => {
      res.status(200).send("REGISTRO INSERTADO");
  })
  .catch(err => {
      return res.status(500).send("Error insertando alumno");
  });
});

app.put('/update',router, function (req, res, next) {// insertar datos
  const { idalum, nombres, apellidos } = req.body;
  
  if (!nombres || !apellidos) {// validacion datos vacios
      return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
  }

  // enviar datos al modelo
  alumnoModel
  .update(nombres, apellidos, idalum)// env datos al metodo
  .then(alum => {
    if(alum > 0){            
      res.status(200).send("REGISTRO ACTUALIZADO"); // enviar mensaje
  }else{
      return res.status(500).send("El registro seleccionado no existe");
  }
  })
  .catch(err => {
      return res.status(500).send("Error actualizando alumno");
  });
});

app.delete('/delete/:idalum',router, function (req, res, next) {// insertar datos
  // enviar datos al modelo
  alumnoModel
  .delete(req.params.idalum)// env datos al metodo
  .then(alum => {
      if(alum > 0){            
          res.status(200).send("REGISTRO ELIMINADO"); // enviar mensaje
      }else{
          return res.status(500).send("El registro seleccionado no existe");
      }
  })
  .catch(err => {
      return res.status(500).send("Error eliminando alumno");
  });
});

module.exports = app;

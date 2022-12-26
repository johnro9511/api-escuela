const express = require('express'),// instanciando framework express
    bodyParser = require('body-parser'),// parseo de body
    jwt = require('jsonwebtoken'),// obt. token 
    config = require('../../configs/config'),// obt. key definida
    app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const loginModel = require("../models/loginModel");// invocando archivo model

app.set('llave', config.llave);// actualizar llave en app
app.use(bodyParser.urlencoded({ extended: true }));// agregar parseo
app.use(bodyParser.json());// retornar body en json

app.post('/', function (req, res, next)  {// login (simulado p/obt token)
    const { usuario, psswrd} = req.body;
    // enviar datos al modelo p/obt login
    loginModel
    .obtLog(usuario,psswrd)// enviar datos al metodo
    .then(login => {
        if(login?.length > 0){
            // res.json(login); // convertir a json
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, app.get('llave'), {// token
                expiresIn: 7200 // 2 hras activo 
            });

            res.json({
                mensaje: 'Autenticación correcta',
                token: token,
                log_in: login
            });
        }else{
            return res.status(500).send("Usuario o contraseña incorrectos");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error en login");
    });
});

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

 app.get('/log',router,function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    loginModel
    .mostrarReg()// llamar metodo
    .then(login => {
        // console.log(login?.length);// num de registros
        if(login?.length > 0){
            res.json(login?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo usuarios");
    });
});

app.post('/insert', router, function (req, res, next) {// insertar datos
    const { usuario, psswrd } = req.body;
    
    if (!usuario || !psswrd) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    loginModel
    .insert(usuario,psswrd)// env datos al metodo
    .then(idlogInsert => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando usuario");
    });
});

app.get('/bsq/:idlog',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    loginModel
    .obtPorBsq(req.params.idlog)// enviar datos al metodo
    .then(login => {
        if(login?.length > 0){
            res.json(login); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo usuario");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const { idlog, usuario, psswrd } = req.body;
    
    if (!usuario || !psswrd) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    loginModel
    .update(usuario, psswrd, idlog)// env datos al metodo
    .then(login => {
        if(login > 0){            
            res.status(200).send("REGISTRO ACTUALIZADO"); // enviar mensaje
        }else{
            return res.status(500).send("El registro seleccionado no existe");
        }
    })
    .catch(err => {
        return res.status(500).send("Error actualizando usuario");
    });
});

app.delete('/delete/:idlog',router, function (req, res, next) {// insertar datos
    // enviar datos al modelo
    loginModel
    .delete(req.params.idlog)// env datos al metodo
    .then(login => {
        // console.log(login);
        if(login > 0){            
            res.status(200).send("REGISTRO ELIMINADO"); // enviar mensaje
        }else{
            return res.status(500).send("El registro seleccionado no existe");
        }
    })
    .catch(err => {
        return res.status(500).send("Error eliminando usuario");
    });
});

module.exports = app;

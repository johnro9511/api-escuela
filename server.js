const express = require('express');// instanciando framework
const app = express();// recibiendo obj. de express
const morgan = require('morgan');// mostrar codigo status en shell

/* INSTANCIA DE CONTROLADORES */
const login = require('./src/controllers/loginController');// extraer model/rutas login
const alumno = require('./src/controllers/alumnoController');// extraer model/rutas alumno
const maestro = require('./src/controllers/maestroController');// extraer model/rutas maestro
const materia = require('./src/controllers/materiaController');// extraer model/rutas materia
const mat_alum_prof = require('./src/controllers/mat_alum_profController');// extraer model/rutas mat_alum_prof
const reportes = require('./src/controllers/reportesController');// extraer model/rutas reportes

/* CONFIGURACION DEL SERVIDOR */
const http = require('http');// asignar ip
const hostname = 'localhost'; // host
const port = 8000;

/* MIDDLEWARES */
app.use(express.json());// acceder a datos json
app.use(morgan('dev'));// ver status en consola

/* RUTAS */
app.use('/login', login);//1 ruta de peticiones a login 
app.use('/alumno', alumno);//2 ruta de peticiones a alumno
app.use('/maestro', maestro);//3 ruta de peticiones a maestro
app.use('/materia', materia);//4 ruta de peticiones a materia
app.use('/mapro', mat_alum_prof);//5 ruta de peticiones a mat_alum_prof
app.use('/reportes', reportes);//5 ruta de peticiones a reportes

app.use(function(req,res){ // verifica si existe la ruta ingresada
    res.status(404).send("RUTA NO ENCONTRADA");
})

/* INICIAR EL SERVIDOR */
app.listen(port, hostname, () =>{
    console.log(`Servidor corriendo en la ruta://${hostname}:${port}/`);
});

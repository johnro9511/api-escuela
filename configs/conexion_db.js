const dbServ = require("mssql");// importar lib de sqlserver
const config = "Data Source=localhost;Initial Catalog=escuela;User ID=sa;Password=Vi$ion.2021;trustServerCertificate=true";// configuracion de conexion a base de datos

const connex = dbServ.connect(config); // guardar conexion en una variable
connex.then(pool => {// prueba conectando a bd
  return pool.request()
    .query(`SELECT 'BASE CONECTADA' `);
}).then(result => {
  console.log(result.recordset)
}).catch(err => {
  console.log(err);// ... error checks
});
connex.finally();// cerrar conexion

module.exports = config;// exportar modulo a otras rutas

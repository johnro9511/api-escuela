const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de sqlserver

module.exports = { 
    mostrarReg() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query('select * from maestro',(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    obtPorBsq(idmaes) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor', dbServ.Int, idmaes)//recibe parametro
            .query('select * from maestro where idmaes = @valor', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },
    
    insert(nombres,apellidos) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, nombres)//recibe parametro
            request.input('dato2', dbServ.VarChar, apellidos)//recibe parametro
            .query('insert into maestro (nombres,apellidos) values (@dato1,@dato2)', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    update(nombres,apellidos,idmaes) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, nombres)//recibe parametro
            request.input('dato2', dbServ.VarChar, apellidos)//recibe parametro
            request.input('dato3', dbServ.Int, idmaes)//recibe parametro
            .query('update maestro set nombres = @dato1, apellidos = @dato2 where idmaes = @dato3', (err, resultados) => {
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    delete(idmaes) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idmaes)//recibe parametro
            .query('delete from maestro where idmaes = @valor1', (err, resultados) => {
                //console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },
}// exportar modelo

/*
{
    "idmaes": 2,
    "nombres": "PAOLA",
    "apellidos": "SANCHEZ"
}
*/

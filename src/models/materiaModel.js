const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de sqlserver

module.exports = { 
    mostrarReg() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query('select * from materia',(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    obtPorBsq(idmat) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor', dbServ.Int, idmat)//recibe parametro
            .query('select * from materia where idmat = @valor', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },
    
    insert(nombres,grado) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, nombres)//recibe parametro
            request.input('dato2', dbServ.Int, grado)//recibe parametro
            .query('insert into materia (nombres,grado) values (@dato1,@dato2)', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    update(nombres,grado,idmat) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, nombres)//recibe parametro
            request.input('dato2', dbServ.Int, grado)//recibe parametro
            request.input('dato3', dbServ.Int, idmat)//recibe parametro
            .query('update materia set nombres = @dato1, grado = @dato2 where idmat = @dato3', (err, resultados) => {
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    delete(idmat) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idmat)//recibe parametro
            .query('delete from materia where idmat = @valor1', (err, resultados) => {
                console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },
}// exportar modelo

/*
{
    "idmat": 1,
    "nombres": "MATEMATICAS",
    "grado": 2
}
*/

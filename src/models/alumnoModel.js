const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de sqlserver

module.exports = { 
    mostrarReg() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query('select * from alumno',(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    obtPorBsq(idalum) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor', dbServ.Int, idalum)//recibe parametro
            .query('select * from alumno where idalum = @valor', (err, resultados) => {
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
            .query('insert into alumno (nombres,apellidos) values (@dato1,@dato2)', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    update(nombres,apellidos,idalum) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, nombres)//recibe parametro
            request.input('dato2', dbServ.VarChar, apellidos)//recibe parametro
            request.input('dato3', dbServ.Int, idalum)//recibe parametro
            .query('update alumno set nombres = @dato1, apellidos = @dato2 where idalum = @dato3', (err, resultados) => {
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    delete(idalum) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idalum)//recibe parametro
            .query('delete from alumno where idalum = @valor1', (err, resultados) => {
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
    "idalum": 1,
    "nombres": "LUIS ANTONIO",
    "apellidos": "ALVAREZ OVAL"
}
*/

const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de sqlserver

module.exports = { 
    obtLog(usuario,psswrd) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, usuario)//recibe parametro
            request.input('dato2', dbServ.VarChar, psswrd)//recibe parametro
            .query('select idlog,usuario,psswrd from login where usuario = @dato1 and psswrd = @dato2', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    mostrarReg() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query('select * from login',(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    obtPorBsq(idlog) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idlog)//recibe parametro
            .query('select * from login where idlog = @valor1', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    insert(usuario,psswrd) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, usuario)//recibe parametro
            request.input('dato2', dbServ.VarChar, psswrd)//recibe parametro
            .query('insert into login (usuario,psswrd) values (@dato1,@dato2)', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    update(usuario,psswrd,idlog) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.VarChar, usuario)//recibe parametro
            request.input('dato2', dbServ.VarChar, psswrd)//recibe parametro
            request.input('dato3', dbServ.Int, idlog)//recibe parametro
            .query('update login set usuario = @dato1, psswrd = @dato2 where idlog = @dato3', (err, resultados) => {
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    delete(idlog) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idlog)//recibe parametro
            .query('delete from login where idlog = @valor1', (err, resultados) => {
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
    "idlog": 1,
    "usuario": "JUAN RO",
    "psswrd": "vision1"
}
*/

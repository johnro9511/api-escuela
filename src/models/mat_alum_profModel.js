const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de SQLSERVER

module.exports = { 
    mostrarReg() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query(`SELECT MTP.IDCNS,A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
            INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
            INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
            INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
            ORDER BY MTP.IDCNS ASC`,(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    obtPorBsq(idcns) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor', dbServ.Int, idcns)//recibe parametro
            .query(`SELECT MTP.IDCNS,A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
            INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
            INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
            INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
            WHERE IDCNS = @valor
            ORDER BY MTP.IDCNS ASC`, (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },
    
    insert(idalum,idmat,idmaes) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.Int, idalum)//recibe parametro
            request.input('dato2', dbServ.Int, idmat)//recibe parametro
            request.input('dato3', dbServ.Int, idmaes)//recibe parametro
            .query('insert into mat_alum_prof (idalum,idmat,idmaes) values (@dato1,@dato2,@dato3)', (err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);//error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    update(idalum,idmat,idmaes,idcns) {// login de usuario p/obt token
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.input('dato1', dbServ.Int, idalum)//recibe parametro
            request.input('dato2', dbServ.Int, idmat)//recibe parametro
            request.input('dato3', dbServ.Int, idmaes)//recibe parametro
            request.input('dato4', dbServ.Int, idcns)//recibe parametro
            .query('update mat_alum_prof set idalum = @dato1, idmat = @dato2, idmaes = @dato3 where idcns = @dato4', (err, resultados) => {
                if (err) reject(err);//error
                else resolve(resultados.rowsAffected);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    delete(idcns) {// buscar por filtros
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
           request.input('valor1', dbServ.Int, idcns)//recibe parametro
            .query('delete from mat_alum_prof where idcns = @valor1', (err, resultados) => {
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
    "idcns": 1,
    "idalum": 1,
    "idmat": 1,
    "idmaes": 1,
    "fec_alta": "2022-12-20T17:29:08.537Z"
}
*/

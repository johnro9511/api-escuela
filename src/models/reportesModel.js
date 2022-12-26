const config = require("../../configs/conexion_db"); // heredando la conexion
const dbServ = require("mssql");// importar lib de SQLSERVER

module.exports = { 
    repTotal() {// mostrar todos los datos
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

    matxalum() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query(`SELECT DISTINCT A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
            INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
            INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
            ORDER BY NOM_ALUM ASC`,(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    maexmat() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query(`SELECT DISTINCT M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
            INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
            INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
            ORDER BY NOM_MAT ASC`,(err, resultados) => {
                // console.log(resultados);// ver datos en cnsl
                if (err) reject(err);// error
                else resolve(resultados.recordset);// devuelve datos
            });
            connex.close;// cerrar conexion
        });
    },

    alumxmae() {// mostrar todos los datos
        const connex = dbServ.connect(config);// creando conexion
        var request = new dbServ.Request();// repuesta p/querys

        return new Promise((resolve, reject) => {
            request.query(`SELECT DISTINCT P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE, A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
            INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
            INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
            ORDER BY NOM_MAE ASC`,(err, resultados) => {
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
    
    
}// exportar modelo

/*
{
    "idcns": 1,
    "idalum": 1,
    "idmat": 1,
    "idmaes": 1,
    "fec_alta": "2022-12-20"
}
*/

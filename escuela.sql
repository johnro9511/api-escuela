-- create database escuela; -- create DB
use escuela; -- conectarse a la base de datos

-- -----------------------------------------------------------------------------------------
CREATE TABLE alumno(
  idalum int IDENTITY(1,1),
  nombres varchar(255) NOT NULL,
  apellidos varchar(255) NOT NULL,
  PRIMARY KEY (idalum)
);

create index id_alum on ALUMNO(idalum);

INSERT INTO alumno(nombres,apellidos) VALUES ('LUIS ANTONIO','ALVAREZ OVAL');
INSERT INTO alumno(nombres,apellidos) VALUES ('JUAN RO','MALDONADO PEREZ');

-- -----------------------------------------------------------------------------------------
Create table maestro(
  idmaes int IDENTITY(1,1),
  nombres varchar(255) NOT NULL,
  apellidos varchar(255) NOT NULL,
  PRIMARY KEY (idmaes)
);

create index id_mtro on maestro(idmaes);

INSERT INTO maestro(nombres,apellidos) VALUES ('VANESSA','BENAVIDES GARCIA');
INSERT INTO maestro(nombres,apellidos) VALUES ('PAOLA','SANCHEZ');

-- -----------------------------------------------------------------------------------------
Create table materia(
  idmat int IDENTITY(1,1),
  nombres varchar(255) NOT NULL,
  grado integer not null
  PRIMARY KEY (idmat)
);

create index id_mat on materia(idmat);

INSERT INTO materia(nombres,grado) VALUES ('MATEMATICAS',2);
INSERT INTO materia(nombres,grado) VALUES ('GEOGRAFIA',2);

-- -----------------------------------------------------------------------------------------
Create table mat_alum_prof(
  idcns int IDENTITY(1,1),
  idalum int NOT NULL,
  idmat int NOT NULL,
  idmaes int NOT NULL,
  fec_alta datetime default current_timestamp,
  foreign key(idalum) references alumno(idalum),
  foreign key(idmat) references materia(idmat),
  foreign key(idmaes) references maestro(idmaes),
  PRIMARY KEY (idcns)
);

create index id_cns on mat_alum_prof(idcns);

INSERT INTO mat_alum_prof(idalum,idmat,idmaes) VALUES (1,1,1);
INSERT INTO mat_alum_prof(idalum,idmat,idmaes) VALUES (2,2,2);

-- -----------------------------------------------------------------------------------------
Create table login(
  idlog int IDENTITY(1,1),
  usuario varchar(255) NOT NULL,
  psswrd varchar(255) not null
  PRIMARY KEY (idlog)
);

create index id_log on login(idlog);

INSERT INTO login(usuario,psswrd) VALUES ('JUAN RO','vision1');
INSERT INTO login(usuario,psswrd) VALUES ('CLAUDIA','vision2');

-- -----------------------------------------------------------------------------------------
/* QUERYS P/OBTENER DATOS */

-- ALUMNOS
SELECT * FROM ALUMNO;

-- MATERIAS 
SELECT *FROM MATERIA;

-- MAESTROS/PROFESORES
SELECT * FROM MAESTRO;

-- USUARIOS
SELECT *FROM LOGIN;

-- ----------------------------------------------------------------------------------------------
-- CONSULTANDO TODOS LOS REGISTROS DE LA TABLA: MAT_ALUM_PROF
SELECT MTP.IDCNS,A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
ORDER BY MTP.IDCNS ASC;
-- ----------------------------------------------------------------------------------------------

-- ALUMNOS-MATERIAS-MAESTROS
SELECT DISTINCT A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
ORDER BY FEC_ALTA ASC;

-- ¿QUE MATERIAS TIENE C/ALUMNO?
SELECT DISTINCT A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
ORDER BY NOM_ALUM ASC;

-- ¿A QUE MAESTRO ESTAN ASIGNADA C/MATERIA?
SELECT DISTINCT M.IDMAT,M.NOMBRES AS NOM_MAT,M.GRADO,P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
INNER JOIN MATERIA M ON MTP.IDMAT=M.IDMAT 
INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
ORDER BY NOM_MAT ASC;

-- ¿QUE ALUMNOS TIENE C/MAESTRO?
SELECT DISTINCT P.IDMAES,P.NOMBRES AS NOM_MAE,P.APELLIDOS AS APE_MAE, A.IDALUM,A.NOMBRES AS NOM_ALUM,A.APELLIDOS AS APE_ALUM,FORMAT(MTP.FEC_ALTA,'dd/MM/yyyy') AS FEC_ALTA FROM MAT_ALUM_PROF MTP 
INNER JOIN ALUMNO A ON MTP.IDALUM=A.IDALUM 
INNER JOIN MAESTRO P ON MTP.IDMAES=P.IDMAES
ORDER BY NOM_MAE ASC;
-- ----------------------------------------------------------------------------------------------

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2020 a las 06:09:44
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

USE sistpostulacion;

--
-- Base de datos: `sistpostulacion`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `CerrarPeriodoActual` (IN `nameperiodo` VARCHAR(50))  UPDATE periodos SET fechaCierre = SUBDATE(CURRENT_DATE, 1) WHERE periodo = nameperiodo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `CrearAsistente` (`newcorreo` VARCHAR(50), `newpassword` VARCHAR(30), `newnombre` VARCHAR(50), `newcedula` VARCHAR(20))  BEGIN
	START TRANSACTION;
    INSERT INTO usuarios (correo, password) VALUES (newcorreo, newpassword);
	INSERT INTO asistentes (correo, nombre, cedula) VALUES (newcorreo, newnombre, newcedula);
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `CrearPeriodo` (IN `newperiodo` VARCHAR(50), IN `inicio` DATE, IN `cierre` DATE)  IF ((not exists( SELECT * FROM periodos
 WHERE (inicio >= periodos.fechaInicio and inicio <= periodos.fechaCierre)
 or (cierre >= periodos.fechaInicio and cierre <= periodos.fechaCierre )
 or ( inicio <= periodos.fechaInicio and  cierre >= periodos.fechaCierre)))AND (inicio <= cierre)) 
THEN INSERT INTO periodos(periodo, fechaInicio,fechaCierre) VALUES (newperiodo, inicio, cierre);
SELECT * FROM periodos WHERE periodos.periodo = newperiodo and periodos.fechaInicio= inicio and periodos.fechaCierre = cierre;
END IF$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `CrearPostulacion` (IN `newperiodo` VARCHAR(20), IN `newcedula` VARCHAR(20), IN `newenfasis` VARCHAR(50), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newmemo` TINYINT)  NO SQL
BEGIN
	START TRANSACTION;
	INSERT INTO postulaciones (periodo,cedula,enfasis,sede,nota,memo) VALUES (newperiodo,newcedula,newenfasis,newsede, newnota, newmemo);
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarAsistente` (IN `newcorreo` VARCHAR(40), IN `newpassword` VARCHAR(40), IN `newcedula` VARCHAR(40), IN `newnombre` VARCHAR(40))  NO SQL
BEGIN
	START TRANSACTION;
    UPDATE usuarios SET password = newpassword WHERE correo = newcorreo;
    UPDATE asistentes SET nombre = newnombre, cedula = newcedula WHERE correo = newcorreo;
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarFormula` (IN `bachillerato` INT, IN `licenciatura` INT, IN `maestria` INT, IN `newdoc` INT, IN `newprom` INT, IN `newtresseis` INT, IN `newseisdies` INT, IN `newmasdies` INT, IN `newprosinp` INT, IN `newpromiemb` INT, IN `newjefatura` INT, IN `newgerencia` INT, IN `newtindep` INT, IN `newalta` INT, IN `newmedia` INT, IN `newbaja` INT, IN `newacred` INT, IN `newnoacred` INT, IN `newcaprov` INT, IN `newttec` INT, IN `newcmaest` INT, IN `newtdip` INT)  NO SQL
BEGIN
	START TRANSACTION;
    UPDATE atributos SET peso= bachillerato WHERE id = 1;
    UPDATE atributos SET peso = licenciatura WHERE id =2;
    UPDATE atributos SET peso = maestria WHERE id =3;
    UPDATE atributos SET peso = newdoc WHERE id =4;
    UPDATE atributos SET peso = newprom WHERE id =5;
    UPDATE atributos SET peso = newtresseis WHERE id =6;
    UPDATE atributos SET peso = newseisdies WHERE id =7;
    UPDATE atributos SET peso = newmasdies WHERE id =8;
    UPDATE atributos SET peso = newprosinp WHERE id =9;
    UPDATE atributos SET peso = newpromiemb WHERE id =10;
    UPDATE atributos SET peso = newjefatura WHERE id =11;
    UPDATE atributos SET peso = newgerencia WHERE id =12;
    UPDATE atributos SET peso = newtindep WHERE id =13;
    UPDATE atributos SET peso = newalta WHERE id =14;
    UPDATE atributos SET peso = newmedia WHERE id =15;
    UPDATE atributos SET peso = newbaja WHERE id =16;
    UPDATE atributos SET peso = newacred WHERE id =17;
    UPDATE atributos SET peso = newnoacred WHERE id =18;
    UPDATE atributos SET peso = newcaprov WHERE id =19;
    UPDATE atributos SET peso = newttec WHERE id =20;
    UPDATE atributos SET peso = newcmaest WHERE id =21;
    UPDATE atributos SET peso = newtdip WHERE id =22;
   
    
    
    
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarMensajeria` (IN `newcorreo` VARCHAR(50), IN `newpassword` VARCHAR(50))  NO SQL
BEGIN
	UPDATE `correoenvio` SET `correo`=newcorreo,`password`=newpassword WHERE 1;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarNota` (IN `cedula` VARCHAR(40), IN `periodo` VARCHAR(20), IN `newnota` DOUBLE)  NO SQL
IF (exists( SELECT * FROM postulaciones WHERE postulaciones.cedula = cedula AND postulaciones.periodo = periodo))  
	THEN
	UPDATE postulaciones SET nota = newnota WHERE postulaciones.cedula = cedula AND postulaciones.periodo = periodo;
END IF$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarPeriodo` (IN `newperiodo` VARCHAR(50), IN `inicio` DATE, IN `cierre` DATE)  IF ((not exists( SELECT * FROM periodos WHERE ((inicio >= periodos.fechaInicio and inicio <= periodos.fechaCierre)
 or (cierre >= periodos.fechaInicio and cierre <= periodos.fechaCierre )
 or ( inicio <= periodos.fechaInicio and  cierre >= periodos.fechaCierre)) and (periodos.periodo != newperiodo)))AND (inicio <= cierre))  THEN UPDATE periodos set fechaInicio = inicio , fechaCierre = cierre where periodo = newperiodo;
END IF$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarPostulacion` (IN `newperiodo` VARCHAR(20), IN `newcedula` VARCHAR(20), IN `newenfasis` VARCHAR(50), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newmemo` TINYINT)  NO SQL
BEGIN
	START TRANSACTION;
    UPDATE postulaciones SET enfasis = newenfasis, sede = newsede, nota = newnota WHERE periodo = newperiodo AND cedula = newcedula;
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarPostulante`(IN `newcedula` VARCHAR(40), IN `newnombre` VARCHAR(50), IN `newtelefono1` VARCHAR(30), IN `newtelefono2` VARCHAR(30), IN `newcorreo1` VARCHAR(50), IN `newcorreo2` VARCHAR(50), IN `newingles` TINYINT, IN `newgradoAcademico` VARCHAR(15), IN `newuniversidad` VARCHAR(50), IN `newafinidad` VARCHAR(30), IN `newacreditada` TINYINT, IN `newpuestoActual` VARCHAR(60), IN `newexperienciaProfesion` INT, IN `newcursoAfin` INT, IN `newtituloTecnico` TINYINT, IN `newcursoAprovechamiento` INT, IN `newtituloDiplomado` TINYINT, IN `newpromedioGeneral` DOUBLE, IN `newgenero` VARCHAR(20), IN `newfecha` DATE, IN `newcedulavieja` VARCHAR(40))
    NO SQL
BEGIN
	START TRANSACTION;
    UPDATE postulantes SET cedula = newcedula, nombre = newnombre, telefono1 = newtelefono1, telefono2 = newtelefono2, correo1 = newcorreo1, correo2 = newcorreo2, ingles = newingles, gradoAcademico = newgradoAcademico, universidad = newuniversidad, afinidad = newafinidad, acreditada = newacreditada, puestoActual = newpuestoActual, experienciaProfesion = newexperienciaProfesion,cursoAfin = newcursoAfin, tituloTecnico = newtituloTecnico, cursoAprovechamiento = newcursoAprovechamiento, tituloDiplomado = newtituloDiplomado, promedioGeneral = newpromedioGeneral, genero = newgenero, fechaNacimiento = newfecha  WHERE cedula = newcedulavieja;
    COMMIT;
END$$



CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EditarSuperusuario` (`newcorreo` VARCHAR(50), `newpassword` VARCHAR(30), `newcorreoEnvio` VARCHAR(50))  BEGIN
	START TRANSACTION;
    UPDATE usuarios SET password = newpassword WHERE correo = newcorreo;
    UPDATE superusuario SET correoEnvio = newcorreoEnvio WHERE correo = newcorreo;
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EliminarAsistente` (IN `correo` VARCHAR(50))  DELETE usuarios,asistentes FROM asistentes inner JOIN usuarios on asistentes.correo = usuarios.correo WHERE asistentes.correo = correo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `EliminarPeriodo` (`nameperiodo` VARCHAR(50))  DELETE FROM periodos where periodo = nameperiodo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAcreditacionHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.acreditada , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.acreditada
    Order by periodos.fechaInicio, postulantes.acreditada asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAcreditada` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN acreditada = 0 THEN 'No'
            WHEN acreditada = 1 THEN 'Si'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAcreditadaTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` INT, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value', COUNT(name)*100/@cantidad as 'relativo' 
    FROM   (SELECT case
            WHEN acreditada = 0 THEN 'No'
            WHEN acreditada = 1 THEN 'Si'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name 
    ORDER BY value DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAdmitidos` (IN `periodo` VARCHAR(20), IN `nota` INT, IN `sede` VARCHAR(100))  SELECT * from postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula WHERE postulaciones.periodo = periodo AND postulaciones.nota >= nota AND postulaciones.sede = sede ORDER BY postulaciones.nota DESC$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAfinidad` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT afinidad        AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Alta' DESC, name='Media' DESC, name='Baja' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAfinidadHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.afinidad , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.afinidad
    Order by periodos.fechaInicio, postulantes.afinidad asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAfinidadTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` INT, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value', COUNT(name)*100/@cantidad as 'relativo'
    FROM   (SELECT afinidad        AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Alta' DESC, name='Media' DESC, name='Baja' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAsistente` (`correo` VARCHAR(50))  SELECT password, nombre, cedula FROM usuarios INNER JOIN asistentes ON usuarios.correo = asistentes.correo WHERE usuarios.correo = correo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAsistentes` ()  NO SQL
BEGIN
	START TRANSACTION;
    SELECT * from asistentes
    INNER JOIN usuarios ON asistentes.correo = usuarios.correo;
   
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerAtributos` ()  NO SQL
BEGIN
	START TRANSACTION;
    SELECT * from atributos
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerCorreoEnvio` (`correo` VARCHAR(50))  SELECT superusuario.correoEnvio FROM superusuario where superusuario.correo = correo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEdad` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SET @periodoyear = (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN @periodoyear - YEAR(fechaNacimiento)>=20 AND @periodoyear - YEAR(fechaNacimiento) <25 THEN '20-24'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=25 AND @periodoyear - YEAR(fechaNacimiento) <30 THEN '25-30'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=30 AND @periodoyear - YEAR(fechaNacimiento) <35 THEN '30-34'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=35 AND @periodoyear - YEAR(fechaNacimiento) <40 THEN '35-39' 
            WHEN @periodoyear - YEAR(fechaNacimiento)>=40 AND @periodoyear - YEAR(fechaNacimiento) <45 THEN '40-44' 
            WHEN @periodoyear - YEAR(fechaNacimiento)>=45 THEN '45 o más'            
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEdadHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo , (YEAR(periodos.fechaInicio) - YEAR(MAX(postulantes.fechaNacimiento)))  as 'Minimo', (YEAR(periodos.fechaInicio) - YEAR(MIN(postulantes.fechaNacimiento))) as 'Maximo'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEdadTabla` (IN `newperiodo` VARCHAR(100), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SET @periodoyear = (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    SELECT name, 
           COUNT(name) AS 'value',COUNT(name)*100/@cantidad as 'relativo' 
    FROM   (SELECT case
            WHEN @periodoyear - YEAR(fechaNacimiento)>=20 AND @periodoyear - YEAR(fechaNacimiento) <25 THEN '20-24'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=25 AND @periodoyear - YEAR(fechaNacimiento) <30 THEN '25-30'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=30 AND @periodoyear - YEAR(fechaNacimiento) <35 THEN '30-34'
            WHEN @periodoyear - YEAR(fechaNacimiento)>=35 AND @periodoyear - YEAR(fechaNacimiento) <40 THEN '35-39' 
            WHEN @periodoyear - YEAR(fechaNacimiento)>=40 AND @periodoyear - YEAR(fechaNacimiento) <45 THEN '40-44' 
            WHEN @periodoyear - YEAR(fechaNacimiento)>=45 THEN '45 o más'            
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEstadisticas` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SET @yearp =  (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    select @yearp- YEAR(fechaNacimiento) as 'name'from postulantes
    INNER join postulaciones ON postulaciones.cedula = postulantes.cedula
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY name DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEstadisticasEval` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    select nota as 'name'from postulaciones
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY nota DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerEstadisticasProm` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SET @yearp =  (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    select promedioGeneral as 'name'from postulantes
    INNER join postulaciones ON postulaciones.cedula = postulantes.cedula
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY name DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerExperiencia` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN experienciaProfesion <3  THEN '0 a 3 años'
            WHEN experienciaProfesion >=3 AND experienciaProfesion <=6 THEN '3 a 6 años'
            WHEN experienciaProfesion >=7 AND experienciaProfesion <=10 THEN '7 a 10 años'
            WHEN experienciaProfesion >10 THEN '10 o más'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = periodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni
	GROUP by name HAVING value >=0; 
           
            
    COMMIT;

END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerExperienciaHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN

    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    /* < 3*/
    SELECT periodos.periodo, COUNT(*) as 'value'    
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE postulantes.experienciaProfesion < 3 AND periodos.fechaInicio >= @periodoinic AND @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;
    
     /* 3-6*/
    SELECT periodos.periodo, COUNT(*) as 'value'    
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE postulantes.experienciaProfesion BETWEEN 3 AND 5 AND periodos.fechaInicio >= @periodoinic AND @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;

     /* 6-10*/
    SELECT periodos.periodo, COUNT(*) as 'value'    
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE postulantes.experienciaProfesion BETWEEN 6 AND 9 AND periodos.fechaInicio >= @periodoinic AND @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;  
    
    /* >10*/
    SELECT periodos.periodo, COUNT(*) as 'value'    
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE postulantes.experienciaProfesion >= 10 AND postulaciones.periodo = @periodoact
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;    

    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerExperienciaTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                                          
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value', COUNT(name)*100/@cantidad as 'relativo' 
    FROM   (SELECT case
            WHEN experienciaProfesion <3  THEN '0 a 3 años'
            WHEN experienciaProfesion >=3 AND experienciaProfesion <=6 THEN '3 a 6 años'
            WHEN experienciaProfesion >=7 AND experienciaProfesion <=10 THEN '7 a 10 años'
            WHEN experienciaProfesion >10 THEN '10 o más años'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni
	GROUP by name HAVING value >=0
    ORDER BY name='0 a 3 años' DESC, name ='3 a 6 años' DESC, name='7 a 10 años' DESC, name='10 o más años' DESC;
    COMMIT;

END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerFormacionComplementaria` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SET @periodoyear = (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN tituloTecnico >=1 THEN 'Título técnico'
            WHEN cursoAfin >=1 THEN 'Curso afín' 
            WHEN tituloDiplomado >=1 THEN 'Título diplomado'   
            WHEN cursoAfin =0 AND tituloTecnico = 0 AND cursoAprovechamiento = 0 AND tituloDiplomado = 0 THEN 'Ningún curso'
            WHEN cursoAprovechamiento >=1 THEN 'Cursos de 20 hrs'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Ningún Curso' DESC, name='Cursos de 20 hrs' DESC, name='Título Técnico' DESC, name='Título Maestría' DESC, name='Título Diplomado' DESC;


    COMMIT;   
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerFormacionComplementariaTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SET @periodoyear = (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    SELECT name, 
           COUNT(name) AS 'value', COUNT(name)*100/@cantidad as 'relativo' 
    FROM   (SELECT case
            WHEN tituloTecnico >=1 THEN 'Título técnico'
            WHEN cursoAfin >=1 THEN 'Curso afín' 
            WHEN tituloDiplomado >=1 THEN 'Título diplomado'   
            WHEN cursoAfin =0 AND tituloTecnico = 0 AND cursoAprovechamiento = 0 AND tituloDiplomado = 0 THEN 'Ningún curso'
            WHEN cursoAprovechamiento >=1 THEN 'Cursos de 20 hrs'
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Ningún Curso' DESC, name='Cursos de 20 hrs' DESC, name='Título Técnico' DESC, name='Título Maestría' DESC, name='Título Diplomado' DESC;

    COMMIT;   
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerGenero` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT genero        AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerGeneroHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.genero , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.genero
    Order by periodos.fechaInicio, postulantes.genero asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerGeneroTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value', COUNT(name)*100/@cantidad as 'relativo'
    FROM   (SELECT genero        AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMaximoGrado` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT gradoAcademico AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Bachillerato' DESC, name ='Licenciatura' DESC, name='Maestría' DESC, name='Doctorado' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMaximoGradoHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.gradoAcademico , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.gradoAcademico
    Order by periodos.fechaInicio, postulantes.gradoAcademico asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMaximoGradoTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' , COUNT(name)*100/@cantidad as 'relativo'
    FROM   (SELECT gradoAcademico AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Bachillerato' DESC, name ='Licenciatura' DESC, name='Maestría' DESC, name='Doctorado' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMediaEval` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` INT, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    select AVG(nota)as 'name' from postulaciones
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY nota DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMediaGen` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
     SET @yearp =  (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
    select AVG(@yearp- YEAR(fechaNacimiento))as 'name' from postulantes
     INNER join postulaciones ON postulaciones.cedula = postulantes.cedula
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY name DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMedianaEval` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    SET @r = 0;

    SELECT AVG(nota)as 'name'
    FROM (SELECT (@r := @r + 1) AS r,postulaciones.nota,postulaciones.periodo, postulaciones.sede
          FROM postulaciones ORDER BY postulaciones.nota) Temp
    WHERE
        r = (SELECT CEIL(COUNT(*) / 2) FROM postulaciones) OR
        r = (SELECT FLOOR((COUNT(*) / 2) + 1) FROM postulaciones)
        AND periodo = newperiodo AND sede = newsede AND nota > newnota 
        ORDER BY nota DESC LIMIT newcantidad;  
    COMMIT;
        
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMedianaGen` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SET @yearp =  (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    
     SET @r = 0;

    SELECT AVG(@yearp- YEAR(fechaNacimiento))as 'name'
    FROM (SELECT (@r := @r + 1) AS r,postulantes.fechaNacimiento,postulaciones.nota,postulaciones.periodo, postulaciones.sede
          FROM postulantes INNER JOIN postulaciones on postulantes.cedula = postulaciones.cedula ORDER BY postulaciones.nota) Temp
    WHERE
        r = (SELECT CEIL(COUNT(*) / 2) FROM postulaciones) OR
        r = (SELECT FLOOR((COUNT(*) / 2) + 1) FROM postulaciones)
        AND periodo = newperiodo AND sede = newsede AND nota > newnota 
        ORDER BY nota DESC LIMIT newcantidad;  
    COMMIT;
        
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMedianaProm` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
     SET @r = 0;

    SELECT AVG(promedioGeneral)as 'name'
    FROM (SELECT (@r := @r + 1) AS r,postulantes.promedioGeneral,postulaciones.nota,postulaciones.periodo, postulaciones.sede
          FROM postulantes INNER JOIN postulaciones on postulantes.cedula = postulaciones.cedula ORDER BY postulaciones.nota) Temp
    WHERE
        r = (SELECT CEIL(COUNT(*) / 2) FROM postulaciones) OR
        r = (SELECT FLOOR((COUNT(*) / 2) + 1) FROM postulaciones)
        AND periodo = newperiodo AND sede = newsede AND nota > newnota 
        ORDER BY nota DESC LIMIT newcantidad;  
    COMMIT;
        
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMediaProm` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` INT, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    select AVG(promedioGeneral)as 'name' from postulantes
     INNER join postulaciones ON postulaciones.cedula = postulantes.cedula
        WHERE postulaciones.periodo = newperiodo AND postulaciones.sede = newsede AND postulaciones.nota > newnota 
        ORDER BY name DESC LIMIT newcantidad;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMemo` (IN `periodoVigente` VARCHAR(20), IN `sedeSeleccionada` VARCHAR(100))  BEGIN
	START TRANSACTION;
	SELECT postulaciones.cedula, postulantes.nombre   FROM postulaciones  inner join postulantes on postulantes.cedula = postulaciones.cedula where postulaciones.memo = 1 and sedeSeleccionada = postulaciones.sede and periodoVigente = postulaciones.periodo ;
    UPDATE postulaciones SET memo = 0 WHERE sede = sedeSeleccionada and periodo = periodoVigente;
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerMensajeria` ()  NO SQL
BEGIN
	SELECT * FROM correoenvio;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerModaEval` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value'
    FROM   (SELECT nota        AS 'name'
            FROM   postulaciones
            WHERE  postulaciones.periodo = periodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name HAVING value >=1
    ORDER BY value DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerModaGen` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
     SET @yearp =  (SELECT YEAR(fechaInicio) from periodos where periodos.periodo = newperiodo);
    SELECT  name, 
           COUNT(name) AS 'value'
    FROM   (SELECT @yearp -YEAR(fechaNacimiento)   AS 'name'
            FROM   postulantes  INNER JOIN postulaciones on postulantes.cedula = postulaciones.cedula
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name HAVING value >=1
    ORDER BY value DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerModaProm` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
 
    SELECT  name, 
           COUNT(name) AS 'value'
    FROM   (SELECT promedioGeneral   AS 'name'
            FROM   postulantes  INNER JOIN postulaciones on postulantes.cedula = postulaciones.cedula
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name HAVING value >=1
    ORDER BY value DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerNota` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN nota <=30 THEN '0-30'
            WHEN nota >30 AND nota<=35 THEN '31-35'
            WHEN nota >35 AND nota<=40 THEN '36-40'
            WHEN nota >40 AND nota<=45 THEN '41-45'
            WHEN nota >45 AND nota <=50 THEN '46-50'
            WHEN nota >50 AND nota <=55 THEN '51-55'
            WHEN nota >55 AND nota <=60 THEN '56-60'
            WHEN nota >60 AND nota <=65 THEN '61-65'
            WHEN nota >65 AND nota <=70 THEN '66-70'
            WHEN nota >70 AND nota <=75 THEN '71-75'
            WHEN nota >75 AND nota <=80 THEN '76-80'
            WHEN nota >80 AND nota <=85 THEN '81-85'
            WHEN nota >85 AND nota <=90 THEN '86-90'
            WHEN nota >90 AND nota <=95 THEN '91-95'
            WHEN nota >95 AND nota <=100 THEN '96-100'
            END AS 'name'
            FROM   postulaciones
            WHERE  postulaciones.periodo = periodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerNotaHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo , MAX(postulaciones.nota) as 'Maximo', MIN(postulaciones.nota) as 'Minimo'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo
    Order by periodos.fechaInicio asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerNotaTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value',COUNT(name)*100/@cantidad as 'relativo' 
    FROM   (SELECT case
            WHEN nota <=30 THEN '0-30'
            WHEN nota >30 AND nota<=35 THEN '31-35'
            WHEN nota >35 AND nota<=40 THEN '36-40'
            WHEN nota >40 AND nota<=45 THEN '41-45'
            WHEN nota >45 AND nota <=50 THEN '46-50'
            WHEN nota >50 AND nota <=55 THEN '51-55'
            WHEN nota >55 AND nota <=60 THEN '56-60'
            WHEN nota >60 AND nota <=65 THEN '61-65'
            WHEN nota >65 AND nota <=70 THEN '66-70'
            WHEN nota >70 AND nota <=75 THEN '71-75'
            WHEN nota >75 AND nota <=80 THEN '76-80'
            WHEN nota >80 AND nota <=85 THEN '81-85'
            WHEN nota >85 AND nota <=90 THEN '86-90'
            WHEN nota >90 AND nota <=95 THEN '91-95'
            WHEN nota >95 AND nota <=100 THEN '96-100'
            END AS 'name'
            FROM   postulaciones
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPeriodosSig` (IN `periodoInicial` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic AND fechaInicio <= CURDATE()
    Order by periodos.fechaInicio desc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPostulaciones` (IN `periodo` VARCHAR(20))  NO SQL
BEGIN
	START TRANSACTION;
    SELECT * from postulantes
    INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula
    WHERE postulaciones.periodo = periodo 
    ORDER BY postulaciones.nota DESC;
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPostulante` (IN `newcedula` VARCHAR(40))  NO SQL
SELECT * FROM postulantes WHERE postulantes.cedula = newcedula$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPostulantes` ()  NO SQL
BEGIN
	START TRANSACTION;
    SELECT * from postulantes;
    COMMIT;
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPromedio` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT case
            WHEN promedioGeneral <=30 THEN '0-30'
            WHEN promedioGeneral>30 AND promedioGeneral<=35 THEN '31-35'
            WHEN promedioGeneral>35 AND promedioGeneral<=40 THEN '36-40'
            WHEN promedioGeneral>40 AND promedioGeneral<=45 THEN '41-45'
            WHEN promedioGeneral>45 AND promedioGeneral<=50 THEN '45-50'
            WHEN promedioGeneral>50 AND promedioGeneral<=55 THEN '51-55'
            WHEN promedioGeneral>55 AND promedioGeneral<=60 THEN '56-60'
            WHEN promedioGeneral>60 AND promedioGeneral<=65 THEN '61-65'
            WHEN promedioGeneral>65 AND promedioGeneral<=70 THEN '66-70'
            WHEN promedioGeneral>70 AND promedioGeneral<=75 THEN '71-75'
            WHEN promedioGeneral>75 AND promedioGeneral<=80 THEN '76-80'
            WHEN promedioGeneral>80 AND promedioGeneral<=85 THEN '81-85'
            WHEN promedioGeneral>85 AND promedioGeneral<=90 THEN '86-90'
            WHEN promedioGeneral>90 AND promedioGeneral<=95 THEN '91-95'
            WHEN promedioGeneral>95 AND promedioGeneral<=100 THEN '96-100'
            
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPromedioTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value' , COUNT(name)*100/@cantidad as 'relativo'
    FROM   (SELECT case
            WHEN promedioGeneral <=30 THEN '0-30'
            WHEN promedioGeneral>30 AND promedioGeneral<=35 THEN '31-35'
            WHEN promedioGeneral>35 AND promedioGeneral<=40 THEN '36-40'
            WHEN promedioGeneral>40 AND promedioGeneral<=45 THEN '41-45'
            WHEN promedioGeneral>45 AND promedioGeneral<=50 THEN '45-50'
            WHEN promedioGeneral>50 AND promedioGeneral<=55 THEN '51-55'
            WHEN promedioGeneral>55 AND promedioGeneral<=60 THEN '56-60'
            WHEN promedioGeneral>60 AND promedioGeneral<=65 THEN '61-65'
            WHEN promedioGeneral>65 AND promedioGeneral<=70 THEN '66-70'
            WHEN promedioGeneral>70 AND promedioGeneral<=75 THEN '71-75'
            WHEN promedioGeneral>75 AND promedioGeneral<=80 THEN '76-80'
            WHEN promedioGeneral>80 AND promedioGeneral<=85 THEN '81-85'
            WHEN promedioGeneral>85 AND promedioGeneral<=90 THEN '86-90'
            WHEN promedioGeneral>90 AND promedioGeneral<=95 THEN '91-95'
            WHEN promedioGeneral>95 AND promedioGeneral<=100 THEN '96-100'
            
            END AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPuestoActual` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value' 
    FROM   (SELECT puestoActual AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name
    ORDER BY name='Profesional sin personal a cargo' DESC, name ='Profesional miembro de equipo de proyectos' DESC, name='Jefatura intermedia (coordinación/supervisión)' DESC, name='Gerencia/Dirección General' DESC, name='Trabajador independiente/dueño de empresa' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPuestoActualTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    SELECT name, 
           COUNT(name) AS 'value',COUNT(name)*100/@cantidad as 'relativo'  
    FROM   (SELECT puestoActual AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name 
    ORDER BY name='Profesional sin personal a cargo' DESC, name ='Profesional miembro de equipo de proyectos' DESC, name='Jefatura intermedia (coordinación/supervisión)' DESC, name='Gerencia/Dirección General' DESC, name='Trabajador independiente/dueño de empresa' DESC;
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerPuestoHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.puestoActual , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.puestoActual
    Order by periodos.fechaInicio, postulantes.puestoActual asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerSedes` (IN `periodoVigente` VARCHAR(20))  SELECT DISTINCT postulaciones.sede   FROM postulaciones where periodoVigente = postulaciones.periodo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerSumaNota` ()  NO SQL
BEGIN
	START TRANSACTION;
    SET @periodoact = (select periodo from periodos where fechaInicio <= CURDATE() and fechaCierre >= CURDATE());

    SELECT SUM(nota) AS "nota"
    FROM postulaciones
    WHERE postulaciones.periodo = @periodoact;

    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerSuperusuario` (`correo` VARCHAR(50))  SELECT correoEnvio, password FROM usuarios INNER JOIN superusuario ON usuarios.correo = superusuario.correo WHERE usuarios.correo = correo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerUniversidad` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN
	START TRANSACTION;
    
SELECT name, 
       COUNT(name) AS 'value' 
FROM   (SELECT universidad        AS 'name'
        FROM   postulantes 
               INNER JOIN postulaciones 
                       ON postulantes.cedula = postulaciones.cedula 
        WHERE  postulaciones.periodo = periodo 
               AND postulaciones.sede = newsede 
               AND postulaciones.nota > newnota 
        ORDER BY nota DESC 
        LIMIT  newcantidad) AS Uni 
GROUP BY name 
ORDER BY value DESC;
   
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerUniversidadHistorico` (IN `periodoInicial` VARCHAR(20), IN `periodoFinal` VARCHAR(20))  NO SQL
BEGIN
    SET @periodoinic = (select fechaInicio from periodos where periodoInicial = periodos.periodo);
    SET @periodofin = (select fechaCierre from periodos where periodoFinal = periodos.periodo);

    SELECT periodos.periodo
    from periodos
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    Order by periodos.fechaInicio asc;


    SELECT periodos.periodo , postulantes.universidad , count(*) as 'value'
    FROM periodos INNER JOIN (postulantes INNER JOIN postulaciones ON postulantes.cedula = postulaciones.cedula) on periodos.periodo = postulaciones.periodo
    WHERE periodos.fechaInicio >= @periodoinic and @periodofin >= periodos.fechaCierre
    GROUP by periodos.periodo, postulantes.universidad
    Order by periodos.fechaInicio, postulantes.universidad asc;
   
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `ObtenerUniversidadTabla` (IN `newperiodo` VARCHAR(20), IN `newsede` VARCHAR(100), IN `newnota` DOUBLE, IN `newcantidad` INT)  NO SQL
BEGIN

    SET @cantidad= (SELECT COUNT(*) FROM (SELECT postulantes.cedula  FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota
            ORDER BY nota DESC 
            LIMIT  newcantidad)
                   AS A);
	START TRANSACTION;
    
    SELECT name, 
           COUNT(name) AS 'value',COUNT(name)*100/@cantidad as 'relativo'  
    FROM   (SELECT universidad        AS 'name'
            FROM   postulantes 
                   INNER JOIN postulaciones 
                           ON postulantes.cedula = postulaciones.cedula 
            WHERE  postulaciones.periodo = newperiodo 
                   AND postulaciones.sede = newsede 
                   AND postulaciones.nota > newnota 
            ORDER BY nota DESC 
            LIMIT  newcantidad) AS Uni 
    GROUP BY name 
    ORDER BY value DESC;
   
    
    COMMIT;
    
    
END$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `PeriodoActual` ()  select periodo from periodos where fechaInicio <= CURDATE() and fechaCierre >= CURDATE()$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `PeriodoAnterior` ()  select periodo from periodos where fechaCierre < CURDATE() ORDER BY fechaCierre desc$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `PeriodoEspecifico` (`nameperiodo` VARCHAR(50))  select periodo, fechaInicio, fechaCierre from periodos where periodo = nameperiodo$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `PeriodosTranscurridos` ()  SELECT periodo FROM periodos WHERE fechaInicio <= CURDATE() ORDER BY periodos.fechaInicio DESC$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `UltimaPostulacion` (IN `ced` INT)  NO SQL
SELECT  enfasis, sede, nota FROM `postulaciones`as PS INNER JOIN periodos as P on PS.periodo = P.periodo
WHERE cedula = ced ORDER BY P.FechaInicio desc LIMIT 1$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `UpdatePassword` (IN `correoUsuario` VARCHAR(50), IN `pass` VARCHAR(30))  NO SQL
UPDATE `usuarios` SET `password`= pass WHERE correo = correoUsuario$$

CREATE DEFINER=`systemUser`@`localhost` PROCEDURE `VerPeriodo` ()  SELECT periodo FROM periodos ORDER BY fechaInicio asc$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistentes`
--

CREATE TABLE `asistentes` (
  `correo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cedula` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributos`
--

CREATE TABLE `atributos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `peso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `atributos`
--

INSERT INTO `atributos` (`id`, `nombre`, `peso`) VALUES
(1, 'Bachillerato', 0),
(2, 'Licenciatura', 5),
(3, 'Maestría', 10),
(4, 'Doctorado', 10),
(5, 'Promedio general', 10),
(6, 'De 3 a menos de 6 años', 10),
(7, 'De 6 a menos de 10 años', 15),
(8, 'Más de 10 años', 20),
(9, 'Profesional sin personal a cargo', 0),
(10, 'Profesional miembro de equipo de proyectos', 10),
(11, 'Jefatura intermedia (coordinación/supervisión)', 15),
(12, 'Gerencia/Dirección General', 20),
(13, 'Trabajor independiente/dueño de empresa', 20),
(14, 'Alta', 20),
(15, 'Media', 15),
(16, 'Baja', 10),
(17, 'Acreditada', 10),
(18, 'No acreditada', 0),
(19, 'Curso o taller de aprovechamiento', 1),
(20, 'Título de técnico en el área de proyectos', 5),
(21, 'Curso a nivel de maestría o afín', 5),
(22, 'Título de diplomado o especialista', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correoenvio`
--

CREATE TABLE `correoenvio` (
  `correo` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `correoenvio`
--

INSERT INTO `correoenvio` (`correo`, `password`) VALUES
('gpm.itcr1@gmail.com', 'Posgrados/2018');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metricas`
--

CREATE TABLE `metricas` (
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `metricas`
--

INSERT INTO `metricas` (`nombre`) VALUES
('Afinidad profesional'),
('Carrera acreditada'),
('Experiencia profesional'),
('Formación complementaria'),
('Máximo grado académico'),
('Promedio general'),
('Puesto actual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metricaxatributo`
--

CREATE TABLE `metricaxatributo` (
  `idAtributo` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `metricaxatributo`
--

INSERT INTO `metricaxatributo` (`idAtributo`, `nombre`) VALUES
(1, 'Máximo grado académico'),
(2, 'Máximo grado académico'),
(3, 'Máximo grado académico'),
(4, 'Máximo grado académico'),
(5, 'Promedio general'),
(6, 'Experiencia profesional'),
(7, 'Experiencia profesional'),
(8, 'Experiencia profesional'),
(9, 'Puesto actual'),
(10, 'Puesto actual'),
(11, 'Puesto actual'),
(12, 'Puesto actual'),
(13, 'Puesto actual'),
(14, 'Afinidad profesional'),
(15, 'Afinidad profesional'),
(16, 'Afinidad profesional'),
(17, 'Carrera acreditada'),
(18, 'Carrera acreditada'),
(19, 'Formación complementaria'),
(20, 'Formación complementaria'),
(21, 'Formación complementaria'),
(22, 'Formación complementaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE `periodos` (
  `periodo` varchar(20) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaCierre` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulaciones`
--

CREATE TABLE `postulaciones` (
  `periodo` varchar(20) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `enfasis` varchar(50) NOT NULL,
  `sede` varchar(100) NOT NULL,
  `nota` double NOT NULL,
  `memo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulantes`
--

CREATE TABLE `postulantes` (
  `cedula` varchar(40) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono1` varchar(30) NOT NULL,
  `telefono2` varchar(30) DEFAULT NULL,
  `correo1` varchar(50) NOT NULL,
  `correo2` varchar(50) NOT NULL,
  `ingles` tinyint(1) NOT NULL,
  `gradoAcademico` varchar(15) NOT NULL,
  `universidad` varchar(80) NOT NULL,
  `afinidad` varchar(30) NOT NULL,
  `acreditada` tinyint(1) NOT NULL,
  `puestoActual` varchar(60) NOT NULL,
  `experienciaProfesion` int(11) NOT NULL,
  `cursoAfin` int(11) NOT NULL,
  `tituloTecnico` tinyint(1) NOT NULL,
  `cursoAprovechamiento` int(11) NOT NULL,
  `tituloDiplomado` tinyint(1) NOT NULL,
  `promedioGeneral` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superusuario`
--

CREATE TABLE `superusuario` (
  `correo` varchar(50) NOT NULL,
  `correoEnvio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `superusuario`
--

INSERT INTO `superusuario` (`correo`, `correoEnvio`) VALUES
('gpm@itcr.ac.cr', 'jgomezcasasola@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `password`) VALUES
('gpm@itcr.ac.cr', 'Posgrados/2018');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistentes`
--
ALTER TABLE `asistentes`
  ADD PRIMARY KEY (`correo`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `atributos`
--
ALTER TABLE `atributos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `correoenvio`
--
ALTER TABLE `correoenvio`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `metricas`
--
ALTER TABLE `metricas`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `metricaxatributo`
--
ALTER TABLE `metricaxatributo`
  ADD PRIMARY KEY (`idAtributo`,`nombre`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`periodo`);

--
-- Indices de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD PRIMARY KEY (`periodo`,`cedula`),
  ADD KEY `cedula` (`cedula`);

--
-- Indices de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

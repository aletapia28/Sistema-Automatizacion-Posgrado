USE sistpostulacion;
drop procedure if exists CrearAsistente;
delimiter //

CREATE PROCEDURE CrearAsistente ( newcorreo varchar(50), newpassword varchar(30), newnombre varchar(50), newcedula varchar(20))
BEGIN
	START TRANSACTION;
    INSERT INTO usuarios (correo, password) VALUES (newcorreo, newpassword);
	INSERT INTO asistentes (correo, nombre, cedula) VALUES (newcorreo, newnombre, newcedula);
    COMMIT;
END//
delimiter ;



drop procedure if exists EditarSuperusuario;
delimiter //

CREATE PROCEDURE EditarSuperusuario ( newcorreo varchar(50), newpassword varchar(30), newcorreoEnvio varchar(50))
BEGIN
	START TRANSACTION;
    UPDATE usuarios SET password = newpassword WHERE correo = newcorreo;
    UPDATE superusuario SET correoEnvio = newcorreoEnvio WHERE correo = newcorreo;
    COMMIT;
END//
delimiter ;


drop procedure if exists BorrarAsistente;
delimiter //
CREATE PROCEDURE BorrarAsistente ( newcorreo varchar(50))
BEGIN
	START TRANSACTION;
    DELETE FROM usuarios WHERE correo = newcorreo;
	DELETE FROM asistentes WHERE correo = newcorreo;
	COMMIT;
END//
delimiter ;

drop procedure if exists EditarAsistente;
delimiter //

CREATE PROCEDURE EditarAsistente ( newcorreo varchar(50), newpassword varchar(30), newnombre varchar(50), newcedula varchar(20)
BEGIN
	START TRANSACTION;
    UPDATE usuarios SET password = newpassword WHERE correo = newcorreo;
    UPDATE asistentes SET nombre = newnombre and cedula = newcedula WHERE correo = newcorreo;
    COMMIT;
END//
delimiter ;






drop procedure if exists VerUsuario;
CREATE PROCEDURE VerUsuario ()
    SELECT usuarios.correo FROM usuarios;


drop procedure if exists EditarUsuario;
CREATE PROCEDURE EditarUsuario ( newcorreo varchar(50), newpassword varchar(30))
    UPDATE usuarios
    SET password = newpassword
    WHERE correo = newcorreo;



drop procedure if exists CrearPeriodo;
delimiter //
CREATE PROCEDURE CrearPeriodo ( newperiodo varchar(50), inicio date, cierre date)
	IF (not exists( SELECT * FROM periodos WHERE (inicio > periodos.fechaInicio and inicio < periodos.fechaCierre) or (cierre > periodos.fechaInicio and cierre < periodos.fechaCierre ))) THEN INSERT INTO periodos(periodo, fechaInicio,fechaCierre) VALUES (newperiodo, inicio, cierre);
END IF//
delimiter ;



drop procedure if exists EditarPeriodo;
delimiter //
CREATE PROCEDURE EditarPeriodo ( newperiodo varchar(50), inicio date, cierre date)
	IF (not exists( SELECT * FROM periodos WHERE (inicio > periodos.fechaInicio and inicio < periodos.fechaCierre) or (cierre > periodos.fechaInicio and cierre < periodos.fechaCierre ))) THEN UPDATE periodos set fechaInicio = inicio , fechaCierre = cierre where periodo = newperiodo;
END IF//
delimiter ;




drop procedure if exists EliminarPeriodo;
CREATE PROCEDURE EliminarPeriodo(nameperiodo varchar(50))
    DELETE FROM periodos where periodo = nameperiodo;


drop procedure if exists VerPeriodo;
CREATE PROCEDURE VerPeriodo()
    SELECT periodo FROM periodos ORDER BY fechaInicio desc;



SHOW PROCEDURE STATUS;

drop procedure if exists PeriodoActual;
CREATE PROCEDURE PeriodoActual()
    select periodo from periodos where fechaInicio < CURDATE() and fechaCierre > CURDATE();






drop procedure if exists CerrarPeriodoActual;
CREATE PROCEDURE CerrarPeriodoActual()
    UPDATE periodos SET fechaCierre = CURDATE() WHERE fechaCierre > CURDATE() and fechaInicio < CURDATE();





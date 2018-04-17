-- MySQL Script generated by MySQL Workbench
-- Tue Apr 17 15:29:33 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd` DEFAULT CHARACTER SET latin1 ;
USE `bd` ;

-- -----------------------------------------------------
-- Table `bd`.`seccional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`seccional` (
  `idSeccional` INT(11) NOT NULL AUTO_INCREMENT,
  `ciudad` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `departamento` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `liderProceso` VARCHAR(45) NOT NULL,
  `Tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSeccional`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`cargo` (
  `idCargos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `nivel` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCargos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`empleado` (
  `cedula` BIGINT(50) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(3) NOT NULL,
  `seccional_idSeccional` INT(11) NOT NULL,
  `cargo_idCargos` INT NOT NULL,
  PRIMARY KEY (`cedula`, `seccional_idSeccional`, `cargo_idCargos`),
  INDEX `fk_empleado_seccional1_idx` (`seccional_idSeccional` ASC),
  INDEX `fk_empleado_cargo1_idx` (`cargo_idCargos` ASC),
  CONSTRAINT `fk_empleado_seccional1`
    FOREIGN KEY (`seccional_idSeccional`)
    REFERENCES `bd`.`seccional` (`idSeccional`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_cargo1`
    FOREIGN KEY (`cargo_idCargos`)
    REFERENCES `bd`.`cargo` (`idCargos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd`.`cuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`cuenta` (
  `idSeccional` INT NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `empleado_cedula` BIGINT(50) NOT NULL,
  PRIMARY KEY (`empleado_cedula`),
  INDEX `fk_cuenta_empleado_idx` (`empleado_cedula` ASC),
  CONSTRAINT `fk_cuenta_empleado`
    FOREIGN KEY (`empleado_cedula`)
    REFERENCES `bd`.`empleado` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd`.`registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`registro` (
  `idRegistro` INT(11) NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idRegistro`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd`.`cuenta_has_registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd`.`cuenta_has_registro` (
  `cuenta_idCuenta` INT(20) NOT NULL,
  `cuenta_empleado_cedula` BIGINT(50) NOT NULL,
  `registro_idRegistro` INT(11) NOT NULL,
  PRIMARY KEY (`cuenta_idCuenta`, `cuenta_empleado_cedula`, `registro_idRegistro`),
  INDEX `fk_cuenta_has_registro_registro1_idx` (`registro_idRegistro` ASC),
  INDEX `fk_cuenta_has_registro_cuenta1_idx` (`cuenta_idCuenta` ASC, `cuenta_empleado_cedula` ASC),
  CONSTRAINT `fk_cuenta_has_registro_cuenta1`
    FOREIGN KEY (`cuenta_empleado_cedula`)
    REFERENCES `bd`.`cuenta` (`empleado_cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cuenta_has_registro_registro1`
    FOREIGN KEY (`registro_idRegistro`)
    REFERENCES `bd`.`registro` (`idRegistro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `cuenta` ( `contrasena`, `empleado_cedula`, `idSeccional`) VALUES
('UbcFeuR35Wcuy+vusRINTg==', 123456, 1),
( 'UbcFeuR35Wcuy+vusRINTg==', 456789, 1),
( 'UbcFeuR35Wcuy+vusRINTg==', 251721, 1),
( 'UbcFeuR35Wcuy+vusRINTg==', 789123, 1),
( 'UbcFeuR35Wcuy+vusRINTg==', 1012456674, 1),
( 'UbcFeuR35Wcuy+vusRINTg==', 98092420329, 1);

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`cedula`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `numero`, `sexo`, `seccional_idSeccional`, `cargo_idCargos`) VALUES
(123456, 'Alfredo', 'Rodríguez', 'alfredo@andreslargo.com', '31234', 'Cll 21 ', '346123', 'm', 1,0),
(456789, 'Emilio', 'Rodríguez', 'emilio@andreslargo.com', '1234', 'Cll 211 ', '343', 'm', 1,1),
(789123, 'Wanda', 'Velasquez', 'wanda@andreslargo.com', '334', 'Cll 21 ', '343', 'f', 1,2),
(1012456674, 'José', 'Rodríguez', 'asd@andreslargo.com', '3456', 'Cll 18 X', '346', 'm', 1,3),
(98092420329, 'Andres é', 'Cuenca Pérez', 'cohchino@andreslargo.com', '3228456', 'Cll 18 B', '3646', 'm', 1,4);


﻿
--
-- Table structure for table `cargo`


DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargo` (
  `idCargos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `nivel` int(11) NOT NULL,
  PRIMARY KEY (`idCargos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--


LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuenta` (
  `contrasena` varchar(45) NOT NULL,
`estado` varchar(15) NOT NULL,
  `cedula` bigint(50) NOT NULL,
  PRIMARY KEY (`cedula`),
  KEY `fk_cuenta_empleado1_idx` (`cedula`),
  CONSTRAINT `fk_cuenta_empleado1` FOREIGN KEY (`cedula`) REFERENCES `empleado` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;
select * from cuenta;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documento` (
  `idDocumento` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo` varchar(20) NOT NULL COMMENT 'pueden ser, manuales, guías, procedimientos, instructivos o acuerdos.',
  `fecha_creacion` date NOT NULL,
  `fecha_aprobacion` date NOT NULL,
  `fecha_publicacion` date NOT NULL,
  PRIMARY KEY (`idDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `cedula` bigint(50) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `numero` varchar(45) NOT NULL,
  `sexo` varchar(3) NOT NULL,
  `idSeccional` int(11) NOT NULL,
  `cargo_idCargos` int(11) NOT NULL,
  PRIMARY KEY (`cedula`),
  KEY `fk_empleado_seccional1_idx` (`idSeccional`),
  KEY `fk_empleado_cargo1_idx` (`cargo_idCargos`),
  CONSTRAINT `fk_empleado_cargo1` FOREIGN KEY (`cargo_idCargos`) REFERENCES `cargo` (`idCargos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_seccional1` FOREIGN KEY (`idSeccional`) REFERENCES `seccional` (`idSeccional`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `macroproceso`
--

DROP TABLE IF EXISTS `macroproceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `macroproceso` (
  `id` int(11) NOT NULL,
  `Nombrel` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `macroproceso`
--

LOCK TABLES `macroproceso` WRITE;
/*!40000 ALTER TABLE `macroproceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `macroproceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proceso`
--

DROP TABLE IF EXISTS `proceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proceso` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Macroproceso_id` int(11) NOT NULL,
  `Tipo` varchar(45) NOT NULL COMMENT 'Puede ser crear/actualizar/eliminar/aprovar\n',
  `Estado` varchar(15) NOT NULL COMMENT 'Aprobado/No aprobado/Pendiente',
  PRIMARY KEY (`id`),
  KEY `fk_Proceso_Macroproceso1_idx` (`Macroproceso_id`),
  CONSTRAINT `fk_Proceso_Macroproceso1` FOREIGN KEY (`Macroproceso_id`) REFERENCES `macroproceso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proceso`
--

LOCK TABLES `proceso` WRITE;
/*!40000 ALTER TABLE `proceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `proceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro` (
  `idRegistro` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idRegistro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regristro_de_procesos`
--

DROP TABLE IF EXISTS `regristro_de_procesos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regristro_de_procesos` (
  `idRegistro` int(11) NOT NULL,
  `cedula` bigint(50) NOT NULL,
  `Hora` time NOT NULL,
  `Descripción` varchar(100) DEFAULT NULL,
  `idDocumento` int(11) NOT NULL,
  `idProceso` int(11) NOT NULL,
  PRIMARY KEY (`idRegistro`),
  KEY `fk_registro_has_cuenta_registro1_idx` (`idRegistro`),
  KEY `fk_registro_has_cuenta_cuenta1_idx` (`cedula`),
  KEY `fk_registro_has_cuenta_Documento1_idx` (`idDocumento`),
  KEY `fk_registro_has_cuenta_Proceso1_idx` (`idProceso`),
  CONSTRAINT `fk_registro_has_cuenta_Documento1` FOREIGN KEY (`idDocumento`) REFERENCES `documento` (`idDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_registro_has_cuenta_Proceso1` FOREIGN KEY (`idProceso`) REFERENCES `proceso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_registro_has_cuenta_cuenta1` FOREIGN KEY (`cedula`) REFERENCES `cuenta` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_registro_has_cuenta_registro1` FOREIGN KEY (`idRegistro`) REFERENCES `registro` (`idRegistro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regristro_de_procesos`
--

LOCK TABLES `regristro_de_procesos` WRITE;
/*!40000 ALTER TABLE `regristro_de_procesos` DISABLE KEYS */;
/*!40000 ALTER TABLE `regristro_de_procesos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seccional`
--

DROP TABLE IF EXISTS `seccional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seccional` (
  `idSeccional` int(11) NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `departamento` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `liderProceso` varchar(45) NOT NULL,
  `Tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`idSeccional`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccional`
--

LOCK TABLES `seccional` WRITE;

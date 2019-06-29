DROP DATABASE IF EXISTS pageturner_db;
CREATE DATABASE pageturner_db;

USE pageturner_db;

create table books (
id int(1) NOT NULL AUTO_INCREMENT,
title varchar(255) DEFAULT NULL,
author varchar(255) DEFAULT NULL,
genre varchar(255) DEFAULT NULL,
pages int(255) DEFAULT NULL,
comments varchar(255) DEFAULT NULL,
rating int(10) DEFAULT NULL,
image_path varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;

create table reader (
id int(1) NOT NULL AUTO_INCREMENT,
name varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ID_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;

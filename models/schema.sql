DROP DATABASE IF EXISTS pageturner_db;
CREATE DATABASE pageturner_db;

USE pageturner_db;

create table pageturner_db (
id int(1) NOT NULL AUTO_INCREMENT,
title varchar(255) DEFAULT NULL,
author varchar(255) DEFAULT NULL,
genre varchar(255) DEFAULT NULL,
page_count varchar(255) DEFAULT NULL,
comments varchar(255) DEFAULT NULL,
rating varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ID_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;
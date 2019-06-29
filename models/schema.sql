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
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;

create table reader (
id int(1) NOT NULL AUTO_INCREMENT,
name varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ID_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;


-- insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
-- values ("Eloquent Javascript 3rd Edition", "Marijn", " Haverbeke", "Educational", 472, "informative and detailed", 10, "");

-- insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
-- values ("Native Son", "Richard", "Wright", "Autobiography", 544, "Very tragic, very well written, still relevant today (edited)", 5, "");

-- insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
-- values ("A Confederacy of Dunces", "John", "Kennedy Toole", "Travel", 405, "Absurd and hilarious, lively depiction of New Orleans", 5, "");

DROP DATABASE IF EXISTS pageturner_db;
CREATE DATABASE pageturner_db;

USE pageturner_db;

create table books (
id int(1) NOT NULL AUTO_INCREMENT,
title varchar(255) DEFAULT NULL,
author_firstname varchar(255) DEFAULT NULL,
author_lastname varchar(255) DEFAULT NULL,
genre varchar(255) DEFAULT NULL,
page_count int(5000) DEFAULT NULL,
comments varchar(255) DEFAULT NULL,
rating int(5) DEFAULT NOT NULL,
image_path varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ID_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=ascii;

insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
values ("Eloquent Javascript 3rd Edition", "Marijn", " Haverbeke", "Educational", 472, "informative and detailed", 10, "https://eloquentjavascript.net/img/cover.jpg");

insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
values ("Native Son", "Richard", "Wright", "Autobiography", 544, "Very tragic, very well written, still relevant today (edited)", 5, "");

insert into books (author_firstname, author_lastname, genre, page_count, comments, rating, image_path)
values ("A Confederacy of Dunces", "John", "Kennedy Toole", "Travel", 405, "Absurd and hilarious, lively depiction of New Orleans", 5, "");
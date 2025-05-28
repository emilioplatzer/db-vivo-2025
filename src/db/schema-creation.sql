create schema if not exists insc;

set search_path = insc;

create table alumnos(
    lu varchar(10) primary key,
    nombres text,
    apellido text,
    mail text, 
    annio_ingreso integer
);

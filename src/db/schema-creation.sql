set role to inscriptos_owner;

drop table if exists alumnos;
drop schema if exists insc;

create schema insc;

set search_path = insc;

create table alumnos(
    lu varchar(10) primary key,
    nombres text,
    apellido text,
    mail text,
    annio_ingreso integer
);

grant usage on schema insc to inscriptos_user; 
grant select, insert on alumnos to inscriptos_user;
set role to inscriptos_owner;

drop table if exists alumnos;
drop schema if exists insc;

create schema insc;
grant usage on schema insc to inscriptos_user; 

set search_path = insc;

create table alumnos(
    lu varchar(10) primary key,
    nombres text,
    apellido text,
    mail text,
    annio_ingreso integer
);
grant select, insert on alumnos to inscriptos_user;

create table materias(
    mat varchar(10) primary key,
    nombre text,
    area text,
    horas integer
);

insert into materias
    (mat      , nombre                                    , area        , horas) values
    ('BD'     , 'Base de Datos'                           , 'Sistemas'  ,     7),
    ('MN'     , 'Métodos Numéricos'                       , 'Algoritmos',     5),
    ('AED3'   , 'Algoritmos y Estructuras de Datos III'   , 'Algoritmos',     5);

grant select, insert on alumnos to inscriptos_user;

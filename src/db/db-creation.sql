-- create database inscriptos;
--- correr separado
create user inscriptos_owner;
alter database inscriptos  owner to inscriptos_owner;

create user inscriptos_user;
grant connect on database inscriptos to inscriptos_user;
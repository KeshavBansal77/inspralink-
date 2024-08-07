use project;
create table users(email varchar(40) primary key, pwd varchar(30), utype varchar(20),status int default 1);
select * from users;
delete from users where pwd='23';
create table iprofile(email varchar(40) primary key, iname varchar(50), gender varchar(50) , dob date, address varchar(200), city varchar(100), contact int , field varchar(100), insta varchar(100), fb varchar(100), youtube varchar(100), others varchar(500), picpath varchar(100));
select * from iprofile;
select * from events;
SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 1;
delete from events where venue='rampura';
select * from users;
create table cprofile(email varchar(40) primary key, name varchar(30), city varchar(40),state varchar(40),org  varchar(100),mobile int);
select * from cprofile;


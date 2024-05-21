CREATE DATABASE IF NOT EXISTS penca_ucu;

-- Use the newly created database
USE penca_ucu;


create table Admin
(
   username VARCHAR(255) not null,
   name     varchar(255) not null,
   lastname varchar(255) not null,
   email    varchar(255) not null,
   constraint Admin_pk
       primary key (username)
);

create table Alumn
(
   username    varchar(255) not null,
   name        varchar(255) not null,
   lastname    varchar(255) not null,
   email       varchar(255) not null,
   score       int         null,
   name_career varchar(255) not null,
   firstPlace    varchar(255) not null,
   secondPlace    varchar(255) not null,
   password    varchar(255) not null,
   constraint Alumn_pk
       primary key (username)
);

create table Prediction
(
   prediction_username  varchar(255)  not null,
   game_id              varchar(255) not null,
   team1_goals_expected smallint     not null,
   team2_goals_expected smallint     not null,
   score                int          null,


   constraint Prediction_pk
       primary key (prediction_username, game_id)
);



create table Game
(
   id                   varchar(255)  not null,
   team1                varchar(255) not null,
   team2                varchar(255) not null,
   team1_goals          smallint     null,
   team2_goals          smallint     null,
   stage                enum ('GROUPS', 'QUARTER-FINALS', 'SEMIFINALS', 'THIRD-PLACE', 'FINAL') not null,
   date                 DATETIME     not null,
   is_finished          boolean      not null,
   constraint Game_pk
       primary key (id)
);
create table Team
(
   name         varchar(255) not null,
   fifa_ranking int          not null,
   constraint Team_pk
       primary key (name)
);


alter table Prediction
    add constraint Prediction_Alumn_username_fk
        foreign key (prediction_username) references Alumn (username);

alter table Prediction
    add constraint Prediction_Game_id_fk
        foreign key (game_id) references Game (id);

alter table Game
    add constraint Game_Team_team1_fk
        foreign key (team1) references Team (name);

alter table Game
    add constraint Game_Team_team2_fk
        foreign key (team2) references Team (name);

alter table Alumn
    add constraint Alumn_Team_firstPlace_fk
        foreign key (firstPlace) references Team (name);
alter table Alumn
    add constraint Alumn_Team_secondPlace_fk
        foreign key (secondPlace) references Team (name);

INSERT INTO Team (name, fifa_ranking) VALUES
('Argentina', 5),
('Bolivia', 75),
('Brasil', 1),
('Chile', 21),
('Colombia', 15),
('Ecuador', 63),
('Paraguay', 40),
('Peru', 28),
('Canada',45),
('Mexico',23),
('Jamaica',112),
('Estados Unidos',51),
('Uruguay',3),
('Venezuela',31),
('Panama',162);


INSERT INTO Game(id, team1, team2, stage, date, is_finished) VALUES
('1','Peru','Chile','GROUPS','2024-06-21 21:00:00',false),
('2','Ecuador','Venezuela','GROUPS','2024-06-22 19:00:00',false),
('3','Argentina','Canada','GROUPS','2024-06-20 21:00:00',false),
('4','Mexico','Jamaica','GROUPS','2024-06-22 22:00:00',false),
('5', 'Estados Unidos','Bolivia','GROUPS','2024-06-23 19:00:00',false),
('6', 'Uruguay','Panama','GROUPS','2024-06-23 22:00:00',false);


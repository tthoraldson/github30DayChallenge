--IMPORTANT: create database :: github_challenge

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 github_url varchar(50),
 email varchar(50),
 display_name varchar(200),
 authToken varchar(255),
 user_id varchar(20),
 profile_photo varchar(255),
 auth_level varchar(100)
);

CREATE TABLE sprint2 (
id SERIAL PRIMARY KEY,
member_name        varchar(50),
member_team        varchar(50),
team_score         integer,
member_score       integer,
date_8_23          integer,
date_8_24          integer,
date_8_25          integer,
date_8_26          integer,
date_8_27          integer,
date_8_28          integer,
date_8_29          integer,
date_8_30          integer,
date_8_31          integer,
date_9_1           integer,
date_9_2           integer,
date_9_3           integer,
date_9_4           integer,
date_9_5           integer,
date_9_6           integer,
date_9_7           integer,
date_9_8           integer,
date_9_9           integer,
date_9_10          integer,
date_9_11          integer,
date_9_12          integer,
date_9_13          integer,
date_9_14          integer,
date_9_15          integer,
date_9_16          integer,
date_9_17          integer,
date_9_18          integer,
date_9_19          integer,
date_9_20          integer,
date_9_21          integer
);

CREATE TABLE form_history (
id SERIAL PRIMARY KEY,
form_title       varchar(50),
form_description       varchar(250),
form_questions json
);

Create table admin (
currentSurvey integer,
currentSprint integer
);

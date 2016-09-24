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

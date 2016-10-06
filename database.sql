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


-- holds all the forms that have been created
CREATE TABLE form_history (
id SERIAL PRIMARY KEY,
form_title varchar(50),
form_description varchar(250),
form_questions json
);

-- what is the active survey? what is the active sprint?
CREATE TABLE admin (
currentSurvey integer,
currentSprint integer
);

-- Sprint History table
CREATE TABLE sprint_history (
  id SERIAL PRIMARY KEY,
  sprint_name varchar(50),
  start_date varchar(15),
  currentSprint boolean
);


-- EMAIL WHITELIST --
CREATE TABLE whitelist (
id SERIAL PRIMARY KEY,
email varchar(100)
);

--holds full user lawn--
CREATE TABLE user_lawns (
github varchar(50),
date varchar(30),
did_commit boolean,
commits integer
);





-- TEMPLATES FOR PG QUERIES
-- generic sprint data table template
CREATE TABLE SPRINTNAME_data (
github varchar(50), -- relational mark
date varchar(12),
commits boolean
);

-- generic sprint team table
CREATE TABLE SPRINTNAME_teams (
id SERIAL PRIMARY KEY,
github varchar(50), -- realational mark
team varchar(50)
);




-- SPRINT 2 TEAM TABLE!!
INSERT INTO s2_teams (github, team)
VALUES ('scottbromander', null),
('emkerber', null),
('HillaryManning', null),
('McCully', null),
('schooolman', null),
('hankandre', null),
('cwklausing', null),
('Mandosis', null),
('maykid24', null),
('4cm4k1', null),
('corinamarie', null),
('bljohnson', null),
('clarejacky', null),
('Ludstuen90', null),
('oliverlangmo', null),
('mulchy', null),
('romstevens', null),
('Shinybirdy', null),
('katiebvogel', null),
('jonwilsoncomedy', null),
('nickrenfo2', null),
('minimart', null),
('gfrethem', null),
('libbylondon11', null),
('Increvateur', null),
('savionguyen', 'eros'),
('aaronrmcgrath', 'eros'),
('wallacewylie', 'eros'),
('fsheahan', 'eros'),
('dannyRitter', 'eros'),
('BennettBatzli', 'dactyl'),
('patkahnke', 'dactyl'),
('joshgressman', 'dactyl'),
('ginityson', 'dactyl'),
('russellpipal', 'dactyl'),
('aminge37', 'europa'),
('SamSunders', 'europa'),
('aharasymiw', 'europa'),
('monifrancesca', 'europa'),
('Littlewhelan', 'europa'),
('glydeb', 'gaspra'),
('mikelseverson', 'gaspra'),
('oakesjessica', 'gaspra'),
('carnesen', 'gaspra'),
('atousley', 'gaspra'),
('cairnstan', 'ida'),
('skylerdegrote', 'ida'),
('shklein', 'ida'),
('laurakressin', 'ida'),
('eca12v', 'ida'),
('enriqueortega', 'ida'),
('jmanders85', 'io'),
('mhwalsh', 'io'),
('caitecoll', 'io'),
('bpeterson1663', 'io'),
('ekimlinger', 'io'),
('peters313', 'deimos'),
('Adia-A', 'deimos'),
('rohran01', 'deimos'),
('ekmpls', 'deimos'),
('JScearcy', 'deimos'),
('tthoraldson', 'linus'),
('jtorborg', 'linus'),
('IamUnInc', 'linus'),
('kerij', 'linus'),
('dennycheng', 'linus'),
('twinklefingers', 'linus'),
('lpuhl', 'linus'),
('kmaimn', 'linus'),
('coreypeck', 'linus'),
('Spengs', 'linus'),
('dkuntz811', 'linus'),
('andrewwiskus', 'linus'),
('adameastvold', 'linus'),
('lizhaak', 'linus'),
('2trill2spill', 'linus');

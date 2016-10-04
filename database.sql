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

-- holds all the forms that have been created
CREATE TABLE form_history (
id SERIAL PRIMARY KEY,
form_title       varchar(50),
form_description       varchar(250),
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








-- TEMPLATES FOR PG QUERIES
-- generic sprint data table template
CREATE TABLE SPRINTNAME_data (
id SERIAL PRIMARY KEY,
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

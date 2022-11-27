BEGIN TRANSACTION;
DROP TABLE IF EXISTS frame;
DROP TABLE IF EXISTS inspection;

CREATE TABLE inspection
(
	inspection_id serial,
	inspection_date varchar(20),
	start_time varchar(50),
	weather_temp int,
	weather_condition varchar(50),
	bee_temperament varchar(20),
	bee_population varchar(20),
	drone_population varchar(20),
	laying_pattern varchar(20),
	hive_beetles varchar(20),
	other_pests varchar(20),
	notes text,
	box_three varchar(50),
	box_two varchar(50),
	box_one varchar(50),
	CONSTRAINT pk_inspection PRIMARY KEY (inspection_id)
);

CREATE TABLE frame
(
	frame_id serial,
	inspection_id int NOT null,
	box_number int,
	frame_name varchar(3),
	comb_pattern varchar(20),
	honey varchar(20),
	nectar varchar(20),
	brood varchar(50),
	queen_spotted boolean,
	cells varchar(50),
	CONSTRAINT pk_frame PRIMARY KEY (frame_id),
	CONSTRAINT fk_inspection FOREIGN KEY (inspection_id) REFERENCES inspection (inspection_id)
);

COMMIT TRANSACTION;





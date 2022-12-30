DROP DATABASE IF EXISTS crash_mapper;
CREATE DATABASE crash_mapper;
USE crash_mapper; 

DROP TABLE IF EXISTS CRASH_EVENT; 
CREATE TABLE CRASH_EVENT(
	report_number int NOT NULL, 
	crash_date date NOT NULL, 
    crash_time time NOT NULL,
	county varchar(100) NOT NULL, 
	city varchar(100) NOT NULL, 
    investigating_agency varchar(100) NOT NULL, 
	on_street varchar(100) NOT NULL, 
    offset_feet int, 
    offset_direction varchar(100), 
    from_intersecting_street varchar(100), 
    crash_severity varchar(50) NOT NULL,
    latitude decimal(9, 6) NOT NULL,
    longitude decimal(9, 6) NOT NULL,
    CONSTRAINT pk_report_number PRIMARY KEY (report_number) 
);

DROP TABLE IF EXISTS VEHICLE; 
CREATE TABLE VEHICLE(
	report_number int NOT NULL, 
	vehicle_number int NOT NULL, 
    year_int int NOT NULL,
	make varchar(50) NOT NULL, 
	model varchar(50) NOT NULL, 
    color varchar(75) NOT NULL, 
	traveling_on_street varchar(100) NOT NULL, 
    traveling_direction varchar(100) NOT NULL, 
    maneuver varchar(100) NOT NULL, 
	CONSTRAINT pk_vehicle_number PRIMARY KEY (report_number, vehicle_number),
    CONSTRAINT fk_report_number_vehicle FOREIGN KEY (report_number) REFERENCES CRASH_EVENT(report_number) 
        ON DELETE CASCADE ON UPDATE CASCADE 
);

DROP TABLE IF EXISTS DRIVER; 
CREATE TABLE DRIVER(
	report_number int NOT NULL, 
	vehicle_number int NOT NULL, 
    person_number int NOT NULL, 
    injury_severity varchar(50) NOT NULL,
	sex char(1) NOT NULL, 
	age int NOT NULL, 
    restraint_systems varchar(100) NOT NULL, 
	CONSTRAINT pk_person PRIMARY KEY (report_number, vehicle_number, person_number),
    CONSTRAINT fk_vehicle_number_driver FOREIGN KEY (report_number, vehicle_number) references VEHICLE(report_number, vehicle_number)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_report_number_driver FOREIGN KEY (report_number) references CRASH_EVENT(report_number)
        ON DELETE CASCADE ON UPDATE CASCADE 
);

SET GLOBAL local_infile=1;

LOAD DATA LOCAL INFILE '/Users/hanshummel/Documents/GitHub/crash_mapper/server/schemas/CrashEvent.csv'
    INTO TABLE `CRASH_EVENT` 
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n' 
    IGNORE 1 LINES
    (report_number, @crash_date_var, @crash_time_var, county, city,
    investigating_agency, on_street, offset_feet, offset_direction, 
    from_intersecting_street, crash_severity, @latitude_var, @longitude_var)
    SET crash_date = STR_TO_DATE(@crash_date_var, '%m/%d/%Y'),
        crash_time = STR_TO_DATE(@crash_time_var, '%h:%i %p'),
        latitude = CAST(@latitude_var as DECIMAL(9, 6)),
        longitude = CAST(@longitude_var as DECIMAL(9, 6));

LOAD DATA LOCAL INFILE '/Users/hanshummel/Documents/GitHub/crash_mapper/server/schemas/Vehicle.csv'
    INTO TABLE `VEHICLE` 
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n' 
    IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '/Users/hanshummel/Documents/GitHub/crash_mapper/server/schemas/Driver.csv'
    INTO TABLE `DRIVER` 
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n' 
    IGNORE 1 ROWS;
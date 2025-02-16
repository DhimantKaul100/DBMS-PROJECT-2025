-- Inserting data into the Disaster table
INSERT INTO Disaster (Disaster_Type, Date, Location, Severity_Level, Description) VALUES
('Earthquake', '2021-02-12', 'Assam', 7, 'Strong earthquake causing structural damage'),
('Flood', '2023-07-20', 'Bihar', 8, 'Monsoon floods affecting several districts'),
('Cyclone', '2020-05-20', 'West Bengal', 9, 'Super Cyclone Amphan causing severe destruction'),
('Landslide', '2023-06-15', 'Himachal Pradesh', 7, 'Landslide due to excessive rain'),
('Heatwave', '2022-05-30', 'Rajasthan', 6, 'Extreme heat with temperatures above 50°C'),
('Drought', '2021-11-10', 'Maharashtra', 6, 'Severe drought affecting agricultural lands'),
('Tsunami', '2004-12-26', 'Tamil Nadu', 9, 'Indian Ocean tsunami causing massive devastation'),
('Industrial Disaster', '1984-12-03', 'Bhopal', 10, 'Bhopal Gas Tragedy - worst industrial disaster'),
('Pandemic', '2020-03-15', 'All India', 10, 'COVID-19 outbreak causing nationwide lockdown'),
('Wildfire', '2023-06-22', 'Uttarakhand', 7, 'Forest fire spreading due to dry climate'),
('Flood', '2019-08-08', 'Kerala', 9, 'Kerala floods causing large-scale displacement'),
('Cyclone', '2021-05-17', 'Odisha', 8, 'Cyclone Yaas hitting coastal areas with heavy rain'),
('Chemical Spill', '2020-05-07', 'Visakhapatnam', 8, 'LG Polymers gas leak affecting hundreds'),
('Nuclear Disaster', '2011-03-11', 'Kudankulam', 6, 'Radiation leakage concerns at Kudankulam plant'),
('Oil Spill', '2017-01-28', 'Chennai', 7, 'Oil spill off Ennore coast affecting marine life'),
('Tornado', '2019-04-14', 'West Bengal', 7, 'Rare tornado caused destruction in rural Bengal'),
('Earthquake', '2023-09-28', 'Delhi NCR', 5, 'Mild earthquake felt across NCR region'),
('Flash Flood', '2023-07-15', 'Uttarakhand', 8, 'Sudden flash flood due to cloudburst in Kedarnath'),
('Landslide', '2023-08-05', 'Darjeeling', 7, 'Heavy landslides blocking highways'),
('Blizzard', '2022-12-10', 'Ladakh', 6, 'Snowstorm causing travel disruptions');

-- Inserting data into the Affected_Area table
INSERT INTO Affected_Area (Disaster_ID, Area_Name, Population_Affected, Damage_Estimation) VALUES
(1, 'Tezpur', 3000, 500000),
(2, 'Patna', 50000, 10000000),
(3, 'Sundarbans', 12000, 25000000),
(4, 'Shimla', 2500, 1500000),
(5, 'Jaipur', 8000, 5000000),
(6, 'Vidarbha', 100000, 20000000),
(7, 'Marina Beach', 50000, 75000000),
(8, 'Old Bhopal', 20000, 30000000),
(9, 'Mumbai', 300000, 100000000),
(10, 'Dehradun', 12000, 5000000);

-- Inserting data into the Rescue_Team table
INSERT INTO Rescue_Team (Team_Name, Specialization, Contact_Number, Status) VALUES
('NDRF Alpha', 'Search and Rescue', '9876543210', 'Active'),
('NDRF Bravo', 'Medical Assistance', '9876543211', 'Active'),
('Indian Army Disaster Response', 'Evacuation & Relief', '9876543212', 'Active'),
('Fire Brigade Mumbai', 'Firefighting', '9876543213', 'Active'),
('NDMA Rapid Response', 'Crisis Management', '9876543214', 'Active'),
('Red Cross India', 'Medical Aid', '9876543215', 'Standby'),
('ISRO Disaster Monitoring', 'Satellite Analysis', '9876543216', 'Active'),
('Greenpeace India', 'Environmental Relief', '9876543217', 'Standby');

-- Inserting data into the Relief_Center table
INSERT INTO Relief_Center (Name, Location, Capacity, Available_Resources) VALUES
('Delhi Disaster Relief Camp', 'Delhi', 500, 'Food, Water, Medical Supplies'),
('Mumbai Flood Relief Shelter', 'Mumbai', 1000, 'Food, Tents, Medical Aid'),
('Odisha Cyclone Relief Center', 'Puri', 800, 'Clothing, Emergency Supplies'),
('Bihar Flood Shelter', 'Patna', 700, 'Drinking Water, Dry Food'),
('Tamil Nadu Tsunami Camp', 'Chennai', 1500, 'Food, Blankets, First Aid'),
('NDRF Medical Base', 'Kolkata', 400, 'Medicines, Oxygen Cylinders, Vaccines');

-- Inserting data into the Volunteer table
INSERT INTO Volunteer (Name, Skills, Contact_Number, Availability) VALUES
('Ramesh Kumar', 'First Aid', '9852613475', TRUE),
('Anita Sharma', 'Logistics', '8562355961', TRUE),
('Arun Das', 'Firefighting', '8859877756', FALSE),
('Meena Iyer', 'Rescue Operations', '9996588236', TRUE),
('Karan Kapoor', 'Medical Assistance', '7853456793', TRUE),
('Sanya Mehta', 'Supply Chain Management', '7785699632', FALSE),
('Vikram Sen', 'Search and Rescue', '9487445122', TRUE),
('Neha Patel', 'Nursing', '9998563214', TRUE);

-- Inserting data into the Volunteer_Rescue_Team table
INSERT INTO Volunteer_Rescue_Team (Volunteer_ID, Team_ID) VALUES
(1, 6),
(2, 7),
(3, 8),
(4, 1),
(5, 4),
(6, 3),
(7, 5),
(8, 2);

-- Inserting data into the Disaster_Assigned_Teams table
INSERT INTO Disaster_Assigned_Teams (Disaster_ID, Team_ID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 1),
(10, 2);

-- Inserting data into the Victim table
INSERT INTO Victim (Name, Age, Gender, Contact_Details, Status, Disaster_ID, Relief_Center_ID) VALUES
('Amit Verma', 35, 'Male', 'amitv@gmail.com', 'Rescued', 1, 1),
('Rohini Desai', 29, 'Female', 'desai.rohini@gmail.com', 'Missing', 2, 2),
('Suresh Gupta', 42, 'Male', 'suresh1983@gmail.com', 'Injured', 3, 3),
('Pooja Sharma', 25, 'Female', 'pooja.sharma@outlook.com', 'Safe', 4, 4),
('Rajiv Mehta', 38, 'Male', 'Rajiv.mehtaa@gmail.com', 'Deceased', 5, 5),
('Neetu Patel', 30, 'Female', 'neetuPatel02@outlook.com', 'Safe', 6, 6),
('Deepak Malhotra', 45, 'Male', 'deepak1981@outlook.com', 'Rescued', 7, 1);

-- Inserting data into the Donation table
INSERT INTO Donation (Donor_Name, Amount, Date, Purpose, Relief_Center_ID) VALUES
('Tata Trusts', 1000000, '2023-06-01', 'Food Supplies', 1),
('Reliance Foundation', 500000, '2023-07-15', 'Medical Aid', 2),
('Wipro Cares', 200000, '2023-08-05', 'Shelter Support', 3),
('HDFC CSR Initiative', 300000, '2023-09-10', 'Education & Rehabilitation', 4),
('Infosys Foundation', 400000, '2023-10-20', 'Healthcare Support', 5);

-- Inserting data into the Government_Agency table
INSERT INTO Government_Agency (Agency_Name, Contact_Number, Responsibilities) VALUES
('National Disaster Management Authority (NDMA)', '011-23438096', 'Disaster planning and response'),
('National Disaster Response Force (NDRF)', '011-26107953', 'Rescue and relief operations'),
('Indian Meteorological Department (IMD)', '011-24619945', 'Weather forecasting and disaster alerts'),
('Ministry of Home Affairs', '011-23094061', 'National disaster coordination'),
('Indian Red Cross Society', '011-23711551', 'Emergency medical support');

-- Inserting data into the Gov_Managed_Teams table
INSERT INTO Gov_Managed_Teams (Agency_ID, Team_ID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

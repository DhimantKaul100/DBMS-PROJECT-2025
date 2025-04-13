-- Inserting data into the Disaster table
INSERT INTO Disaster (Disaster_Type, Date, Location, Severity_Level, Description, Status)
VALUES
('Earthquake', '2024-02-15', 'Delhi', 7, 'Strong tremors felt across the capital city.', 'Not Ongoing'),
('Flood', '2025-04-12', 'Mumbai', 8, 'Severe monsoon rains leading to waterlogging.', 'Ongoing'),
('Cyclone', '2023-10-05', 'Odisha', 9, 'Category 4 cyclone causing coastal damage.', 'Not Ongoing'),
('Heatwave', '2024-05-20', 'Ahmedabad', 6, 'Extreme temperatures affecting the city.', 'Not Ongoing'),
('Landslide', '2025-03-15', 'Darjeeling', 5, 'Heavy rainfall leading to soil erosion.', 'Ongoing'),
('Tsunami', '2024-11-25', 'Chennai', 10, 'Tsunami triggered by an undersea earthquake.', 'Not Ongoing'),
('Wildfire', '2023-03-22', 'Bandipur', 7, 'Forest fires spreading due to dry weather.', 'Not Ongoing'),
('Drought', '2025-04-10', 'Rajasthan', 6, 'Severe water scarcity across villages.', 'Ongoing'),
('Blizzard', '2023-12-19', 'Leh', 4, 'Heavy snowfall causing transport disruptions.', 'Not Ongoing'),
('Earthquake', '2025-04-20', 'Gangtok', 6, 'Moderate earthquake shaking the region.', 'Ongoing'),
('Cyclone', '2023-09-20', 'West Bengal', 8, 'High-speed winds and flooding in Kolkata.', 'Not Ongoing'),
('Flood', '2023-06-30', 'Patna', 7, 'Overflow of river Ganga affecting Bihar.', 'Not Ongoing'),
('Heatwave', '2023-04-15', 'Nagpur', 5, 'Temperatures soaring above 45°C.', 'Not Ongoing'),
('Landslide', '2023-07-18', 'Shillong', 6, 'Landslides blocking roads in Meghalaya.', 'Not Ongoing'),
('Tsunami', '2022-11-10', 'Andaman & Nicobar', 9, 'Massive waves hitting the islands.', 'Not Ongoing'),
('Wildfire', '2023-02-25', 'Wayanad', 6, 'Forest fires damaging the ecosystem.', 'Not Ongoing'),
('Drought', '2023-03-14', 'Madhya Pradesh', 5, 'Water sources drying up in rural areas.', 'Ongoing'),
('Blizzard', '2025-04-29', 'Manali', 4, 'Snowfall causing travel disruptions.', 'Ongoing'),
('Earthquake', '2023-05-12', 'Shimla', 7, 'Strong tremors causing panic.', 'Not Ongoing'),
('Flood', '2023-07-10', 'Kochi', 6, 'Heavy rains leading to urban flooding.', 'Not Ongoing');


-- Inserting data into the Affected_Area table
INSERT INTO Affected_Area (Disaster_ID, Area_Name, Population_Affected, Damage_Estimation)
VALUES
(1, 'Central Delhi', 50000, 2000000),
(1, 'South Delhi', 30000, 1500000),

(2, 'Andheri', 200000, 5000000),
(2, 'Bandra', 150000, 4000000),
(2, 'Dharavi', 100000, 3000000),

(3, 'Puri', 120000, 8000000),
(3, 'Bhubaneswar', 100000, 7000000),
(3, 'Cuttack', 80000, 6000000),

(4, 'Ahmedabad City', 250000, 3000000),
(4, 'Gandhinagar', 100000, 2000000),

(5, 'Darjeeling Town', 20000, 1000000),
(5, 'Kalimpong', 15000, 800000),

(6, 'Marina Beach', 300000, 10000000),
(6, 'Besant Nagar', 200000, 8000000),
(6, 'Kottivakkam', 100000, 6000000),

(7, 'Bandipur National Park', 50000, 4000000),
(7, 'Gundlupet', 30000, 2500000),

(8, 'Jaisalmer', 500000, 7000000),
(8, 'Barmer', 400000, 6000000),

(9, 'Leh City', 15000, 2000000),
(9, 'Kargil', 10000, 1500000),

(10, 'Gangtok City', 30000, 2500000),
(10, 'Mangan', 20000, 1500000),

(11, 'Kolkata', 200000, 7000000),
(11, 'Sundarbans', 150000, 6000000),

(12, 'Patna City', 180000, 5000000),
(12, 'Danapur', 120000, 4000000),

(13, 'Nagpur City', 150000, 2500000),

(14, 'Shillong City', 50000, 2000000),

(15, 'Port Blair', 100000, 8000000),
(15, 'Havelock Island', 50000, 6000000),

(16, 'Wayanad Forest', 40000, 3000000),

(17, 'Bhopal', 250000, 5000000),
(17, 'Indore', 200000, 4000000),

(18, 'Manali Town', 10000, 1500000),
(18, 'Solang Valley', 5000, 800000),

(19, 'Shimla City', 50000, 3000000),
(19, 'Chail', 25000, 2000000),

(20, 'Ernakulam', 80000, 5000000),
(20, 'Aluva', 60000, 4000000);

-- Inserting data into the Rescue_Team table
INSERT INTO Rescue_Team (Team_Name, Specialization, Contact_Number, Status)
VALUES
('Rapid Response Squad', 'Earthquake Rescue & Evacuation', '123-456-7890', 'Active'),
('Flood Relief Force', 'Flood & Water Rescue Operations', '987-654-3210', 'Active'),
('Tsunami Rescue Corps', 'Coastal Evacuations & Aid Distribution', '333-222-1111', 'Active'),
('Blizzard Response Team', 'Snow Removal & Hypothermia Treatment', '222-333-4444', 'Active'),
('Drought Relief Task Force', 'Water Distribution & Medical Assistance', '999-777-5555', 'Active'),
('First Responders Unit', 'First Aid & Emergency Transport', '111-555-8888', 'Active'),
('Hazardous Materials Team', 'Chemical & Gas Leak Disasters', '333-777-5555', 'Active'),

('Wildfire Containment Unit', 'Firefighting & Evacuation', '555-123-4567', 'Standby'),
('Landslide Recovery Squad', 'Debris Removal & Victim Extraction', '666-999-0000', 'Standby'),
('Structural Safety Inspectors', 'Building Inspections & Damage Assessments', '555-666-7777', 'Standby'),
('Mountain Rescue Team', 'High Altitude Rescues & Snowy Terrain', '444-777-8888', 'Standby'),
('Heavy Machinery Recovery Crew', 'Clearing Debris & Infrastructure Recovery', '666-333-9999', 'Standby'),
('Animal Rescue and Welfare', 'Rescue & Care for Affected Animals', '999-111-2222', 'Standby'),
('Communication and Coordination', 'Disaster Response Planning & Communication', '555-222-4444', 'Standby');


-- Inserting data into the Relief_Center table
INSERT INTO Relief_Center (Name, Location, Capacity, Available_Resources)
VALUES
('Delhi Relief Hub', 'Delhi, India', 5000, 'Food, Water, Medical Aid'),
('Mumbai Relief Shelter', 'Mumbai, India', 10000, 'Food, Medicine, Clothing'),
('Chennai Coastal Relief Center', 'Chennai, India', 7000, 'Tents, Medicine, Food'),
('Odisha Cyclone Shelter', 'Puri, Odisha, India', 6000, 'Food, Water, Power Generators'),
('Bihar Flood Relief Camp', 'Patna, Bihar, India', 8000, 'Drinking Water, Dry Rations, Medicines'),
('Leh Snowstorm Aid Center', 'Leh, India', 3000, 'Blankets, Fuel, Food Supplies'),
('Madhya Pradesh Drought Camp', 'Bhopal, India', 5000, 'Water, Medical Aid, Food'),
('Kochi Flood Shelter', 'Kochi, Kerala, India', 7000, 'Food, Clean Water, Clothes');


-- Inserting data into the Volunteer table
INSERT INTO Volunteer (Name, Skills, Contact_Number, Availability)
VALUES
('Rajesh Kumar', 'Medical Assistance', '999-111-2222', TRUE),
('Anita Sharma', 'Search and Rescue', '888-222-3333', TRUE),
('Vikram Singh', 'Logistics', '777-333-5555', TRUE),
('Meera Nair', 'Psychological Support', '666-444-7777', FALSE),
('Amit Gupta', 'Sanitation Management', '555-666-8888', TRUE),
('Priya Verma', 'Food Distribution', '444-777-9999', FALSE),
('Arjun Patel', 'Heavy Machinery Operations', '333-888-1111', TRUE),
('Sunita Joshi', 'CPR Training', '222-555-6666', TRUE),
('Karthik Iyer', 'Communication Management', '111-999-0000', FALSE),
('Neha Kapoor', 'Childcare', '999-444-7777', TRUE),
('Sandeep Malhotra', 'Disaster Logistics', '777-999-2222', TRUE),
('Ritu Desai', 'Emergency Medical Response', '666-222-1111', TRUE),
('Pavan Reddy', 'Animal Rescue', '555-777-4444', FALSE),
('Alok Mishra', 'Firefighting Support', '888-555-6666', TRUE),
('Swati Mehta', 'Relief Distribution', '222-111-8888', TRUE);


-- Inserting data into the Volunteer_Rescue_Team table
INSERT INTO Volunteer_Rescue_Team (Volunteer_ID, Team_ID)
VALUES
(1, 6),  
(3, 6),  
(2, 1),  
(10, 1), 
(3, 7),  
(8, 7),  
(11, 5), 
(5, 5),  
(7, 3),  
(5, 2),  
(10, 4);  


-- Inserting data into the Disaster_Assigned_Teams table
INSERT INTO Disaster_Assigned_Teams (Disaster_ID, Team_ID)
VALUES
(2,2), (2,3),
(5,1), (5,7),
(8, 5), (8, 6),  
(10,1), (10,6),
(17, 5),  (17, 6), 
(18, 4), (18, 6); 


-- Inserting data into the Victim table
INSERT INTO Victim (Name, Age, Gender, Contact_Details, Status, Disaster_ID, Relief_Center_ID)
VALUES
('Ramesh Patnaik', 45, 'Male', '999-123-4567', 'Rescued', 1, 4),
('Anita Mishra', 30, 'Female', '888-321-6549', 'Safe', 1, 4),
('Sunil Rao', 52, 'Male', NULL, 'Deceased', 1, NULL),
('Meena Sharma', 40, 'Female', NULL, 'Missing', 1, NULL),
('Ravi Verma', 28, 'Male', '777-222-3333', 'Injured', 1, 4),
('Neha Gupta', 35, 'Female', '999-555-1234', 'Safe', 2, 5),
('Rahul Sharma', 42, 'Male', '888-777-4444', 'Rescued', 2, 5),
('Priya Khandelwal', 27, 'Female', NULL, 'Missing', 2, NULL),
('Suresh Pandey', 50, 'Male', '777-999-6666', 'Injured', 2, 5),
('Amit Malhotra', 38, 'Male', '999-888-7777', 'Safe', 3, 1),
('Kavita Singh', 29, 'Female', '777-666-5555', 'Rescued', 3, 1),
('Vikas Joshi', 31, 'Male', NULL, 'Deceased', 3, NULL),
('Simran Kaur', 22, 'Female', '555-444-3333', 'Injured', 3, 1),
('Rohan Kapoor', 40, 'Male', '666-555-4444', 'Safe', 4, 2),
('Meera Nair', 37, 'Female', '444-333-2222', 'Rescued', 4, 2),
('Ashok Pillai', 55, 'Male', NULL, 'Deceased', 4, NULL),
('Sneha Reddy', 34, 'Female', NULL, 'Missing', 4, NULL),
('Vikram Iyer', 41, 'Male', '222-111-0000', 'Rescued', 5, 3),
('Sonia Narayan', 29, 'Female', '333-222-1111', 'Safe', 5, 3),
('Karan Bhatia', 39, 'Male', NULL, 'Deceased', 5, NULL),
('Pooja Deshmukh', 27, 'Female', NULL, 'Missing', 5, NULL),
('Arjun Menon', 26, 'Male', '111-999-8888', 'Injured', 5, 3);


-- Inserting data into the Donation table
INSERT INTO Donation (Donor_Name, Amount, Date, Purpose, Relief_Center_ID)
VALUES
-- Individual Donors
('Amit Patel', 5000, '2025-03-15', 'Food and Water Supply', 1),
('Neha Sharma', 10000, '2025-03-16', 'Medical Aid', 2),
('Rahul Verma', 7500, '2025-03-17', 'Shelter Support', 7),
('Kavita Nair', 6000, '2025-03-18', 'Clothing and Essentials', 6),
('Vikram Iyer', 12000, '2025-03-19', 'Emergency Relief Fund', 5),

-- Corporate Donations
('Tata Foundation', 500000, '2025-03-20', 'Infrastructure Repair', 1),
('Reliance CSR', 750000, '2025-03-21', 'Medical Equipment', 2),
('Infosys Foundation', 300000, '2025-03-22', 'Food and Essentials', 3),
('HDFC Bank CSR', 450000, '2025-03-23', 'Disaster Recovery Efforts', NULL),
('Mahindra Group', 200000, '2025-03-24', 'Temporary Shelters', 4),

-- NGO Contributions
('Red Cross India', 100000, '2025-03-25', 'Rescue Operations', 5),
('Save The Children', 80000, '2025-03-26', 'Childcare and Protection', 1),
('UNICEF India', 150000, '2025-03-27', 'Medical Supplies', NULL),
('Goonj NGO', 90000, '2025-03-28', 'Clothing and Hygiene Kits', 2),
('Akshaya Patra', 110000, '2025-03-29', 'Mass Food Distribution', 3);


-- Inserting data into the Government_Agency table
INSERT INTO Government_Agency (Agency_Name, Contact_Number, Responsibilities)
VALUES
-- National Disaster Management Agencies
('National Disaster Response Force (NDRF)', '011-23456789', 'Disaster Response and Rescue Operations'),
('Indian Meteorological Department (IMD)', '011-12345678', 'Weather Forecasting and Early Warnings'),
('Central Water Commission (CWC)', '011-87654321', 'Flood Monitoring and Water Management'),

-- State Disaster Management Agencies
('Odisha State Disaster Management Authority', '0674-1112223', 'Cyclone and Flood Response'),
('Bihar State Disaster Management Authority', '0612-3334445', 'Flood and Earthquake Response'),
('Delhi Disaster Management Authority', '011-5556667', 'Urban Disaster and Earthquake Preparedness'),
('Himachal Pradesh Disaster Management Cell', '0177-7778889', 'Landslide and Snow Avalanche Response'),
('Tamil Nadu State Disaster Management Authority', '044-9998887', 'Tsunami and Cyclone Preparedness'),

-- Specialized Agencies
('National Institute of Disaster Management (NIDM)', '011-2223334', 'Training and Capacity Building for Disaster Response'),
('Geological Survey of India (GSI)', '033-4445556', 'Earthquake and Landslide Monitoring'),
('Indian Red Cross Society', '011-6667778', 'Medical Aid and Blood Donation During Disasters'),
('State Fire and Emergency Services', '1800-112233', 'Fire and Emergency Rescue Operations'),
('Forest Survey of India (FSI)', '0135-8889990', 'Forest Fire and Environmental Disaster Response'),

-- Law Enforcement & Defense
('Indian Army - Disaster Relief Division', '011-9990001', 'Rescue and Relief Operations in Disaster Zones'),
('Indian Air Force - Disaster Relief Unit', '011-8887772', 'Air Evacuation and Relief Material Transport');


-- Inserting data into the Gov_Managed_Teams table
INSERT INTO Gov_Managed_Teams (Agency_ID, Team_ID)
VALUES
(1, 1),  (1, 2),  (1, 6),  
(2, 4), (2, 5), 
(3, 2), 
(4, 1), 
(5, 2), 
(6, 3), 
(7, 4), 
(8, 3), 
(9, 6), (9, 7), 
(10, 3), 
(11, 6), (11, 7), 
(12, 7), 
(14, 1), 
(14, 2), 
(14, 3); 


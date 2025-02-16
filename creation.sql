-- Create Disaster table
CREATE TABLE Disaster (
    Disaster_ID SERIAL PRIMARY KEY,
    Disaster_Type VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Location TEXT NOT NULL,
    Severity_Level INT CHECK (Severity_Level BETWEEN 1 AND 10),
    Description TEXT
);

-- Create Affected_Area table
CREATE TABLE Affected_Area (
    Disaster_ID INT REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE,
    Area_Name VARCHAR(255) NOT NULL,
    Population_Affected INT CHECK (Population_Affected >= 0),
    Damage_Estimation NUMERIC CHECK (Damage_Estimation >= 0),
    PRIMARY KEY (Disaster_ID, Area_Name)
);

-- Create Rescue_Team table
CREATE TABLE Rescue_Team (
    Team_ID SERIAL PRIMARY KEY,
    Team_Name VARCHAR(100) NOT NULL,
    Specialization TEXT NOT NULL,
    Contact_Number VARCHAR(15) NOT NULL,
    Status VARCHAR(50) CHECK (Status IN ('Active', 'Standby'))
);

-- Create Volunteer table
CREATE TABLE Volunteer (
    Volunteer_ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Skills TEXT NOT NULL,
    Contact_Number VARCHAR(15) NOT NULL,
    Availability BOOLEAN NOT NULL
);

-- Create Volunteer_Rescue_Team junction table
CREATE TABLE Volunteer_Rescue_Team (
    Volunteer_ID INT REFERENCES Volunteer(Volunteer_ID) ON DELETE CASCADE,
    Team_ID INT REFERENCES Rescue_Team(Team_ID) ON DELETE CASCADE,
    PRIMARY KEY (Volunteer_ID, Team_ID)
);

-- Create Disaster_Assigned_Teams table
CREATE TABLE Disaster_Assigned_Teams (
    Disaster_ID INT REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE,
    Team_ID INT REFERENCES Rescue_Team(Team_ID) ON DELETE CASCADE,
    PRIMARY KEY (Disaster_ID, Team_ID)
);

-- Create Relief_Center table
CREATE TABLE Relief_Center (
    Relief_Center_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Location TEXT NOT NULL,
    Capacity INT CHECK (Capacity > 0),
    Available_Resources TEXT
);
-- Create Victim table
CREATE TABLE Victim (
    Victim_ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 0),
    Gender VARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other')),
    Contact_Details TEXT,
    Status VARCHAR(50) CHECK (Status IN ('Rescued', 'Missing', 'Deceased','Safe','Injured')),
    Disaster_ID INT REFERENCES Disaster(Disaster_ID) ON DELETE SET NULL,
    Relief_Center_ID INT REFERENCES Relief_Center(Relief_Center_ID) ON DELETE SET NULL
);


-- Create Donation table
CREATE TABLE Donation (
    Donation_ID SERIAL PRIMARY KEY,
    Donor_Name VARCHAR(255) NOT NULL,
    Amount NUMERIC CHECK (Amount > 0),
    Date DATE NOT NULL,
    Purpose TEXT NOT NULL,
    Relief_Center_ID INT REFERENCES Relief_Center(Relief_Center_ID) ON DELETE SET NULL
);

-- Create Government_Agency table
CREATE TABLE Government_Agency (
    Agency_ID SERIAL PRIMARY KEY,
    Agency_Name VARCHAR(255) NOT NULL,
    Contact_Number VARCHAR(15) NOT NULL,
    Responsibilities TEXT
);

-- Create Gov_Managed_Teams junction table
CREATE TABLE Gov_Managed_Teams (
    Agency_ID INT REFERENCES Government_Agency(Agency_ID) ON DELETE CASCADE,
    Team_ID INT REFERENCES Rescue_Team(Team_ID) ON DELETE CASCADE,
    PRIMARY KEY (Agency_ID, Team_ID)
);

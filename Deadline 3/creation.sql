-- Create Disaster table
CREATE TABLE Disaster (
    Disaster_ID SERIAL PRIMARY KEY,
    Disaster_Type VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Location TEXT NOT NULL,
    Severity_Level INT CHECK (Severity_Level BETWEEN 1 AND 10),
    Description TEXT,
    Status VARCHAR(20) CHECK (Status IN ('Ongoing', 'Not Ongoing')) NOT NULL
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

-- Create the junction table to associate volunteers with rescue teams
CREATE TABLE Volunteer_Rescue_Team (
    Volunteer_ID INT REFERENCES Volunteer(Volunteer_ID) ON DELETE CASCADE,
    Team_ID INT REFERENCES Rescue_Team(Team_ID) ON DELETE CASCADE,
    PRIMARY KEY (Volunteer_ID, Team_ID)
);

-- Create a trigger function to enforce that only available volunteers can be assigned
CREATE OR REPLACE FUNCTION check_volunteer_availability()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure volunteer is available before inserting into Volunteer_Rescue_Team
    IF NOT EXISTS (
        SELECT 1 FROM Volunteer WHERE Volunteer_ID = NEW.Volunteer_ID AND Availability = TRUE
    ) THEN
        RAISE EXCEPTION 'Cannot assign a non-available volunteer to a rescue team';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to Volunteer_Rescue_Team
CREATE TRIGGER enforce_available_volunteers
BEFORE INSERT ON Volunteer_Rescue_Team
FOR EACH ROW
EXECUTE FUNCTION check_volunteer_availability();



-- Create Disaster_Assigned_Teams table
CREATE TABLE Disaster_Assigned_Teams (
    Disaster_ID INT REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE,
    Team_ID INT REFERENCES Rescue_Team(Team_ID) ON DELETE CASCADE,
    PRIMARY KEY (Disaster_ID, Team_ID)
);

-- Create a trigger function to enforce that only ongoing disasters and active teams are assigned
CREATE OR REPLACE FUNCTION check_disaster_and_team_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure the disaster is ongoing
    IF NOT EXISTS (
        SELECT 1 FROM Disaster WHERE Disaster_ID = NEW.Disaster_ID AND Status = 'Ongoing'
    ) THEN
        RAISE EXCEPTION 'Cannot assign teams to a disaster that is not ongoing';
    END IF;

    -- Ensure the team is active (not standby)
    IF NOT EXISTS (
        SELECT 1 FROM Rescue_Team WHERE Team_ID = NEW.Team_ID AND Status = 'Active'
    ) THEN
        RAISE EXCEPTION 'Cannot assign a standby rescue team to a disaster';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to Disaster_Assigned_Teams
CREATE TRIGGER enforce_disaster_and_team_status
BEFORE INSERT ON Disaster_Assigned_Teams
FOR EACH ROW
EXECUTE FUNCTION check_disaster_and_team_status();



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
    Status VARCHAR(50) CHECK (Status IN ('Rescued', 'Safe', 'Injured', 'Missing', 'Deceased')),
    Disaster_ID INT REFERENCES Disaster(Disaster_ID) ON DELETE SET NULL,
    Relief_Center_ID INT REFERENCES Relief_Center(Relief_Center_ID) ON DELETE SET NULL,
    CHECK (Status NOT IN ('Deceased', 'Missing') OR Relief_Center_ID IS NULL)
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

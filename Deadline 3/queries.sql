-- 1) Find all the volunteers in the rescue teams that are currently active.
SELECT DISTINCT v.volunteer_id, v.name 
 FROM volunteer as v ,rescue_team as r, volunteer_rescue_team as vr 
 WHERE r.status='Active' and v.volunteer_id=vr.volunteer_id and vr.team_id=r.team_id
ORDER by v.volunteer_id;

-- 2) Find all the disasters and their locations that happened before the year 2024.

SELECT disaster_type,location,date
  FROM disaster where date<'2024-01-01';

-- 3) Find the available capacity of each relief center.

SELECT r.relief_center_id, r.name, r.location, r.capacity - COALESCE(COUNT(v.relief_center_id), 0) AS available_capacity
  FROM relief_center AS r
  LEFT JOIN victim AS v ON r.relief_center_id = v.relief_center_id
  GROUP BY r.relief_center_id, r.name, r.location, r.capacity ORDER by r.relief_center_id;

-- 4) Return the number of people that are still missing from each disaster affected area in ascending order.

SELECT d.disaster_id, d.disaster_type, a.area_name, 
COUNT(v.victim_id) AS missing_victims
FROM disaster AS d LEFT JOIN affected_area AS a ON d.disaster_id = a.disaster_id JOIN victim AS v ON d.disaster_id = v.disaster_id
WHERE v.status='Missing'
GROUP BY d.disaster_id, d.disaster_type, a.area_name
ORDER BY d.disaster_id;

-- 5)Find all the teams that are currently working in the following areas - Manali, Mumbai, Gangtok.

SELECT r.team_id,team_name,specialization,location from rescue_team as r, disaster as d, disaster_assigned_teams as da
WHERE r.team_id=da.team_id and da.disaster_id=d.disaster_id and d.location IN ('Mumbai', 'Manali', 'Gangtok');

-- 6) Find the names of relief centers that have received donations from donors who have contributed more than 10,000 in total.
SELECT rc.Name
FROM Relief_Center rc
WHERE rc.Relief_Center_ID IN (
    SELECT d.Relief_Center_ID
    FROM Donation d
    WHERE d.Donor_Name IN (
        SELECT Donor_Name
        FROM Donation
        GROUP BY Donor_Name
        HAVING SUM(Amount) > 10000
    )
);

-- 7) Find the names of volunteers who are part of more than one rescue team.
SELECT v.Name
FROM Volunteer v
JOIN (
    SELECT Volunteer_ID
    FROM Volunteer_Rescue_Team
    GROUP BY Volunteer_ID
    HAVING COUNT(Team_ID) > 1
) AS multi_team_volunteers ON v.Volunteer_ID = multi_team_volunteers.Volunteer_ID;

-- 8) Calculate the total donations received by each relief center and display the relief center name along with the total donation amount.
SELECT rc.Name AS Relief_Center_Name, SUM(d.Amount) AS Total_Donations
FROM Relief_Center rc
JOIN Donation d ON rc.Relief_Center_ID = d.Relief_Center_ID
GROUP BY rc.Name;

-- 9) Find the information about ongoing disasters, including the disaster type, date, location, and the rescue teams assigned to them along with their specializations.
SELECT d.Disaster_Type, d.Date, d.Location, rt.Team_Name, rt.Specialization
FROM Disaster d
JOIN Disaster_Assigned_Teams dat ON d.Disaster_ID = dat.Disaster_ID
JOIN Rescue_Team rt ON dat.Team_ID = rt.Team_ID
WHERE d.Status = 'Ongoing';

-- 10) Calculate the total number of victims and the total damage estimation for each disaster type.
SELECT d.Disaster_Type, 
       COUNT(v.Victim_ID) AS Total_Victims, 
       SUM(aa.Damage_Estimation) AS Total_Damage
FROM Disaster d
LEFT JOIN Victim v ON d.Disaster_ID = v.Disaster_ID
LEFT JOIN Affected_Area aa ON d.Disaster_ID = aa.Disaster_ID
GROUP BY d.Disaster_Type;
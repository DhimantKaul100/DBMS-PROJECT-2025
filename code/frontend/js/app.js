// app.js

// Handle form submissions for each section (disasters, rescue teams, volunteers, etc.)
document.addEventListener('DOMContentLoaded', function () {
    // Disaster Form
    const disasterForm = document.getElementById('disasterForm');
    if (disasterForm) {
        disasterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const disasterType = disasterForm.querySelector('input[type="text"]').value;
            const disasterDate = disasterForm.querySelector('input[type="date"]').value;
            const disasterLocation = disasterForm.querySelector('input[type="text"]:nth-child(3)').value;
            const severity = disasterForm.querySelector('input[type="number"]').value;
            const description = disasterForm.querySelector('textarea').value;
            const status = disasterForm.querySelector('select').value;

            // Process the form data (e.g., send to the server or add it to a list)
            console.log('Disaster Added:', disasterType, disasterDate, disasterLocation, severity, description, status);

            // Reset the form after submission
            disasterForm.reset();
        });
    }

    // Rescue Team Form
    const teamForm = document.getElementById('teamForm');
    if (teamForm) {
        teamForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const teamName = teamForm.querySelector('input[type="text"]').value;
            const specialization = teamForm.querySelector('input[type="text"]:nth-child(2)').value;
            const contact = teamForm.querySelector('input[type="text"]:nth-child(3)').value;
            const status = teamForm.querySelector('select').value;

            // Process the form data
            console.log('Rescue Team Added:', teamName, specialization, contact, status);

            // Reset the form after submission
            teamForm.reset();
        });
    }

    // Volunteer Form
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const volunteerName = volunteerForm.querySelector('input[type="text"]').value;
            const skills = volunteerForm.querySelector('input[type="text"]:nth-child(2)').value;
            const contact = volunteerForm.querySelector('input[type="text"]:nth-child(3)').value;
            const availability = volunteerForm.querySelector('input[type="checkbox"]').checked;

            // Process the form data
            console.log('Volunteer Added:', volunteerName, skills, contact, availability ? 'Available' : 'Not Available');

            // Reset the form after submission
            volunteerForm.reset();
        });
    }

    // Victim Form
    const victimForm = document.getElementById('victimForm');
    if (victimForm) {
        victimForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const victimName = victimForm.querySelector('input[type="text"]').value;
            const age = victimForm.querySelector('input[type="number"]').value;
            const gender = victimForm.querySelector('select').value;
            const contact = victimForm.querySelector('input[type="text"]:nth-child(4)').value;
            const status = victimForm.querySelector('select:nth-of-type(2)').value;
            const disasterId = victimForm.querySelector('input[type="number"]:nth-of-type(3)').value;
            const reliefCenterId = victimForm.querySelector('input[type="number"]:nth-of-type(4)').value;

            // Process the form data
            console.log('Victim Added:', victimName, age, gender, contact, status, disasterId, reliefCenterId);

            // Reset the form after submission
            victimForm.reset();
        });
    }

    // Relief Center Form
    const centerForm = document.getElementById('centerForm');
    if (centerForm) {
        centerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const centerName = centerForm.querySelector('input[type="text"]').value;
            const location = centerForm.querySelector('input[type="text"]:nth-child(2)').value;
            const contact = centerForm.querySelector('input[type="text"]:nth-child(3)').value;

            // Process the form data
            console.log('Relief Center Added:', centerName, location, contact);

            // Reset the form after submission
            centerForm.reset();
        });
    }

    // Donation Form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const donorName = donationForm.querySelector('input[type="text"]').value;
            const amount = donationForm.querySelector('input[type="number"]').value;
            const message = donationForm.querySelector('textarea').value;

            // Process the form data
            console.log('Donation Added:', donorName, amount, message);

            // Reset the form after submission
            donationForm.reset();
        });
    }

    // Example of a dynamic update or interaction
    const disasterList = []; // Array to store disasters, for example
    const rescueTeamList = []; // Array to store rescue teams, for example
    const volunteerList = []; // Array to store volunteers, for example

    // You can display the disaster list dynamically
    function displayDisasters() {
        const disasterContainer = document.getElementById('disastersContainer');
        disasterContainer.innerHTML = ''; // Clear previous list
        disasterList.forEach(disaster => {
            const disasterItem = document.createElement('div');
            disasterItem.classList.add('disaster-item');
            disasterItem.innerHTML = `<p>${disaster.name} - ${disaster.location}</p>`;
            disasterContainer.appendChild(disasterItem);
        });
    }
});

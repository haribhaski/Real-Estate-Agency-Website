function getUrlParameter(name){
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get property details from URL parameters
var propertyId = getUrlParameter('propertyId');
var propertyName = getUrlParameter('propertyName');
var propertyAddress = getUrlParameter('propertyAddress');
var propertyArea = getUrlParameter('propertyArea');
var Carpetarea = getUrlParameter('CarpetArea');
var Price = getUrlParameter('Price');
var furnishing = getUrlParameter('Furnishing');
var SuperBuiltUpArea = getUrlParameter('SuperBuiltUpArea');
var Type = getUrlParameter('Type');
var BHK = getUrlParameter('BHK');
var DF = getUrlParameter('DF');
var Bathno = getUrlParameter('BR');
var Lift = getUrlParameter('Lift');
var Park = getUrlParameter('Park');
var Club = getUrlParameter('Club');
var Parking = getUrlParameter('Pkng');
var PowerBackup = getUrlParameter('PB');

// Display property details
var propertyDetailsElement = document.getElementById('property-details');
propertyDetailsElement.innerHTML = `
    <p class="pname"> ${propertyName}</p>
    <h1 class="Name">-Property Details</h1>
    <p><strong>Address:</strong> ${propertyAddress}</p>
    <p><strong>Locality:</strong> ${propertyArea}</p>
    <p><strong>Type:</strong> ${Type}</p>
    <p><strong>BHK:</strong> ${BHK}</p>
    <p><strong>Super Built Up area:</strong> ${SuperBuiltUpArea} Sqft</p>
    <p><strong>Carpet Area:</strong> ${Carpetarea} Sqft</p>
    <p><strong>Price:</strong> ${Price} INR</p>
    <p><strong>Furnishing:</strong> ${furnishing}</p>
    <p><strong>Door Facing:</strong> ${DF}</p>
    <p class="FA">Facilities Available</p>
`;

var features = [
    { name: 'Lift', value: Lift },
    { name: 'Park', value: Park },
    { name: 'Club', value: Club },
    { name: 'Parking', value: Parking },
    { name: 'Power Backup', value: PowerBackup }
];

var facility = {};

function Facilityvalidate(){
    var facilityContainer = document.getElementById("property-details");
    for (let i = 0; i < features.length; i++) {
        if (features[i].value.toUpperCase() === 'YES') {
            var featureName = features[i].name;
            var featureElement = document.createElement('p');
            featureElement.textContent = featureName;
            facilityContainer.appendChild(featureElement);
        }
    }
}
Facilityvalidate()


function submitForm(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();

    // Validate name
    if (name === '') {
        alert('Name is required.');
        return false;
    }

    // Validate email
    var emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    if (email === '') {
        alert('Email is required.');
        return false;
    } else if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate phone number
    var phonePattern = /^\d{10}$/;
    if (phone === '') {
        alert('Phone number is required.');
        return false;
    } else if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    // If all validations pass, redirect to another page
    window.location.href = 'properties.html'; // Replace 'success.html' with the URL of the page you want to redirect to
}

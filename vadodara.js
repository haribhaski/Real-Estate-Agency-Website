var propertyData = [];
var excelFileUrl = 'Properties/Vadodara.xlsx';

// Fetch the Excel file and initialize property data
fetch(excelFileUrl)
    .then(response => response.arrayBuffer())
    .then(data => {
        var workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];
        propertyData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        renderPropertyListings(propertyData);
    })
    .catch(error => console.error('Error fetching Excel file:', error));

function renderPropertyListings(data) {
    var propertyListingSection = document.querySelector('.property-listing');

    // Clear existing listings
    propertyListingSection.innerHTML = '';

    if (data.length === 0) {
        var noPropertiesMessage = document.createElement('p');
        noPropertiesMessage.textContent = 'No properties found in filter.';
        propertyListingSection.appendChild(noPropertiesMessage);
    } else {
        data.forEach(function (row) {
            var listingElement = document.createElement('div');
            listingElement.classList.add('property-listing-item');
            listingElement.innerHTML = `
            <a style="text-decoration: none; color: black; font-size: 30px; padding: 5px 0px;" href="listing.html?propertyId=${row[0]}&propertyName=${encodeURIComponent(row[1])}&propertyAddress=${encodeURIComponent(row[2])}&propertyArea=${encodeURIComponent(row[3])}&CarpetArea=${encodeURIComponent(row[7])}&SuperBuiltUpArea=${encodeURIComponent(row[6])}&Price=${encodeURIComponent(row[8])}&Furnishing=${encodeURIComponent(row[9])}&Type=${encodeURIComponent(row[5])}&BHK=${encodeURIComponent(row[4])}&DF=${encodeURIComponent(row[16])}&BR=${encodeURIComponent(row[10])}&Lift=${encodeURIComponent(row[11])}&Park=${encodeURIComponent(row[12])}&Club=${encodeURIComponent(row[13])}&Pkng=${encodeURIComponent(row[14])}&PB=${encodeURIComponent(row[15])}">${row[1]}</a>
            <p>Address ${row[2]}</p>
                <p>Super Builtup Area: ${row[6]}</p>
                <p>Price: ${row[8]}</p>
            `;
            propertyListingSection.appendChild(listingElement);
        });
    }
}


var applyButton = document.getElementById('apply-button');
applyButton.addEventListener('click', function () {
    console.log('Apply button clicked');
    filterAndRenderListings();
});
function resetFilters() {
    document.getElementById('price').value = '';

    var bhkDropdown = document.getElementById('bhk-dropdown');
    bhkDropdown.selectedIndex = 0;

    var furnishingDropdown = document.getElementById('furnishing-dropdown');
    furnishingDropdown.selectedIndex = 0;

    filterAndRenderListings();
}

function filterAndRenderListings() {
    // Get filter values
    var price = parseInt(document.getElementById('price').value) || Infinity; // Set to Infinity if price is not provided
    var bhkDropdown = document.getElementById('bhk-dropdown');
    var bhk = parseInt(bhkDropdown.options[bhkDropdown.selectedIndex].value);
    var furnishingDropdown = document.getElementById('furnishing-dropdown');
    var furnishing = furnishingDropdown.options[furnishingDropdown.selectedIndex].value;

    // Filter properties based on selected filter criteria
    var filteredData = propertyData.filter(function (row) {
        return parseInt(row[8]) <= price && (bhk === 0 || parseInt(row[4]) === bhk) && (furnishing === 'Any' || row[9] === furnishing);
    });

    // Render property listings with filtered data
    renderPropertyListings(filteredData);
}

filterAndRenderListings();
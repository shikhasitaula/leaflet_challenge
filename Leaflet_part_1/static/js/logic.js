// URL to fetch earthquake data from USGS GeoJSON feed
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// An array to store earthquake geometries
geomeData = [];

// Function to determine the color based on earthquake depth
function getDepthColor(depth) {
    if (depth > 90) {
        return '#d73027'; // Red color (shallow)
    } else if (depth > 70) {
        return '#fc8d59'; // Orange color 
    } else if (depth > 50) {
        return '#fee08b'; // Yellow color 
    } else if (depth > 30) {
        return '#d9ef8b'; // Light green color 
    } else if (depth > 10) {
        return '#1a9850'; // Dark green color 
    } else {
        return 'lightgreen'; // Light green (deep)
    }
}

// Fetching and processing GeoJSON data using D3.js
d3.json(url).then(function (data) {
    console.log(data);
    const features = data.features;
    console.log(features);

    // Extracting geometry information and populating geomeData array

    for (let index = 0; index < features.length; index++) {
        const geometry = features[index].geometry;
        geomeData.push(geometry);
    }

    console.log(geomeData);

    // Create circular markers and populate earthquakeMarkers array
    const earthquakeMarkers = [];
    for (let index = 0; index < geomeData.length; index++) {
        const coordinates = geomeData[index].coordinates;
        const magnitude = features[index].properties.mag; // Get magnitude
        const depth = coordinates[2]; // Get depth

        const circleMarker = {
            radius: magnitude * 3, // Customize the radius based on magnitude
            color: getDepthColor(depth), // Use the depth color function from your original code
            fillOpacity: 1
        };
        const earthquakeMark = L.circleMarker([coordinates[1], coordinates[0]], circleMarker)
        .bindPopup(`<h3>Location:</h3> ${features[index].properties.place}<h3> Magnitude:</h3> ${magnitude}<h3> Depth:</h3> ${depth}`);
        // Adding the marker to the array
    earthquakeMarkers.push(earthquakeMark);
}

    // Create a layer group and add it to the map
    const earthquakeLayer = L.layerGroup(earthquakeMarkers);
    earthquakeLayer.addTo(myMap);

    // setting up the colors for different depth levels.
    const grades = [-10, 10, 30, 50, 70, 90];
    const colors = ['#1a9850', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027', 'lightgreen'];

    // Create a legend control
    const legend = L.control({ position: 'bottomright' });

    // Adding each depth range with its color.
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = '<strong>Depth Legend</strong><br>';

        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1] - 1) + '<br>' : '+');
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);
});
// Setting up our map with its center and zoom level.
const myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
});
// Adding the map's base layer using OpenStreetMap tiles.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
geomeData = [];

function getDepthColor(depth) {
    if (depth > 90) {
        return '#d73027'; // Shallow earthquakes
    } else if (depth > 70) {
        return '#fc8d59'; // Intermediate earthquakes
    } else if (depth > 50) {
        return '#fee08b'; // Intermediate earthquakes
    } else if (depth > 30) {
        return '#d9ef8b'; // Intermediate earthquakes
    } else if (depth > 10) {
        return '#1a9850'; // Intermediate earthquakes
    } else {
        return 'lightgreen'; // Deep earthquakes
    }
}

// Fetching and processing GeoJSON data
d3.json(url).then(function (data) {
    console.log(data);
    const features = data.features;
    console.log(features);

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

    earthquakeMarkers.push(earthquakeMark);
}

    // Create a layer group and add it to the map
    const earthquakeLayer = L.layerGroup(earthquakeMarkers);
    earthquakeLayer.addTo(myMap);

    // Define the grades and corresponding colors
    const grades = [-10, 10, 30, 50, 70, 90];
    const colors = ['#1a9850', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027', 'lightgreen'];

    // Create a legend control
    const legend = L.control({ position: 'bottomright' });

    // Function to generate the legend content
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

const myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
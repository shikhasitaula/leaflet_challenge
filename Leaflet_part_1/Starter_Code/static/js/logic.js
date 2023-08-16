url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
geometryData = [];

function getDepthColor(depth) {
    if (depth < 50) {
      return 'green'; // Shallow earthquakes
    } else if (depth < 150) {
      return 'orange'; // Intermediate earthquakes
    } else {
      return 'red'; // Deep earthquakes
    }
  }
// Fetching and processing GeoJSON data
d3.json(url).then(function(data){
    console.log(data);
    const features = data.features;
    console.log(features);
  
    for (let index = 0; index < features.length; index++) {
      const geometry = features[index].geometry;
      geometryData.push(geometry);
    }
  
    console.log(geometryData);
  
    // Create circular markers and populate earthquakeMarkers array
    const earthquakeMarkers = [];
    for (let index = 0; index < geometryData.length; index++) {
      const coordinates = geometryData[index].coordinates;
      const magnitude = features[index].properties.mag; // Get magnitude
      const depth = coordinates[2]; // Get depth
  
      const circleOptions = {
        radius: magnitude * 3, // Customize the radius based on magnitude
        color: getDepthColor(depth), // Use the depth color function from your original code
        fillOpacity: 0.7
      };
  
      const earthquakeMark = L.circleMarker([coordinates[1], coordinates[0]], circleOptions); // Note the order of lat and long
      earthquakeMarkers.push(earthquakeMark);
    }
  
    // Create a layer group and add it to the map
    const earthquakeLayer = L.layerGroup(earthquakeMarkers);
    earthquakeLayer.addTo(myMap);
  });
  
  const myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
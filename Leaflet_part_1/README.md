# Overview
### Leaflet Challenge

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Features

- Fetches earthquake data from the USGS GeoJSON feed.
- Creates circular markers on the map to represent earthquakes.
- Marker size is determined by the magnitude of the earthquake.
- Marker color is determined by the depth of the earthquake.
- Clicking on a marker displays a popup with earthquake details.

## Basis:

First I created a repository and cloned it to my local machine. Then I opended the "index.html" file in a web browser to view the interactive map. I imported the dependencies like leaflet and D3.js for the data visualizations. 
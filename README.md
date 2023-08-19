
### Earthquake Data Visualization
### Leaflet Challenge

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## What It Can Do

- **Get Earthquake Info:** I fetch data from USGS to find out where earthquakes are and how strong they are.
  
- **Markers:** I create markers on the map to show where earthquakes happened. The bigger the marker, the bigger the earthquake.
  
- **Colors for Depth:** I use colors to show how deep the earthquake is. Deeper earthquakes have different colors.
  
- **bindPpos:** When you click on a marker, it tells you where the earthquake happened, how strong it was, and how deep it went.


## How I Get started:

First, I created a repository and cloned it to my local machine. Then, I opended the "index.html" file in a web browser to view the interactive map. I imported the dependencies like leaflet and D3.js for the data visualizations. 

The logic above code fetches earthquake data, processes it, creates circular markers with varying sizes and colors based on earthquake magnitude and depth, and displays these markers on a Leaflet map.

## code: 
1. **Data extraction:** I used D3.js to get earthquake data from USGS and make sense of it.

2. **Interacive Markers:** Each earthquake is a dot on the map. The bigger the dot, the bigger the quake!

3. **Color:** I used different colors for different depths of earthquakes. It helps you see which ones are deeper.

4. **Legend:** I made a small box that tells you which color means what depth. So you're never confused!

5. **Map:** I used Leaflet to make a map. It's like a big canvas where we put our earthquake markers.

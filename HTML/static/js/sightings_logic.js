// Add console.log to check to see if our code is working.
console.log("working");



// We create the 3 tile layers that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// Add a 2nd layer group for the butterfly data.
let tagged20009 = new L.markerClusterGroup();
let adultFS20208 = new L.markerClusterGroup();
let adultS20209= new L.markerClusterGroup();
let eggsFS20208 = new L.markerClusterGroup();
let larvaS20209 = new L.markerClusterGroup();
let peakM20209 = new L.markerClusterGroup();
let milkweedFS20207 = new L.markerClusterGroup();
let milkweedS20207 = new L.markerClusterGroup();

// Add a reference to the butterfly data group to the overlays object.
let overlays = {
  "Monarch Tagged September 2000": tagged20009,
  "Monarch Adult First Sightings August 2020": adultFS20208,
  "Monarch Adult Sightings September 2020": adultS20209,
  "Monarch Egg First Sightings August 2020": eggsFS20208,
  "Monarch Larva Sightings September 2020": larvaS20209,
  "Monarch Peak Migration": peakM20209,
  "Milkweed First Sightings July 2020": milkweedFS20207,
  "Milkweed Sightings July 2020": milkweedS20207
};

// Then we add a control to the map that will allow the user to change which layers are visible
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the adult sightings GeoJSON data.
adultFS20208data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Adult_First_Site/JNorth_Adult_First_Site_2020_8.geojson"
d3.json(adultFS20208data).then(function(data) {

   // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// Turn each feature into a marker on the map.
    	pointToLayer: function(feature, latlng) {
      		// console.log(data);
      		return L.marker(latlng);
        },

      // Create a popup for each circleMarker
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.school);
    }
  }).addTo(adultFS20208);

  // Add the first sight layer to our map.
  adultFS20208.addTo(map);

  // Retrieve the last eggSightings GeoJSON data
  tagged20009data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/monarch_watch/tagged/MWatch_Tagged_2000_9.geojson"

  d3.json(tagged20009data).then(function(data) {

  // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.marker(latlng);
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
    }
  }).addTo(tagged20009);
  // Add the tagged20009 layer to the map.
  tagged20009.addTo(map);
  });

 // Retrieve the last eggSightings GeoJSON data
 eggsFS20208data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Egg_First_Site/JNorth_Egg_First_Site_2020_8.geojson"

 d3.json(eggsFS20208data).then(function(data) {

 // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
 L.geoJson(data, {
   pointToLayer: function(feature, latlng) {
     console.log(data);
     return L.marker(latlng);
   },
   onEachFeature: function(feature, layer) {
     layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
   }
 }).addTo(eggsFS20208);
 // Add the eggsFS20208 layer to the map.
 eggsFS20208.addTo(map);
 });

// 3. Retrieve the last eggSightings GeoJSON data
larvaS20209data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Larva_Site/JNorth_Larva_Site_2020_9.geojson"

d3.json(larvaS20209data).then(function(data) {

// Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.marker(latlng);
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
  }
}).addTo(larvaS20209);
// 8. Add the larvaS20209 layer to the map.
larvaS20209.addTo(map);
});

// 3. Retrieve the major eggSightings GeoJSON data
peakM20209data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Peak_Migration/JNorth_Peak_Migration_2020_9.geojson"

d3.json(peakM20209data).then(function(data) {

// Creating a GeoJSON layer with the retrieved data that adds a peak migration layer
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.marker(latlng);
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
  }
}).addTo(peakM20209);
// 8. Add the peakM20209 layer to the map.
peakM20209.addTo(map);
});

  milkweedFS20207data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Milkweed_First_Site/JNorth_Milkweed_First_Site_2020_7.geojson"
  d3.json(milkweedFS20207data).then(function(data) {


    // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.marker(latlng);
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
      }
    }).addTo(milkweedFS20207);
    // Add the milkweedFS20207 layer to the map.
    milkweedFS20207.addTo(map);
    });
 
    milkweedS20207data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Milkweed_Site/JNorth_Milkweed_Site_2020_7.geojson"
    d3.json(milkweedS20207data).then(function(data) {
  
  
      // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
      L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.marker(latlng);
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
        }
      }).addTo(milkweedS20207);
      // 8. Add the milkweedS20207 layer to the map.
      milkweedS20207.addTo(map);
      });

   // 3. Use d3.json to make a call to get our geoJSON data.
   adultS20209data = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Adult_Site/JNorth_Adult_Site_2020_9.geojson"
  d3.json(adultS20209data).then(function(data) {
    // console.log(data);
    L.geoJson(data, {
      style: {color: "#ee9c00", weight: 2},
      }).addTo(adultS20209);
  });

  // add adultS20209 layer group to map
  adultS20209.addTo(map);
});





//map number 2





// We create the 3 tile layers that will be the background of our map.
let streets2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let satelliteStreets2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let dark2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map2 = L.map('mapid2', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets2]
});

// Create a base layer that holds all three maps.
let baseMaps2 = {
  "Streets": streets2,
  "Satellite": satelliteStreets2,
  "Dark": dark2
};

// Add a 2nd layer group for the butterfly data.
let tagged200092 = new L.markerClusterGroup();
let adultFS202082 = new L.markerClusterGroup();
let adultS202092 = new L.markerClusterGroup();
let eggsFS202082 = new L.markerClusterGroup();
let larvaS202092 = new L.markerClusterGroup();
let peakM202092 = new L.markerClusterGroup();
let milkweedFS202072 = new L.markerClusterGroup();
let milkweedS202072 = new L.markerClusterGroup();

// Add a reference to the butterfly data group to the overlays object.
let overlays2 = {
  "Monarch Tagged September 2000": tagged200092,
  "Monarch Adult First Sightings August 2020": adultFS202082,
  "Monarch Adult Sightings September 2020": adultS202092,
  "Monarch Egg First Sightings August 2020": eggsFS202082,
  "Monarch Larva Sightings September 2020": larvaS202092,
  "Monarch Peak Migration": peakM202092,
  "Milkweed First Sightings July 2020": milkweedFS202072,
  "Milkweed Sightings July 2020": milkweedS202072
};

// Then we add a control to the map that will allow the user to change which layers are visible
L.control.layers(baseMaps2, overlays2).addTo(map2);

// Retrieve the adult sightings GeoJSON data.
adultFS20208data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Adult_First_Site/JNorth_Adult_First_Site_2020_8.geojson"
d3.json(adultFS20208data2).then(function(data) {

   // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// Turn each feature into a marker on the map.
    	pointToLayer: function(feature, latlng) {
      		// console.log(data);
      		return L.marker(latlng);
        },

      // Create a popup for each circleMarker
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.school);
    }
  }).addTo(adultFS202082);

  // Add the first sight layer to our map.
  adultFS202082.addTo(map2);

  // Retrieve the last eggSightings GeoJSON data
  tagged20009data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/monarch_watch/tagged/MWatch_Tagged_2000_9.geojson"

  d3.json(tagged20009data2).then(function(data) {

  // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.marker(latlng);
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
    }
  }).addTo(tagged200092);
  // Add the tagged20009 layer to the map.
  tagged200092.addTo(map2);
  });

 // Retrieve the last eggSightings GeoJSON data
 eggsFS20208data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Egg_First_Site/JNorth_Egg_First_Site_2020_8.geojson"

 d3.json(eggsFS20208data2).then(function(data) {

 // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
 L.geoJson(data, {
   pointToLayer: function(feature, latlng) {
     console.log(data);
     return L.marker(latlng);
   },
   onEachFeature: function(feature, layer) {
     layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
   }
 }).addTo(eggsFS202082);
 // Add the eggsFS20208 layer to the map.
 eggsFS202082.addTo(map2);
 });

// 3. Retrieve the last eggSightings GeoJSON data
larvaS20209data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Larva_Site/JNorth_Larva_Site_2020_9.geojson"

d3.json(larvaS20209data2).then(function(data) {

// Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.marker(latlng);
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
  }
}).addTo(larvaS202092);
// 8. Add the larvaS20209 layer to the map.
larvaS202092.addTo(map2);
});

// 3. Retrieve the major eggSightings GeoJSON data
peakM20209data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Peak_Migration/JNorth_Peak_Migration_2020_9.geojson"

d3.json(peakM20209data2).then(function(data) {

// Creating a GeoJSON layer with the retrieved data that adds a peak migration layer
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.marker(latlng);
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
  }
}).addTo(peakM202092);
// 8. Add the peakM20209 layer to the map.
peakM202092.addTo(map2);
});

  milkweedFS20207data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Milkweed_First_Site/JNorth_Milkweed_First_Site_2020_7.geojson"
  d3.json(milkweedFS20207data2).then(function(data) {


    // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.marker(latlng);
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
      }
    }).addTo(milkweedFS202072);
    // Add the milkweedFS20207 layer to the map.
    milkweedFS202072.addTo(map2);
    });
 
    milkweedS20207data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Milkweed_Site/JNorth_Milkweed_Site_2020_7.geojson"
    d3.json(milkweedS20207data2).then(function(data) {
  
  
      // Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
      L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.marker(latlng);
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Number: " + feature.properties.number + "<br>Location: " + feature.properties.number);
        }
      }).addTo(milkweedS202072);
      // 8. Add the milkweedS20207 layer to the map.
      milkweedS202072.addTo(map);
      });

   // 3. Use d3.json to make a call to get our geoJSON data.
   adultS20209data2 = "https://raw.githubusercontent.com/ChristianShada/Monarch_Butterflies/main/static_Sue/geoJSON/journey_north/JNorth_Adult_Site/JNorth_Adult_Site_2020_9.geojson"
  d3.json(adultS20209data2).then(function(data) {
    // console.log(data);
    L.geoJson(data, {
      style: {color: "#ee9c00", weight: 2},
      }).addTo(adultS202092);
  });

  // add adultS20209 layer group to map
  adultS202092.addTo(map2);
});

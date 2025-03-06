// Function to load the Google Maps API script dynamically
function loadGoogleMaps() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Google Maps API key is missing. Please set it in your .env file.");
    return;
  }
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Function to load and parse the train stations CSV (TXT file)
function loadTrainStations(map) {
  fetch('/data/stops.txt')
    .then(response => response.text())
    .then(text => {
      // Split the text into lines and filter out empty lines
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      // Remove the header row
      lines.shift();
      
      // Parse each line into an object
      const trainStations = lines.map(line => {
        // Split by comma and remove surrounding quotes
        const values = line.split(',').map(val => val.replace(/^"|"$/g, '').trim());
        return {
          stop_id: values[0],
          stop_name: values[1],
          stop_lat: parseFloat(values[2]),
          stop_lon: parseFloat(values[3])
        };
      });
      
      // Add a marker for each train station using the custom PNG icon
      trainStations.forEach(station => {
        new google.maps.Marker({
          position: { lat: station.stop_lat, lng: station.stop_lon },
          map: map,
          title: station.stop_name,
          icon: {
            url: '/assets/icons/train.png', // Custom PNG icon
            scaledSize: new google.maps.Size(35, 35),  // Adjust the size as needed
            // anchor: new google.maps.Point(15, 15)
          }
        });
      });
    })
    .catch(err => console.error('Error loading train stations:', err));
}

// Global function called by the Google Maps API
window.initMap = function () {
  console.log("Google Maps API loaded");
  // Coordinates for Melbourne, Victoria
  const melbourne = { lat: -37.8136, lng: 144.9631 };

  // Persona 5 Royal–inspired custom map style array
  const persona5Style = [
    // Overall geometry set to bright red
    {
      elementType: 'geometry',
      stylers: [
        { color: '#FF0000' }
      ]
    },
    // Labels: white text with a thick black stroke
    {
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#FFFFFF' }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#000000' },
        { weight: 4 }
      ]
    },
    // Hide POI icons to keep the map cleaner
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },
    // Roads: black fill with white stroke for contrast
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { color: '#000000' }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#FFFFFF' },
        { weight: 1 }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#000000' }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#FFFFFF' },
        { weight: 2 }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#FFFFFF' }
      ]
    },
    // Natural landscapes remain bright red
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#FF0000' }
      ]
    },
    // POIs remain bright red as well
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#FF0000' }
      ]
    },
    // Water set to black
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { color: '#000000' }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#FFFFFF' }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        { color: '#ebd534' } // Blue, for example
      ]
    }
    
  ];
  
  // Create the map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: melbourne,
    zoom: 12,
    styles: persona5Style
  });

    // Load the train station data and overlay custom markers
    loadTrainStations(map); // Call the function to load the train stations

  // Place a marker at Melbourne
  new google.maps.Marker({
    position: melbourne,
    map: map,
    title: 'Melbourne, Victoria',
    icon: {
      url: '/assets/icons/marker.png',
      scaledSize: new google.maps.Size(75, 75) // Adjust the size as needed
    }
  });
  
};

// Start by loading the Google Maps API
loadGoogleMaps();

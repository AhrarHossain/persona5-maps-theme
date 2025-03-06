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

  // Place a marker at Melbourne
  new google.maps.Marker({
    position: melbourne,
    map: map,
    title: 'Melbourne, Victoria',
    // Uncomment and update the path when your custom marker asset is ready:
    // icon: '/public/assets/icons/custom-marker.png'
  });
};

// Start by loading the Google Maps API
loadGoogleMaps();

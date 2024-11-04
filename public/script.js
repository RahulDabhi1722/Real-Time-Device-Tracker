const socket = io(); // Initialize Socket.IO

// Check if geolocation is supported
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error("Error getting location:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

// Initialize Leaflet map centered globally, allowing zoom in/out
const map = L.map("map").setView([20, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data © OpenStreetMap contributors",
}).addTo(map);

// Store markers by user ID
const markers = {};

// Listen for location updates from server
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // Check if a marker exists for this user, otherwise create one
  if (!markers[id]) {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  } else {
    markers[id].setLatLng([latitude, longitude]); // Update marker position
  }

  // Optionally, set the view to the latest received location
  map.setView([latitude, longitude], map.getZoom());
});

// Remove marker when user disconnects
socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

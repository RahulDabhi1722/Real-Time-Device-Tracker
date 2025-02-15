# Real-Time-Device-Tracker

A real-time device tracking application that uses geolocation data from connected clients and displays their positions on a map. Built with Node.js, Express, Socket.IO, and Leaflet.js for real-time data updates and map rendering.

#Features :

Tracks and updates device locations in real-time on a map.
Automatically removes a device’s marker when it disconnects.
Displays a full-screen map centered on tracked devices.

Project Structure :

project-folder/

├── app.js               # Main server file

├── views/
│   └── index.ejs        # Main HTML file (rendered by Express)

└── public/
    ├── script.js        # Client-side JavaScript for Socket.IO and Leaflet map
    └── style.css        # Styling for the map display
    
#Technologies Used :

Node.js: Backend server.

Express.js: Web framework for serving the application.

Socket.IO: WebSocket library for real-time communication.

Leaflet.js: Open-source JavaScript library for interactive maps.

HTML/CSS: Frontend styling and structure.

#Setup and Installation :

cd realtime-device-tracker

Install dependencies:
npm install

Run the server:
node app.js



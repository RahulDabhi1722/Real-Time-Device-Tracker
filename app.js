const express = require("express");
const app = express();
const path = require("path");

// Initialize HTTP server and Socket.IO
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' folder

io.on("connection", function (socket) {
   console.log("New client connected:", socket.id);
   
   // Handle receiving location from client and broadcasting to others
   socket.on("send-location", function (data) {
      io.emit("receive-location", { id: socket.id, ...data });
   });

   // Handle client disconnection
   socket.on("disconnect", function () {
      io.emit("user-disconnected", socket.id);
   });
});

// Route for homepage
app.get("/", function (req, res) {
   res.render("index");
});

// Start server on port 3000
server.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});

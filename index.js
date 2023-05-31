const app = require("express")();
const http = require("http")
const express = require("express");
const dbConfig = require("./db/connect");
const {Server} = require("socket.io")
const userRoutes = require("./routes/users");

const cors = require("cors");
require("dotenv").config();
// database configuration
dbConfig.connectDb();

//cors config
app.use(cors());

// allowing the json and url encoded in the requesst body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// bringing all the routes
userRoutes.userRoutes(app);

app.get("/test", (req, res) => {
  return res.json({test: "api testing"})
})


const server = http.createServer(app)
const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173", // socket server initializing...
    methods: ["GET", "POST"]
  }
})

io.on("connect", (socket) => {
  console.log('connected')
  // console.log(socket);
  
  socket.on("disconnect", ()=> {
    console.log("client disconnected..");
  })
})
server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});


const Socket = function () {
  return {
    emit: function (event, data) {
      io.sockets.emit(event, data);
    },
    to: function (roomId, event, data) {
      io.sockets.to(roomId).emit(event, data);
    },
  };
};

module.exports.Socket =io
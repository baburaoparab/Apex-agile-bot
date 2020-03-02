let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let cors = require("cors");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(cors());
const droneObj= {
    id: 1,
    name: 'Drone-1',
    battery: 50,
    locationName: 'Bus Stand',
    speed: 10,
    signalStrength: 'Good',
    timeLeft: 3,
    flightStatus: 'flying',
    upTime: 50,
    altitude: 25,
    position: {
        latitude: 100.1,
        longitude: 100.1,
    }
   };
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('visionUpdate', (data) => {
    console.log('socketData: '+JSON.stringify(data));
  });
  io.emit('droneUpdate',  { type: "new-message",  'droneObj' :  droneObj });
});



http.listen(3010, function(){
  console.log('listening on *:3000');
});
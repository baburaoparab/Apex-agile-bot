var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var querystring = require('querystring');
var http = require('http');


var app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// body-parser for retrieving form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/takeoff', (request, response) => {

  console.log("takeoff");

  var data = {
    'id': 1
  };

  performPostRequest(request,response,data);
  
})

app.post('/move', (request, response) => {

  console.log("moving");

  var data = request.body;
  console.log(request.body);

  performPostRequest(request,response,data);

})
app.post('/camera', (request, response) => {

  console.log("camera");

  var data = request.body;
  console.log(request.body);

  performPostRequest(request,response,data);

})

function performPostRequest(request,response,data){

  post_data = JSON.stringify(data);

  var options = {
    host: 'localhost',
    port: 5000,
    path: '/command',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(post_data),
      'Postman-Token': '52b3a298-7520-4592-b50c-9a499ad1e3ae',
      'cache-control': 'no-cache'
  }
  };


  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      response.send(chunk);
    });
  });

  req.on('error', function(e) {
    response.send(500);
  });

  // write data to request body
  req.write(post_data);
  req.end();

}


/** END */

var server = app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000/');
});
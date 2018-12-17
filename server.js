var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Model = require('./api/models/crudModel'), //created model loading here
    bodyParser = require('body-parser');

var db = require('./api/db');
var fs = require('fs')
var morgan = require('morgan')
//var cors = require('cors')
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("hello world")
// outputs hello world
console.log(hw+' : '+decrypt(hw));

// Sockets events

io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: encrypt(socket.nickname), event: 'left'});
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = decrypt(nickname);
    io.emit('users-changed', {user: encrypt(nickname), event: 'joined'});    
  });

  socket.on('add-private-message', (message) => {
    io.emit('private-message', {text: message.encrypt(text), from: socket.nickname, target: message.target, type: 'private', created: new Date()});
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.encrypt(text), from: socket.nickname, type: 'public', created: new Date()});    
  });

  socket.on('room', function(room) {
    socket.join(room);
    
	});

  io.clients((error, clients) => {
	  if (error) throw error;
	  io.emit('clients', {clients: clients}); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
	});
		
});

//app.use(cors());
// Configire Request headers

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});


// mongoose instance connection url connection
global.__root = __dirname + '/';

var logFile = fs.createWriteStream('./api.log', {flags: 'a'});

db.connect('ionic', 'ionic');

/*mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/ionic');
mongoose.connect('mongodb+srv://ionic:ionic@cours-8uau7.mongodb.net/ionic', { useNewUrlParser: true })
.then( data => {
	console.log('Connected to Mongo cluster !');
})
.catch(err => {
	console.error(err);
});*/

/*var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://ionic:ionic@cours-8uau7.mongodb.net/ionic";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   //const db = client.db("ionic");
   // perform actions on the collection object
   //client.close();
});*/

app.use(morgan('combined', { stream: logFile }));

var routes = require('./api/routes/crudRoutes'); //importing route
routes(app); //register the route

var UserController = require(__root + 'api/controllers/userController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'api/controllers/authController');
app.use('/api/auth', AuthController);

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {	
    res.status(404).send({url: req.originalUrl + ' not found'})
});

http.listen(port);


console.log('API running on port: ' + port);
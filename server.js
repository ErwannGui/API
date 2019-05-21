global.rights = undefined;
global.__root = __dirname + '/';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Model = require('./api/models/crudModel'), //created model loading here
    bodyParser = require('body-parser');

var db = require('./api/db');
var fs = require('fs');
//var morgan = require('morgan')
//var cors = require('cors')
var http = require('http').Server(app);
// var socket = require('websocket/socket');
// var crypto = require('crypto/aes');
// socket.socket();

// var hw = crypto.encrypt("hello world");
// // outputs hello world
// console.log(hw+' : '+decrypt(hw));


//app.use(cors());
// Configire Request headers

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

var logFile = fs.createWriteStream('./api.log', {flags: 'a'});

db.authToMongo();

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

//app.use(morgan('combined', { stream: logFile }));

var routes = require('./api/routes/crudRoutes'); //importing route
routes(app); //register the route

var UserController = require(__root + 'api/controllers/userController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'api/controllers/authController');
app.use('/api/auth', AuthController);

var operationnalController = require(__root + 'api/controllers/operationnalController');
app.use('/api/ops', operationnalController);

var socialController = require(__root + 'api/controllers/socialController');
app.use('/api/social', socialController);

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {	
    res.status(404).send({url: req.originalUrl + ' not found'})
});

http.listen(port);

console.log('API running on port: ' + port);
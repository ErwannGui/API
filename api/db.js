const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
var router = express.Router();

function connect(username, password) {
	mongoose.Promise = global.Promise;
	//mongoose.connect('mongodb://localhost:27017/ionic');
	mongoose.connect('mongodb+srv://'+username+':'+password+'@cours-8uau7.mongodb.net/ionic', { useNewUrlParser: true })
	.then( data => {
		console.log('Connected to Mongo cluster !');
	})
	.catch(err => {
		console.error(err);
	});
};

exports.authToMongo = function() {

	if (mongoose.connection.readyState == 1) {
		mongoose.connection.close();
	}

	let username = undefined,
		password = undefined;

	switch (rights) {
		case "readWrite":
			username = 'ionic';
			password = config.rights;
			break;
		case "dbAdmin":
			username = 'moderator';
			password = config.rights;
			break;
		case "su":
			username = 'admin';
			password = config.rights;
			break;
		default:
			username = 'admin';
			password = config.default;
			break;
	}

	connect(username, password);
};

/* Ajout de la fonction d'authentification */
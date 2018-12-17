const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

exports.connect = function(username, password) {
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

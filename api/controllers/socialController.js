var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Twitter = require('twitter');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

var client = new Twitter({
	consumer_key: 'e9Ubeyd4YdgNPCYRBnzCJrsM0',
	consumer_secret: 'vXW6zpBtrRwDMlMrlPYpyvTibWjPwO2BUGXNSplAG8IWzH7TUy',
	access_token_key: '1101477760055341062-Lj3oPVWV6SPZS7CPblHBwlFCN6JdIg',
	access_token_secret: 'rWlgRPQjX5ZjO1DljBFFURqF0JZvGfL3V4093fOQcm8rO'
});

router.get('/twitter', function (req, res) {
	client.get('https://api.twitter.com/1.1/search/twwets.json?user_id=99714133', function (error, tweets, response) {
		if (error) {
			console.error(error.stack);
		} else {
			console.log(tweets);  // The favorites.
			// console.log(response);  // Raw response object.
		}
		res.status(200).send(tweets);
		console.log(res);
	});
});


router.post('/statuses/retweets/:id', function (req, res) {
	client.post('https://api.twitter.com/1.1/statuses/retweets/:id', {id: req.params.id, count: req.params.count, trim_user: req.params.trim_user}, function (error, tweet, response) {
	});
	if (error) {
		console.error(error.stack)
	} else {
		console.log(tweet);  // Tweet body.
		console.log(response);  // Raw response object.
	}
	res.status(200).send({auth: false, token: null});
	console.log(res);
});

module.exports = router;
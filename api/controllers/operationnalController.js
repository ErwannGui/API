var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');

var VerifyToken = require(__root + 'api/controllers/verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));

let apiKey = "dcc9422a-cf26-4ed9-8312-a0e6a1b33674";
let username = 'erwann44110@gmail.com';

let cluster_id = 'Cours';
let project_id = '5bbcb42dcf09a2891bdd2b9f';
let url = 'cloud.mongodb.com';

router.get('/getid', function (req, res) {
    var options = {
        url: `https://${url}/api/atlas/v1.0/groups/${project_id}/clusters/${cluster_id}/snapshots`,
        auth: {
            user: 'erwann44110@gmail.com',
            pass: apiKey,
            sendImmediately: false
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).send(body)
            console.log(body);
        }
        else{
            res.status(500).send(body)
            console.log("error : "+error)
            console.log('response : '+ response)
        }
    }

    request(options, callback);

});

router.get('/temp', function (req, res) {
    var headers = {
        'Content-Type': 'application/json'
    };
    
    var dataString = `
    {
      "delivery" : {
        "methodName" : "AUTOMATED_RESTORE",
        "targetGroupId" : "<target_group_id>",
        "targetClusterId" : "<target_cluster_id>"
      },
      "snapshotId": "<snapshot_id>"
    }`;
    
    var options = {
        url: 'http://<url>/api/public/v1.0/groups/<group_id>/clusters/<cluster_id>/restoreJobs',
        method: 'POST',
        headers: headers,
        body: dataString,
        auth: {
            'user': 'username',
            'pass': apiKey
        }
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    
    request(options, callback);
});

module.exports = router;
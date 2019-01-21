'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment'),
    Favorite = mongoose.model('Favorite');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_an_user = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.details_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_an_user = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_an_user = function(req, res) {
    authorized = false;
    search = ['dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }

    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

exports.list_all_comments = function(req, res) {
    Comment.find({}, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.create_a_comment = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    var new_comment = new Comment(req.body);
    new_comment.save(function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.update_a_comment = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.delete_a_comment = function(req, res) {
    authorized = false;
    search = ['dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    Comment.remove({
        _id: req.params.commentId
    }, function(err, comment) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted', comment: comment });
    });
};

exports.list_all_favorites = function(req, res) {
    Favorite.find({}, function(err, favorite) {
        if (err)
            res.send(err);
        res.json(favorite);
    });
};

exports.create_a_favorite = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    var new_favorite = new Favorite(req.body);
    new_favorite.save(function(err, favorite) {
        if (err)
            res.send(err);
        res.json(favorite);
    });
};

exports.update_a_favorite = function(req, res) {
    authorized = false;
    search = ['readWrite', 'dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    Favorite.findOneAndUpdate({_id: req.params.favoriteId}, req.body, {new: true}, function(err, favorite) {
        if (err)
            res.send(err);
        res.json(favorite);
    });
};

exports.delete_a_favorite = function(req, res) {
    authorized = false;
    search = ['dbAdmin', 'su'];
    for (var i = 0; i < search.length; i++) {
        if (rights == search[i]) {
            authorized = true;
            continue;
        } else if (authorized == false && i == search.length) {
            console.log('Do not have rights to execute this action !');
            res.status(500).send("Do not have rights to execute this action !");
            break;
        }
    }
    Favorite.remove({
        _id: req.params.favoriteId
    }, function(err, favorite) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted', favorite: favorite });
    });
};
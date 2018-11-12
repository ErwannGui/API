'use strict';
module.exports = function(app) {
    var crud = require('../controllers/crudController');

    // User Routes
    app.route('/users')
        .get(crud.list_all_users)
        //.post(crud.create_an_user);

    app.route('/users/:userId')
        .get(crud.details_user)
        .delete(crud.delete_an_user)
        .put(crud.update_an_user);

    // Comment Routes
    app.route('/comments')
        .get(crud.list_all_comments)
        .post(crud.create_a_comment);

    app.route('/comments/:commentId')
        .delete(crud.delete_a_comment)
        .put(crud.update_a_comment);

    // Favorite Routes
    app.route('/favorites')
        .get(crud.list_all_favorites)
        .post(crud.create_a_favorite);

    app.route('/favorites/:favoriteId')
        .delete(crud.delete_a_favorite)
        .put(crud.update_a_favorite);
};
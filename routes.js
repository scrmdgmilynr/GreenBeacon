var passport = require('passport');
var helpers = require('./routehelpers');

module.exports.router = function(app) {

  app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }), function(req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  app.get('/callback', passport.authenticate('github', { failureRedirect: '/session' }),
    helpers.newUser,
    helpers.setCookie,
    helpers.setUserId,
    helpers.checkFellow,
    helpers.setHeader,
    helpers.redirectStudentorFellow);

  app.get('/tickets', helpers.getTickets);

  // add route for specific tickets
  app.get('/tickets/:userid', helpers.getUserTickets);

  app.post('/tickets', helpers.addToQueue);

  app.put('/claimed', helpers.tagClaimed);

  app.post('/eraseClaim', helpers.isLoggedIn, helpers.eraseClaim);

  app.put('/solved', helpers.isLoggedIn, helpers.tagSolved);

  app.put('/unsolved', helpers.isLoggedIn, helpers.tagUnSolved);

  app.get('/signout', helpers.isLoggedIn, helpers.terminateSession);

  app.post('/chatroom/', helpers.getChat);

  app.post('/chatroom/chat', helpers.postMessage);

  app.post('/addFellow', helpers.addFellow)

};

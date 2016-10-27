var pg = require('pg');
var Sequelize = require('sequelize');

// postgres models
var User = require('./db/schema').User;
var Ticket = require('./db/schema').Ticket;
var Claim = require('./db/schema').Claim;
var Fellers = require('./db/schema').Fellers;

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// establish database connection for querying
var db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

db
 .authenticate()
 .then(function(err) {
   console.log('Connection established');
 })
 .catch(function(err) {
   console.log('Unable to connect: ', err);
 });

module.exports = {

  // if the current user does not exist in the users table, create a new record,
  // then retrieve the user's information
  newUser: function(req, res, next) {
    User.findOrCreate({ where: { username: req.session.passport.user.username, displayname: req.session.passport.user.displayName } })
      .then(function(user) {
        req.session.userID = user[0].dataValues.id;
        next();
      });
  },

  // put passport information into cookie
  setCookie: function(req, res, next) {
    req.session.cookie.passport = req.session.passport;
    next();
  },

  // check user on log in against fellow db
  checkFellow: function(req, res, next) {
    if (!req.session.cookie.passport.user.fellow) {
      Fellers.find({ where: { githubHandle: req.session.passport.user.username }})
      .then((fellow) => {
        req.session.cookie.passport.user.mainId = fellow.dataValues.id;
        if (fellow === null) {
          req.session.cookie.passport.user.fellow = false;
        } else {
          req.session.cookie.passport.user.fellow = true;
        }
      })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },

  setHeader: function(req, res, next) {
    res.setHeader('Set-Cookie', JSON.stringify(req.session.cookie.passport));
    next();
  },

  redirectStudentorFellow: function(req, res, next) {
    if (req.session.cookie.passport.user.fellow === true) {
      console.log('fellow');
      res.redirect('/#/fellow');
    } else {
      console.log('student')
      res.redirect('/#/student');
    }
  },

  // middleware that validates the user is currently logged in by analyzing the session
  isLoggedIn: function(req, res, next) {
    if(req.session && req.session.passport && req.session.passport.user.username && req.session.passport.user.provider === 'github'){
      next();
    } else {
      res.end('failed');
    }
  },

  terminateSession: function(req, res) {
    req.session.destroy();
    res.redirect('/#/signin');
  },

  // query for all tickets and claims that exist in DB and send to client
  getTickets: function(req, res) {
    Ticket.findAll({ include: [User] })
      .then(function(tickets) {
        Claim.findAll({ include: [User, Ticket] })
          .then(function(claims) {
            res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
          });
      });
  },

  getUserTickets: function(req, res) {
    console.log('REQUEST: ', req);
    Ticket.findAll({include: [User], where: { id: 1}})
      .then(function(tickets) {
        Claim.findAll({include: [User, Ticket], where: {ticketId: tickets[0].id}})
          .then(function(claims) {
            console.log(tickets, claims)
            console.log(JSON.stringify({ tickets: tickets, claims: claims, userID: req.session.userID }, null, 3))
            res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
          })
      });

    // User.find({ where: { username: req.params.username } })
    //   .then((user) => {
    //     Ticket.findAll({ where: { userId: user.id } })
    //       .then((tickets) => {
    //         res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
    //       })
    //   })
  },

  // create a new ticket instance and add it to the tickets table
  addToQueue: function(req, res) {
    Ticket.create({ message: req.body.message, location: req.body.location, x: req.body.x, y: req.body.y, color: req.body.color, userId: req.session.userID })
      .then(function(ticket) {
        Ticket.findAll({})
          .then(function(tickets) {
            res.json(tickets);
          });
      });
  },

  // mark the given ticket as claimed in the tickets table,
  // then add a new claim to the claims table
  tagClaimed: function(req, res) {
    Ticket.find({ where: { id: req.body.id } })
      .then(function(ticket) {
        ticket.update({ claimed: true })
          .then(function() {
            Claim.create({ userId: req.session.userID, ticketId: req.body.id, helpeeId: req.body.userId })
              .then(function() {
                res.end();
              });
          });
      });
  },

  // delete the given claim from the claims table,
  // then flag the corresponding ticket as 'preSolved'
  eraseClaim: function(req, res) {
    Claim.destroy({ where: { id: req.body.id } })
      .then(function() {
        Ticket.find({ where: { id: req.body.ticketId } })
          .then(function (ticket) {
            ticket.update({ preSolved: true } )
              .then(function() {
                res.end();
              });
          });
      });
  },

  // flag the given ticket as solved in the tickets table
  tagSolved: function(req, res) {
    Ticket.find({ where: { id: req.body.id } })
      .then(function(ticket) {
        ticket.update({ solved: true })
          .then(function () {
            res.end();
          });
      });
  },

  // flag the given ticket as not solved in the tickets table
  tagUnSolved: function(req, res) {
    Ticket.find({ where: { id: req.body.id } })
      .then(function(ticket) {
        ticket.update({ preSolved: false, claimed: false })
          .then(function () {
            res.end();
          });
      });
  },

  db: db

};

var pg = require('pg');
var Sequelize = require('sequelize');

// postgres models
var User = require('./db/schema').User;
var Ticket = require('./db/schema').Ticket;
var Claim = require('./db/schema').Claim;
var Feller = require('./db/schema').Feller;
var Chat = require('./db/schema').Chat;

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

  setUserId: function(req, res, next) {
      User.find({ where: { username: req.session.passport.user.username } })
        .then((user) => {
          req.session.cookie.passport.user.mainId = user.dataValues.id;
        })
        .then(() => {
          console.log('USER: ', req.session.cookie.passport.user);
          next();
        })
        .catch((err) => {
          console.log(err);
        })
  },

  // check user on log in against fellow db
  checkFellow: function(req, res, next) {
    if (!req.session.cookie.passport.user.fellow) {
      Feller.find({ where: { githubHandle: req.session.passport.user.username }})
      .then((fellow) => {
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
    Ticket.findAll({include: [User], where: { userId: req.params.userid}})
      .then(function(tickets) {
        console.log(tickets.length)
        if(tickets.length === 0){
          res.end();
          //this is here because a new user has no tickets to check claim for
          return;
        } 
        Claim.findAll({include: [User, Ticket], where: {ticketId: tickets[0].id}})
          .then(function(claims) {
            res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

  // get ticket's chat
  getChat: function(req, res, next) {
    Chat.findAll({ where: { ticketId: req.body.ticketId } })
      .then(function(chatMessages) {
        Promise.all(chatMessages.map((chatMessage) => {
          return User.find({ where: { id: chatMessage.dataValues.userId } })
            .then((user) => {
              chatMessage.dataValues.username = user.username;
              return chatMessage;
            })
        }))
          .then((newChatMessages) => {
            res.status(200);
            res.send(newChatMessages);
          })
      });
  },

  postMessage: function(req, res, next) {
    Chat.create({ message: req.body.message, ticketId: req.body.ticketId, userId: req.body.userId})
      .then(function(chat) {
        res.status(200);
        res.send('Message posted to chatroom table in DB!');
      });
  },

  addFellow: function(req, res, next) {
    console.log('fellow added', req.body)
    User.create({username: req.body.handle, displayname: req.body.name})
    .then(function(user) {
      return user.dataValues.id;
    }).then((id) =>{
      Feller.create({fellerName: req.body.name, githubHandle: req.body.handle, userId: id})
      .then(() =>{
        res.status(200);
        res.send('Added fellow');
      });
    })
    .catch((err) => {
        console.log(err);
    });
  },

  db: db

};

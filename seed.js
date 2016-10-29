var pg = require('pg');
var Sequelize = require('sequelize');

var Feller = require('./db/schema').Feller;
var Chat = require('./db/schema').Chat;

var fellers = [
  {
    fellerName: 'Melba Madrigal',
    githubHandle: 'melbee',
    userId: 1
  },
  {
    fellerName: 'Alex Ting',
    githubHandle: 'acting326',
    userId: 2
  }
  // ,
  // {
  //   fellerName: 'Andrew Sherman',
  //   githubHandle: 'ashermanwmf',
  //   userId: 3
  // }
];

var chats = [
  {
    message: "Hey, what's up?",
    ticketId: 1,
    userId: 1
  },
  {
    message: "I need help with this snipped of code.",
    ticketId: 1,
    userId: 2
  },
  {
    message: "Hmm, looks good to me.",
    ticketId: 1,
    userId: 1
  },
  {
    message: "It's not returning what I want.",
    ticketId: 1,
    userId: 2
  },
  {
    message: "Looks, like you're dealing with asynchronous code.",
    ticketId: 1,
    userId: 1
  },
  {
    message: "Thanks",
    ticketId: 1,
    userId: 2
  },
];

Feller.destroy({ where: {} }).then(() => {
  fellers.forEach((feller) => {
    Feller.create({
      fellerName: feller.fellerName,
      githubHandle: feller.githubHandle,
      userId: feller.userId
    });
  });
});

// chats.forEach((chat) => {
//   Chat.create({
//     message: chat.message,
//     ticketId: chat.ticketId,
//     userId: chat.userId
//   });
// });

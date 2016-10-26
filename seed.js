var pg = require('pg');
var Sequelize = require('sequelize');

var Fellers = require('./db/schema').Fellers;

var fellers = [
  {
    fellerName: 'Reed Cureton',
    githubHandle: 'rcureton00'
  },
  {
    fellerName: 'Blake Contreras',
    githubHandle: 'blakecontreras'
  },
  {
    fellerName: 'Melba Madrigal',
    githubHandle: 'melbee'
  },
  {
    fellerName: 'Alex Ting',
    githubHandle: 'acting326'
  }
];

Fellers.destroy({ where: {} }).then(() => {
  fellers.forEach((feller) => {
    Fellers.create({
      fellerName: feller.fellerName,
      githubHandle: feller.githubHandle
    });
  });
});

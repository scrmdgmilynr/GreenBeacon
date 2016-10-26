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
  }
];

fellers.forEach((feller) => {
  Fellers.create({
    fellerName: feller.fellerName,
    githubHandle: feller.githubHandle
  });
});

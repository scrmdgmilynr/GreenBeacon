if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const _ = require('underscore');
const pg = require('pg')
const Sequelize = require('sequelize');

//Postgres models
const User = require('../db/schema').User;
const Ticket = require('../db/schema').Ticket;
const Claim = require('../db/schema').Claim;
const Feller = require('../db/schema').Feller;
const Chat = require('../db/schema').Chat;

const db = new Sequelize(process.env.DATABASE_URL, {
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

module.exports = () =>{
	//find solved tickets
	Ticket.findAll({where: {solved: true}})
	.then((results) =>{
		//remove solved tickets
		Ticket.destroy({where: {solved: true}})
		.then(() =>{
			//remove chats for solved tickets
			_.each(results, (result) =>{
				// console.log(result.dataValues.id) these are the ids that i need to delete from the chat room table
				Chat.destroy({where: {ticketId: result.dataValues.id}})
				.then(() =>{
					console.log('deleted')
				});
			});
		});
	});
};
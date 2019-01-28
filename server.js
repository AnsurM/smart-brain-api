const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const Cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'smart-brain'
	}

});

db.select('*').from('users')
.then(data => {
});

const app = express();

app.use(Cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
 	res.send(db.users);
})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})
app.post('/signin', (req, res) => {signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.put('/image', (req,res) => { image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

app.listen(3000, () => {
	console.log('running on port 3000!');
})
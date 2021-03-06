const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database');
const mapRoutes = require('express-routes-mapper');
const config = require('./config/index');
const auth = require('./middlewares/auth');

const app = express()

const mappedPublicRoutes = mapRoutes(config.publicRoutes, './controllers/');
// const mappedPrivateRoutes = mapRoutes(config.privateRoutes, './controllers/');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Minsu Lee | Speer'))
app.use('/public', mappedPublicRoutes);

// middleware for jwt authentication to resrtict
// app.all('/private/*', (req, res, next) => auth(req, res, next));
// app.use('/private', mappedPrivateRoutes);

app.listen(config.port, () => console.log(`listening on port ${config.port}!`))
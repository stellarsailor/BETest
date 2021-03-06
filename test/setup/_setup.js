const express = require('express');
const bodyParser = require('body-parser');
const mapRoutes = require('express-routes-mapper');

const db = require('../../config/database');
const config = require('../../config/index');

const beforeAction = async () => {
  const testapp = express();
  const mappedOpenRoutes = mapRoutes(config.publicRoutes, './controllers/');
  //const mappedAuthRoutes = mapRoutes(config.privateRoutes, './controllers/');

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  //   testapp.all('/private/*', (req, res, next) => auth(req, res, next));
  //   testapp.use('/private', mappedAuthRoutes);
  testapp.use('/public', mappedOpenRoutes);

  return testapp;
};

const afterAction = async () => {
  db.end() //Close the connection pool
};


module.exports = { beforeAction, afterAction };

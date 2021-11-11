'use strict'

const index = require('./index');
const users = require('./users/users');

function configure(app) {
  app.use('/', index);
  app.use('/users', users);
}

module.exports = {
  configure: configure
}
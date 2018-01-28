'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

// For now this will only connect in development
// TODO: make this dynamic based on environment


var pool = new Pool({
  host: 'localhost',
  database: 'tunetrakr',
  port: '5432'
});

pool.connect(function (err, client, release) {
  if (err) throw new Error(err);

  var createUsersTable = 'CREATE TABLE users(id serial primary key, created_at timestamp default now(), updated_at timestamp default now(), email citext not null unique, password varchar(60) not null);';
  client.query(createUsersTable, function (err, results) {
    release();
  });
});

pool.end();
console.log('all tables created!!!');
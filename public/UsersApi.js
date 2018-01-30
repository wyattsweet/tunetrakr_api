'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pool = new _pg.Pool({
  host: 'localhost',
  database: 'tunetrakr',
  port: '5432'
});

var UsersApi = function () {
  function UsersApi() {
    _classCallCheck(this, UsersApi);
  }

  _createClass(UsersApi, [{
    key: 'createUser',

    // TODO: rewrite this as a promise
    value: function createUser(email, password) {
      return new Promise(function (res, rej) {
        pool.connect().then(function (client) {
          var queryText = 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';
          var values = [email, password];
          return client.query(queryText, values).then(function (data) {
            client.release();
            res(JSON.stringify(data.rows));
          });
        });
      });
    }
  }]);

  return UsersApi;
}();

exports.default = UsersApi;
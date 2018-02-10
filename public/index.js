'use strict';

require('babel-polyfill');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _UsersApi = require('./UsersApi');

var _UsersApi2 = _interopRequireDefault(_UsersApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var usersApi = new _UsersApi2.default();

app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));

// passes any errors that happen in await function to
// expresses default error handling
var asyncMiddleware = function asyncMiddleware(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

app.post('/api/v1/user', asyncMiddleware(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var reqData, hash, userData, cert, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reqData = req.body;
            _context.next = 3;
            return _bcrypt2.default.hash(reqData.password, 10);

          case 3:
            hash = _context.sent;
            _context.next = 6;
            return usersApi.createUser(reqData.email, String(hash));

          case 6:
            userData = _context.sent;

            console.log(userData);
            cert = _fs2.default.readFileSync('jwtRS256.key', 'utf8');
            token = _jsonwebtoken2.default.sign({ sub: 1, email: 'joe@shmo.com' }, cert, {
              algorithm: 'RS256'
            });

            res.send(token);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));

app.listen(3000);
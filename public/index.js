'use strict';

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

var app = (0, _express2.default)();
var usersApi = new _UsersApi2.default();

app.use(_bodyParser2.default.json());
// app.use(express.static(path.join(__dirname, '/public')))
// app.use()

// app.get('/', (req, res) => {
// })

app.post('/api/v1/user', function (req, res) {
  var reqData = req.body;
  _bcrypt2.default.hash(reqData.password, 10).then(function (hash) {
    usersApi.createUser(reqData.email, String(hash)).then(function (data) {
      var cert = _fs2.default.readFileSync('jwtRS256.key', 'utf8');
      var token = _jsonwebtoken2.default.sign({ sub: 1, email: 'joe@shmo.com' }, cert, {
        algorithm: 'RS256'
      });
      res.send(token);
    });
  });
});

app.listen(3000);
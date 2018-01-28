'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

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
  // create a user
  // hash password
  _bcrypt2.default.hash(reqData.password, 10).then(function (hash) {
    // save stuff to db
    usersApi.createUser(reqData.email, String(hash));
  });
});

app.listen(3000);
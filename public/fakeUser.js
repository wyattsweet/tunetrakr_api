'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailRes = function emailRes() {
  var response = [];
  var resourceLength = 20;
  return _faker2.default.internet.email().toUpperCase();

  //    for(let x = o; x < resourceLength; i++) {
  //      const resObj = {
  //        name: faker.name.findName(),
  //        email: faker.internet.email()
  //      }
  //      response.push(resObj)
  //    }
  // return response;
};

exports.default = emailRes;
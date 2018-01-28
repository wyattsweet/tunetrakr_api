'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fake = function () {
  function Fake() {
    _classCallCheck(this, Fake);
  }

  _createClass(Fake, [{
    key: 'emailRes',
    value: function emailRes() {
      var response = [];
      var resourceLength = 20;

      _lodash2.default.times(20, function () {
        var resObj = {
          name: _faker2.default.name.findName(),
          email: _faker2.default.internet.email()
        };
        response.push(resObj);
      });
      return response;
    }
  }]);

  return Fake;
}();

exports.default = Fake;
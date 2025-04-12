"use strict";

var PaymentStatus = require('../models/PaymentStatusModel');

exports.createPaymentStatus = function _callee(req, res) {
  var namePaymentStatus, newPaymentStatus;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          namePaymentStatus = req.body.namePaymentStatus;
          newPaymentStatus = new PaymentStatus({
            namePaymentStatus: namePaymentStatus
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newPaymentStatus.save());

        case 5:
          res.status(201).json({
            message: 'PaymentStatus created successfully',
            paymentStatus: newPaymentStatus
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllPaymentStatuss = function _callee2(req, res) {
  var paymentStatuss;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(PaymentStatus.find());

        case 3:
          paymentStatuss = _context2.sent;
          res.status(200).json(paymentStatuss);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPaymentStatusById = function _callee3(req, res) {
  var paymentStatus;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(PaymentStatus.findById(req.params.id));

        case 3:
          paymentStatus = _context3.sent;

          if (paymentStatus) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'PaymentStatus not found'
          }));

        case 6:
          res.status(200).json(paymentStatus);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.updatePaymentStatus = function _callee4(req, res) {
  var namePaymentStatus, paymentStatus;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          namePaymentStatus = req.body.namePaymentStatus;
          _context4.next = 4;
          return regeneratorRuntime.awrap(PaymentStatus.findByIdAndUpdate(req.params.id, {
            namePaymentStatus: namePaymentStatus
          }, {
            "new": true
          }));

        case 4:
          paymentStatus = _context4.sent;

          if (paymentStatus) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'PaymentStatus not found'
          }));

        case 7:
          res.status(200).json({
            message: 'PaymentStatus updated successfully',
            paymentStatus: paymentStatus
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.deletePaymentStatus = function _callee5(req, res) {
  var paymentStatus;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(PaymentStatus.findByIdAndDelete(req.params.id));

        case 3:
          paymentStatus = _context5.sent;

          if (paymentStatus) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'PaymentStatus not found'
          }));

        case 6:
          res.status(200).json({
            message: 'PaymentStatus deleted successfully'
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
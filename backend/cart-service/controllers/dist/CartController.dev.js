"use strict";

var Product = require('../../product-service/models/ProductsModels');

var Cart = require('../models/CartModel');

exports.createCart = function _callee(req, res) {
  var _req$body, quantity, productId, customerId, userId, existingCart, newCart;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, quantity = _req$body.quantity, productId = _req$body.productId, customerId = _req$body.customerId, userId = _req$body.userId;
          _context.next = 4;
          return regeneratorRuntime.awrap(Cart.findOne({
            customerId: customerId,
            productId: productId
          }));

        case 4:
          existingCart = _context.sent;

          if (!existingCart) {
            _context.next = 10;
            break;
          }

          existingCart.quantity += quantity;
          _context.next = 9;
          return regeneratorRuntime.awrap(existingCart.save());

        case 9:
          return _context.abrupt("return", res.status(200).json({
            message: 'Đã cập nhật số lượng sản phẩm trong giỏ',
            cart: existingCart
          }));

        case 10:
          newCart = new Cart({
            quantity: quantity,
            productId: productId,
            customerId: customerId,
            userId: userId
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newCart.save());

        case 13:
          res.status(201).json({
            message: 'Giỏ hàng đã được tạo thành công',
            cart: newCart
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.getAllCarts = function _callee2(req, res) {
  var carts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Cart.find().populate('customerId').populate('productId'));

        case 3:
          carts = _context2.sent;
          res.status(200).json(carts);
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

exports.getCartById = function _callee3(req, res) {
  var cart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(req.params.id).populate('customerId').populate('productId'));

        case 3:
          cart = _context3.sent;

          if (cart) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Cart not found'
          }));

        case 6:
          res.status(200).json(cart);
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

exports.updateCart = function _callee4(req, res) {
  var userId, _req$body2, productId, quantity, cart;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.params.userId;
          _req$body2 = req.body, productId = _req$body2.productId, quantity = _req$body2.quantity;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Cart.findOne({
            userId: userId,
            productId: productId
          }));

        case 5:
          cart = _context4.sent;

          if (cart) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Cart item not found'
          }));

        case 8:
          cart.quantity = quantity;
          _context4.next = 11;
          return regeneratorRuntime.awrap(cart.save());

        case 11:
          res.status(200).json({
            message: 'Cart updated successfully',
            cart: cart
          });
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.updateCartById = function _callee5(req, res) {
  var id, quantity, updatedCart;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id; // cartItemId

          quantity = req.body.quantity;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Cart.findByIdAndUpdate(id, {
            $set: {
              quantity: quantity
            }
          }, {
            "new": true
          }));

        case 5:
          updatedCart = _context5.sent;

          if (updatedCart) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Cart item not found'
          }));

        case 8:
          res.status(200).json({
            message: 'Cart updated successfully',
            cart: updatedCart
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // exports.removeCart = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { productId } = req.body; 
//         const cart = await Cart.findOne({ userId, productId });
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart item not found' });
//         }
//         await cart.remove();
//         res.status(200).json({
//             message: 'Cart item removed successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


exports.deleteCartItem = function _callee6(req, res) {
  var id, deletedItem;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Cart.findByIdAndDelete(id));

        case 4:
          deletedItem = _context6.sent;

          if (deletedItem) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Không tìm thấy mục giỏ hàng"
          }));

        case 7:
          res.status(200).json({
            message: "Xóa mục giỏ hàng thành công"
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getCartByUser = function _callee7(req, res) {
  var userId, carts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.params.userId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Cart.find({
            userId: userId
          }).populate('productId'));

        case 4:
          carts = _context7.sent;

          if (!(!carts || carts.length === 0)) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy giỏ hàng cho người dùng này'
          }));

        case 7:
          return _context7.abrupt("return", res.status(200).json(carts));

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);

          if (res.headersSent) {
            _context7.next = 14;
            break;
          }

          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
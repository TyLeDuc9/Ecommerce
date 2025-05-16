"use strict";

var Product = require("../models/ProductsModels");

var cloudinary = require("cloudinary").v2;

var Category = require("../../category-service/models/CategoryModel");

var User = require("../../user-service/models/UserModel");

var Seller = require("../../seller-service/models/SellerModels");

exports.createProduct = function _callee(req, res) {
  var _req$body, name, price, describe, status, categoryId, quantity, userId, sellerId, imageUrls, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, result, newProduct;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("BODY:", req.body);
          console.log("FILES:", req.files);
          _req$body = req.body, name = _req$body.name, price = _req$body.price, describe = _req$body.describe, status = _req$body.status, categoryId = _req$body.categoryId, quantity = _req$body.quantity, userId = _req$body.userId, sellerId = _req$body.sellerId;
          imageUrls = [];

          if (!(req.files && req.files.length > 0)) {
            _context.next = 34;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 9;
          _iterator = req.files[Symbol.iterator]();

        case 11:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 20;
            break;
          }

          file = _step.value;
          _context.next = 15;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(file.path, {
            folder: "products"
          }));

        case 15:
          result = _context.sent;
          imageUrls.push(result.secure_url);

        case 17:
          _iteratorNormalCompletion = true;
          _context.next = 11;
          break;

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 26:
          _context.prev = 26;
          _context.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context.prev = 29;

          if (!_didIteratorError) {
            _context.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context.finish(29);

        case 33:
          return _context.finish(26);

        case 34:
          newProduct = new Product({
            name: name,
            price: price,
            describe: describe,
            image: imageUrls,
            status: status,
            categoryId: categoryId,
            quantity: quantity,
            userId: userId,
            sellerId: sellerId
          });
          _context.next = 37;
          return regeneratorRuntime.awrap(newProduct.save());

        case 37:
          res.status(201).json({
            message: "Tạo sản phẩm thành công",
            product: newProduct
          });
          _context.next = 43;
          break;

        case 40:
          _context.prev = 40;
          _context.t1 = _context["catch"](0);
          res.status(500).json({
            message: _context.t1.message
          });

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 40], [9, 22, 26, 34], [27,, 29, 33]]);
};

exports.getAllProducts = function _callee2(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find().populate('categoryId', 'name').populate('sellerId', 'storeName').populate('userId'));

        case 3:
          products = _context2.sent;
          console.log(products);

          if (!(products.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'No products found'
          }));

        case 7:
          res.status(200).json({
            products: products
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getProductById = function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id).populate('categoryId').populate('sellerId').populate('userId'));

        case 3:
          product = _context3.sent;

          if (product) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Product not found"
          }));

        case 6:
          res.status(200).json(product);
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

exports.updateProduct = function _callee4(req, res) {
  var _req$body2, name, price, describe, status, categoryId, quantity, userId, sellerId, updatedFields, imageUrls, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file, result, product;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, describe = _req$body2.describe, status = _req$body2.status, categoryId = _req$body2.categoryId, quantity = _req$body2.quantity, userId = _req$body2.userId, sellerId = _req$body2.sellerId;
          updatedFields = {
            name: name,
            price: price,
            describe: describe,
            status: status,
            categoryId: categoryId,
            quantity: quantity,
            userId: userId,
            sellerId: sellerId
          };

          if (!(req.files && req.files.length > 0)) {
            _context4.next = 34;
            break;
          }

          imageUrls = [];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 8;
          _iterator2 = req.files[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 19;
            break;
          }

          file = _step2.value;
          _context4.next = 14;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(file.path, {
            folder: "products"
          }));

        case 14:
          result = _context4.sent;
          imageUrls.push(result.secure_url);

        case 16:
          _iteratorNormalCompletion2 = true;
          _context4.next = 10;
          break;

        case 19:
          _context4.next = 25;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](8);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 25:
          _context4.prev = 25;
          _context4.prev = 26;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 28:
          _context4.prev = 28;

          if (!_didIteratorError2) {
            _context4.next = 31;
            break;
          }

          throw _iteratorError2;

        case 31:
          return _context4.finish(28);

        case 32:
          return _context4.finish(25);

        case 33:
          updatedFields.image = imageUrls;

        case 34:
          _context4.next = 36;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(req.params.id, updatedFields, {
            "new": true
          }));

        case 36:
          product = _context4.sent;

          if (product) {
            _context4.next = 39;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Product not found"
          }));

        case 39:
          res.status(200).json({
            message: "Product updated successfully",
            product: product
          });
          _context4.next = 45;
          break;

        case 42:
          _context4.prev = 42;
          _context4.t1 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t1.message
          });

        case 45:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 42], [8, 21, 25, 33], [26,, 28, 32]]);
}; // Xóa sản phẩm


exports.deleteProduct = function _callee5(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(req.params.id));

        case 3:
          product = _context5.sent;

          if (product) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Product not found"
          }));

        case 6:
          res.status(200).json({
            message: "Product deleted successfully"
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

exports.searchProductName = function _callee6(req, res) {
  var name, nameCode, product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          name = req.query.name;
          nameCode = name.toLowerCase();
          _context6.next = 5;
          return regeneratorRuntime.awrap(Product.find({
            name: {
              $regex: nameCode,
              $options: "i"
            }
          }));

        case 5:
          product = _context6.sent;
          res.status(200).json(product);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.sortProduct = function _callee7(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Product.find().collation({
            locale: "vi",
            strength: 1
          }).sort({
            name: 1
          }));

        case 3:
          product = _context7.sent;
          res.json(product);
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t0.message
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPopularProducts = function _callee8(req, res) {
  var limit, products;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          limit = parseInt(req.query.limit) || 10;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Product.find().sort({
            views: -1
          }).limit(limit).populate("categoryId"));

        case 4:
          products = _context8.sent;

          if (!(products.length === 0)) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            message: "Không tìm thấy sản phẩm nào"
          }));

        case 7:
          res.status(200).json(products);
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getProductDetails = function _callee9(req, res) {
  var productId, product;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          productId = req.params.productId;
          _context9.next = 4;
          return regeneratorRuntime.awrap(Product.findById(productId).populate('categoryId', 'name').populate('sellerId', 'storeName storeAddress phone image'));

        case 4:
          product = _context9.sent;

          if (product) {
            _context9.next = 7;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            message: 'Sản phẩm không tồn tại'
          }));

        case 7:
          res.status(200).json(product);
          _context9.next = 14;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          console.error('Lỗi khi lấy chi tiết sản phẩm:', _context9.t0);
          res.status(500).json({
            message: 'Đã xảy ra lỗi server'
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getRelatedProducts = function _callee10(req, res) {
  var productId, currentProduct, relatedProducts;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          productId = req.params.productId; // Tìm sản phẩm hiện tại để lấy categoryId

          _context10.next = 4;
          return regeneratorRuntime.awrap(Product.findById(productId));

        case 4:
          currentProduct = _context10.sent;

          if (currentProduct) {
            _context10.next = 7;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            message: "Sản phẩm không tồn tại"
          }));

        case 7:
          _context10.next = 9;
          return regeneratorRuntime.awrap(Product.find({
            _id: {
              $ne: productId
            },
            categoryId: currentProduct.categoryId
          }).limit(5).populate('categoryId', 'name').populate('sellerId', 'storeName storeAddress phone image').select('name price image categoryId sellerId'));

        case 9:
          relatedProducts = _context10.sent;
          res.status(200).json(relatedProducts);
          _context10.next = 17;
          break;

        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          console.error("Lỗi khi lấy sản phẩm liên quan:", _context10.t0);
          res.status(500).json({
            message: "Đã xảy ra lỗi server"
          });

        case 17:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getProductsBySeller = function _callee11(req, res) {
  var sellerId, products;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          sellerId = req.params.sellerId;
          _context11.next = 4;
          return regeneratorRuntime.awrap(Product.find({
            sellerId: sellerId
          }).populate('categoryId', 'name').populate('sellerId', 'storeName storeAddress phone image').select('name price image categoryId'));

        case 4:
          products = _context11.sent;
          res.status(200).json(products);
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.error('Lỗi khi lấy sản phẩm theo seller:', _context11.t0);
          res.status(500).json({
            message: 'Đã xảy ra lỗi server'
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
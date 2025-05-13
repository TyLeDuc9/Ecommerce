const Product = require("../../product-service/models/ProductsModels");
const Cart = require("../models/CartModel");

//tao cart
exports.createCart = async (req, res) => {
  try {
    const { quantity, productId, userId } = req.body;

    // 1. Tìm customer theo userId
    let customer = await Customer.findOne({ userId });
    if (!customer) {
      // Nếu chưa có, tạo mới customer (lấy thông tin từ req.body hoặc để mặc định)
      customer = new Customer({
        userId,
        fullName: req.body.fullName || "No Name",
        email: req.body.email || "",
        phone: req.body.phone || "",
        address: req.body.address || "",
        birthday: req.body.birthday || null,
        gender: req.body.gender || "Khác",
      });
      await customer.save();
    }

    // 2. Kiểm tra cart đã tồn tại chưa
    const existingCart = await Cart.findOne({
      customerId: customer._id,
      productId,
    });

    if (existingCart) {
      existingCart.quantity += quantity;
      await existingCart.save();

      return res.status(200).json({
        message: "Đã cập nhật số lượng sản phẩm trong giỏ",
        cart: existingCart,
      });
    }

    // 3. Tạo mới cart
    const newCart = new Cart({
      quantity,
      productId,
      customerId: customer._id,
      userId,
    });
    await newCart.save();

    res.status(201).json({
      message: "Giỏ hàng đã được tạo thành công",
      cart: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// Lấy tất cả cart
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("customerId")
      .populate("productId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy cart theo id
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("customerId")
      .populate("productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật cart
exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId, productId });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cart.quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật cart theo id
exports.updateCartById = async (req, res) => {
  try {
    const { id } = req.params; // cartItemId
    const { quantity } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.removeCart = async (req, res) => {
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

// Xóa cart theo id
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Không tìm thấy mục giỏ hàng" });
    }
    res.status(200).json({ message: "Xóa mục giỏ hàng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa cart theo userId
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ userId: userId }).populate("productId");
    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
    }
    return res.status(200).json(carts);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};

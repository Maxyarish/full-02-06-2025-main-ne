const createError = require("http-errors");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

module.exports.getAllStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();

    res.status(200).send({data: { users: usersCount, orders: ordersCount, products: productsCount }});
  } catch (error) {
    next(createError(500, "Failed to retrieve stats"));
  }
};

const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");

const getAllUsers = async (req, res) => {
    try {

      const users = await User.find();

      if (!users.length) {
        return res.status(404).json({
          success: false,
          message: "No users found!",
        });
      }

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No users found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No users found!",
      });
    }

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getSummary = async (req, res) => {
  try {

    const totalSum = await Order.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }
  ]);

  res.status(200).json({ totalSum: totalSum[0]?.totalAmount || 0 });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getOrderChartData = async (req, res) => {
  try {
      const chartData = await Order.aggregate([
          {
              $group: {
                  _id: {
                      $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
                  },
                  totalAmount: { $sum: "$totalAmount" }
              }
          },
          { $sort: { _id: 1 } }
      ]);

      res.status(200).json(chartData);
  } catch (error) {
      console.error('Error fetching chart data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {getAllUsers, getAllOrders, getAllProducts, getSummary, getOrderChartData};
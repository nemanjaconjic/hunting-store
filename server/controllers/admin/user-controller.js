const User = require("../../models/User");

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

const deleteUser = async (req, res) => {
  try{
    const userId = req.params.id;;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "Success!"
    });
  }catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
};

module.exports = {getAllUsers, deleteUser};
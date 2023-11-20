const User = require("../models/User");

class AccountService {
  async update(data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        data.id,
        {
          $set: data.account,
        },
        { new: true }
      );

      return {
        status: "ok",
        msg: "Đã cập nhật tài khoản!",
        account: updatedUser,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUser(id) {
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.json({ status: "bad", msg: "Không tìm thấy tài khoản!" });
      }

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await User.find();

      if (!users) {
        return res.json({ status: "bad", msg: "Không tìm thấy thông tin!" });
      }

      return users;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);

      return { status: "ok", msg: "Tài khoản đã bị xóa!" };
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AccountService;

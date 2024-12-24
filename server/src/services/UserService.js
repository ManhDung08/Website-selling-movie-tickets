const User = require('../models/User');
const bcrypt = require('bcryptjs');

export const register = async (userData) => {
    try {
      const response = await axiosInstance.post('users/register',userData);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  export const login = async (loginData) => {
      try {
        const response = await axiosInstance.post('users/login',loginData);
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    };
    
exports.createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

exports.getUserById = async (userId) => {
    return User.findById(userId).select('-password');
};


// Lấy danh sách người dùng với phân trang
exports.getAllUsers = async (page = 1, limit = 10) => {
    const users = await User.find()
        .select('-password')
        .skip((page - 1) * limit)                // Bỏ qua các mục trước đó dựa trên trang và số mục mỗi trang
        .limit(limit);

    const totalUsers = await User.countDocuments();

    return {
        users,                                     //Data
        total: totalUsers,                         // Tổng số users
        page,                                      //Trang hiện tại
        pages: Math.ceil(totalUsers / limit),      //Tổng số trang
    };
};

// Tìm kiếm người dùng
exports.searchUsers = async (keyword, page = 1, limit = 10) => {
    const users = await User.find({
        $or: [
            { username: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
            { fullName: { $regex: keyword, $options: 'i' } }
        ]
    })
    .select('-password')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments({
        $or: [
            { username: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
            { fullName: { $regex: keyword, $options: 'i' } }
        ]
    });

    return {
        users,
        total: totalUsers,
        page,
        pages: Math.ceil(totalUsers / limit),
    };
};

// Lọc người dùng theo vai trò (nếu có)
exports.getUsersByRole = async (role, page = 1, limit = 10) => {
    const users = await User.find({ role })
        .select('-password')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments({ role });

    return {
        users,
        total: totalUsers,
        page,
        pages: Math.ceil(totalUsers / limit),
    };
};

exports.updateUser = async (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData, { new: true });  // Cập nhật thông tin người dùng và trả về bản ghi mới
};

exports.deleteUser = async (userId) => {
    return User.findByIdAndDelete(userId);
};

exports.changePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    return User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
};

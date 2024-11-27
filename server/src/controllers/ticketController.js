import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";
import Movie from "../models/movie.js";
import User from "../models/User.js";

// Tạo vé mới
export const newTicket = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie, existingUser;
  try {
    // Kiểm tra sự tồn tại của phim và người dùng
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database lookup failed", error: err });
  }

  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found With Given ID" });
  }

  let ticket;
  try {
    // Tạo đối tượng vé mới
    ticket = new Ticket({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    // Sử dụng giao dịch để bảo đảm tính toàn vẹn của dữ liệu
    const session = await mongoose.startSession();
    session.startTransaction();

    // Thêm vé vào danh sách vé của người dùng và phim
    existingUser.ticket.push(ticket);
    existingMovie.ticket.push(ticket);

    // Lưu tất cả các thay đổi trong session
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await ticket.save({ session });

    await session.commitTransaction();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Ticket creation failed", error: err });
  }

  if (!ticket) {
    return res.status(500).json({ message: "Unable to create a ticket" });
  }

  return res.status(201).json({ ticket: ticket });
};

// Lấy vé theo ID
export const getticketById = async (req, res, next) => {
  const id = req.params.id;
  let ticket;
  try {
    ticket = await Ticket.findById(id);
  } catch (err) {
    return res.status(500).json({ message: "Unexpected Error", error: err });
  }

  if (!ticket) {
    return res.status(404).json({ message: "Ticket Not Found" });
  }

  return res.status(200).json({ ticket });
};

// Xóa vé theo ID
export const deleteticket = async (req, res, next) => {
  const id = req.params.id;
  let ticket;
  try {
    ticket = await Ticket.findByIdAndDelete(id).populate("user movie");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket Not Found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    // Xóa vé khỏi danh sách vé của người dùng và phim
    await ticket.user.ticket.pull(ticket);
    await ticket.movie.ticket.pull(ticket);

    // Lưu thay đổi trên người dùng và phim
    await ticket.user.save({ session });
    await ticket.movie.save({ session });

    await session.commitTransaction();
  } catch (err) {
    return res.status(500).json({ message: "Deletion Failed", error: err });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};

const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const Showtime = require('../models/Showtime');
const User = require('../models/User');

const RESERVED_SEAT_TIMEOUT = 1000 * 60 * 10; // 10 minutes

export const newTicket = async (req, res, next) => {
  try {
    const { userId, showtimeId, seats, paymentMethod } = req.body;

    // kiem tra dau vao
    if (!userId || !showtimeId || !seats || seats.length === 0 || !paymentMethod) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // kiem tra lich chieu
    const showtime = await Showtime.findById(showtimeId).populate('movieId roomId theaterId');
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // kiem tra ghe 
    const reservedSeats = showtime.reservedSeats || [];
    for (const seat of seats) {
      const isReserved = reservedSeats.some(
        (reservedSeat) => reservedSeat.row === seat.row && reservedSeat.number === seat.number
      );
      if (isReserved) {
        return res.status(400).json({ message: 'Some selected seats are already reserved' });
      }
    }

    
    showtime.reservedSeats = [...reservedSeats, ...seats];
    await showtime.save();

    // giai phong ghe sau 10p
    setTimeout(async () => {
      const currentTicket = await Ticket.findOne({ showtimeId, userId, paymentStatus: 'pending' });
      if (!currentTicket) {
        // Release seats if ticket was not created or payment is not completed
        showtime.reservedSeats = showtime.reservedSeats.filter(
          (reservedSeat) => !seats.some(
            (seat) => seat.row === reservedSeat.row && seat.number === reservedSeat.number
          )
        );
        await showtime.save();
      }
    }, RESERVED_SEAT_TIMEOUT);

    // tinh tien
    let totalAmount = 0;
    for (const seat of seats) {
      if (seat.type === 'standard') totalAmount += showtime.price.standard;
      if (seat.type === 'vip') totalAmount += showtime.price.vip;
      if (seat.type === 'couple') totalAmount += showtime.price.couple;
    }

    // tao ma qr
    const bookingCode = `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const qrCode = `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // tao ve
    const newTicket = new Ticket({
      userId,
      showtimeId,
      seats,
      totalAmount,
      paymentStatus: 'pending',
      paymentMethod,
      bookingCode,
      qrCode,
    });

    
    await newTicket.save();

    
    user.tickets = user.tickets || [];
    user.tickets.push(newTicket._id);
    await user.save();

    
    return res.status(201).json({
      message: 'Ticket successfully created',
      ticket: newTicket,
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
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

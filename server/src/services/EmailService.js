const nodemailer = require('nodemailer');

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'dung08122003@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'lrxe pqmu oslk lbch'
    }
});

exports.sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'dung08122003@gmail.com',
      to: email,
      subject: 'Xác thực tài khoản của bạn',
      html: `
        <h2>Xác thực email của bạn</h2>
        <p>Cảm ơn bạn đã đăng ký! Vui lòng click vào link bên dưới để xác thực email của bạn:</p>
        <a href="${verificationUrl}">Xác thực email</a>
        <p>Link này sẽ hết hạn sau 24 giờ.</p>
        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
      `
    };
  
    return transporter.sendMail(mailOptions);
};

exports.resendVerificationEmail = async (email) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('Email không tồn tại');
    }

    if (user.isEmailVerified) {
        throw new Error('Email đã được xác thực');
    }

    // Tạo token mới
    const newToken = crypto.randomBytes(32).toString('hex');
    
    user.emailVerificationToken = newToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    
    await user.save();
    
    // Gửi lại email
    await sendVerificationEmail(user.email, newToken);
    
    return user;
};

// Format tiền tệ VND
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// Tạo nội dung email HTML
const createTicketEmailContent = (ticket, user) => {
    const seatList = ticket.seats.map(seat => 
        `Ghế ${seat.row}${seat.number} (${seat.type}) - ${formatCurrency(seat.price)}`
    ).join('<br>');

    const itemsList = ticket.items && ticket.items.length > 0 ? 
        ticket.items.map(item => 
            `${item.concessionId.name} x${item.quantity} - ${formatCurrency(item.price)}`
        ).join('<br>') : 
        'Không có đồ ăn/thức uống';

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a73e8;">Xác nhận đặt vé</h1>
            <p>Xin chào ${user.name},</p>
            <p>Cảm ơn bạn đã đặt vé tại rạp của chúng tôi. Dưới đây là thông tin chi tiết về vé của bạn:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #1a73e8;">Thông tin vé</h3>
                <p><strong>Mã đặt vé:</strong> ${ticket.bookingCode}</p>
                <p><strong>Phim:</strong> ${ticket.showtimeId.movieId.title}</p>
                <p><strong>Suất chiếu:</strong> ${new Date(ticket.showtimeId.startTime).toLocaleString('vi-VN')}</p>
                <p><strong>Rạp:</strong> ${ticket.showtimeId.roomId.theaterId.name}</p>
                <p><strong>Phòng:</strong> ${ticket.showtimeId.roomId.name}</p>
                
                <h4>Danh sách ghế:</h4>
                <p>${seatList}</p>
                
                <h4>Đồ ăn & Thức uống:</h4>
                <p>${itemsList}</p>
                
                <h4>Tổng tiền: ${formatCurrency(ticket.totalAmount)}</h4>
                <p><strong>Trạng thái thanh toán:</strong> ${
                    ticket.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'
                }</p>
            </div>

            <div style="margin: 20px 0;">
                <img src="${ticket.qrCode}" alt="QR Code" style="max-width: 200px;"/>
            </div>
            
            <p style="color: #666;">
                Vui lòng xuất trình mã QR này tại quầy vé để nhận vé và đồ ăn của bạn.
                Lưu ý: Vui lòng đến trước giờ chiếu 15-30 phút để không bỏ lỡ phần đầu của phim.
            </p>
            
            <p>Chúc bạn có buổi xem phim vui vẻ!</p>
        </div>
    `;
};

// Gửi email xác nhận đặt vé
exports.sendTicketConfirmationEmail = async (ticket, user) => {
    try {
        // Đợi populate các references cần thiết
        await ticket.populate([
            {
                path: 'showtimeId',
                populate: [
                    { path: 'movieId' },
                    { 
                        path: 'roomId',
                        populate: { path: 'theaterId' }
                    }
                ]
            },
            {
                path: 'items.concessionId'
            }
        ]);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Xác nhận đặt vé xem phim',
            html: createTicketEmailContent(ticket, user)
        };

        await transporter.sendMail(mailOptions);
        console.log('Email xác nhận đã được gửi đến:', user.email);
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        throw error;
    }
};
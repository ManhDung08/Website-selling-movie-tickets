    import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavbarComp from "../Components/Navbar/NavbarComp";
import FooterComp from "../Components/Footer/FooterComp";

    const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector((state)=>state.user)

    const userId = user.id

    const urlParams = new URLSearchParams(window.location.search);

    const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');



    useEffect(() => {

        const storedOrders = JSON.parse(localStorage.getItem("checkoutData")) || [];

        if(vnp_ResponseCode==="00"){

            const pendingOrder = storedOrders.find((order) => order.status === "pedding");



            if (pendingOrder) {

                console.log("Pending Order found:", pendingOrder);

                pendingOrder.status = "done";

                localStorage.setItem("checkoutData", JSON.stringify(storedOrders));

            }

        }

        console.log('storedOrders', storedOrders)

        const userOrders = storedOrders.filter((order) => order.user === userId);

        console.log('userOrders', userOrders)

        setOrders(userOrders);

    }, [userId]);

    console.log('orders', orders)

    return (
        <div >
            <NavbarComp></NavbarComp>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl text-center font-bold mb-4">Danh sách vé của bạn</h1>
                {orders.length === 0 ? (
                    <p className="text-gray-500">Chưa có vé nào.</p>
                ) : (
                    <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                        key={order.idOrder}
                        className="border p-4 rounded-lg shadow-md bg-gray-100"
                        >
                        <h2 className="text-lg font-bold">Đơn hàng: {order.idOrder}</h2>
                        <p>Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")} đ</p>
                        <p>Ghế đã chọn: {order.selectedSeats.join(", ")}</p>
                        <p>Bỏng nước đã chọn:</p>
                        <ul className="list-disc ml-6">
                            {order.Snacks.map((snack, index) => (
                            <li key={index}>
                                {snack.name} - {snack.price.toLocaleString("vi-VN")} đ
                            </li>
                            ))}
                        </ul>
                        </div>
                    ))}
                    </div>
                )}
            </div>
            <FooterComp></FooterComp>
        </div>
    );
    };

    export default OrderList;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AlertCanNotAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      allowOutsideClick: false,
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập bằng tài khoản admin!",
      confirmButtonText: "Quay về trang chủ",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); 
      }
    });
  }, [navigate]);

  return null; // Không cần thẻ rỗng <> </>
}

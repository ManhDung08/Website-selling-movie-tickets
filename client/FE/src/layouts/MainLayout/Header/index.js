import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { LOGOUT } from "../../../reducers/constants/Auth";
import { LOADING_BACKTO_HOME } from "../../../reducers/constants/Lazy";
import { getMovieList } from "../../../reducers/actions/Movie";
import { getTheaters } from "../../../reducers/actions/Theater";
import "./style.css";

const headMenu = [
    { nameLink: "Lịch chiếu", id: "lichchieu" },
    { nameLink: "Cụm rạp", id: "cumrap" },
    { nameLink: "Tin tức", id: "tintuc" },
    { nameLink: "Ứng dụng", id: "ungdung" },
];

export default function Header() {
    const { currentUser } = useSelector((state) => state.authReducer);
    const { isLoadingBackToHome } = useSelector((state) => state.lazyReducer);
    const dispatch = useDispatch();
    let location = useLocation();
    const history = useHistory();
    const [openDrawer, setOpenDrawer] = useState(false);

    // nếu đang mở drawer mà chuyển sang màn hình lớn thì phải tự đóng lại
    useEffect(() => {
        if (window.innerWidth >= 768 && openDrawer) {
            setOpenDrawer(false);
        }
    }, [openDrawer]);

    useEffect(() => {
        // clicklink > push to home > scrollTo after loading
        if (!isLoadingBackToHome) {
            setTimeout(() => {
                scroller.scrollTo(location.state, {
                    duration: 800,
                    smooth: "easeInOutQuart",
                });
            }, 200);
        }
    }, [isLoadingBackToHome]);

    const handleLogout = () => {
        setOpenDrawer(false);
        dispatch({ type: LOGOUT });
    };

    const handleLogin = () => {
        history.push("/login", location.pathname); // truyền kèm location.pathname để đăng nhập xong quay lại
    };

    const handleRegister = () => {
        history.push("/signUp", location.pathname);
    };

    const handleClickLogo = () => {
        if (location.pathname === "/") {
            dispatch(getMovieList());
            dispatch(getTheaters());
            return;
        }
        dispatch({ type: LOADING_BACKTO_HOME });
        setTimeout(() => {
            history.push("/", "");
        }, 50);
    };

    const handleClickLink = (id) => {
        setOpenDrawer(false);
        if (location.pathname === "/") {
            scroller.scrollTo(id, {
                duration: 800,
                smooth: "easeInOutQuart",
            });
        } else {
            dispatch({ type: LOADING_BACKTO_HOME });
            setTimeout(() => {
                history.push("/", id);
            }, 50);
        }
    };

    const handleUser = () => {
        history.push("/taikhoan");
        setOpenDrawer(false);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const toggleMenu = () => {
        setOpenDrawer(!openDrawer);
    };

    const closeMenu = () => {
        setOpenDrawer(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/" onClick={handleClickLogo}>
                    <img
                        src="https://t3.ftcdn.net/jpg/04/66/39/50/360_F_466395040_mj2YjwJe0qLlRXQk51kg0q8Jw9AwJp5r.jpg"
                        alt="logo"
                        style={{ height: 50 }}
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${openDrawer ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        {headMenu.map((link) => (
                            <li key={link.id} className="nav-item">
                                <a
                                    className="nav-link"
                                    href={`#${link.id}`}
                                    onClick={() => {
                                        handleClickLink(link.id);
                                        closeMenu();
                                    }}
                                >
                                    {link.nameLink}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item">
                            {currentUser ? (

                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <button className="btn btn-primary" onClick={handleUser}>
                                            <i className="fa fa-user"></i> Profiles - {currentUser.hoTen}
                                        </button>
                                    </li>
                                    <li className="list-inline-item">
                                        <button className="btn btn-danger" onClick={handleLogout}>
                                            Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            ) : (
                                <div>
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={handleLogin}
                                    >
                                        Đăng nhập
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleRegister}
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
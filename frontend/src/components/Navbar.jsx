import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // adjust path if needed

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Get user and cartItems from Redux store
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 relative group px-2 py-1 ${
      isActive ? "text-black" : "text-gray-700"
    }`;

  const activeUnderline = (
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300"></span>
  );

  return (
    <div className="relative z-30">
      <div className="flex items-center justify-between py-5 font-medium px-4">
        <Link to="/">
          <img
            src={assets.logo}
            className="w-36 rounded-full shadow-lg cursor-pointer"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navbar */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className={navLinkClass}>
            <p>HOME</p>
            {location.pathname === "/" && activeUnderline}
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            <p>COLLECTION</p>
            {location.pathname === "/collection" && activeUnderline}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            <p>ABOUT</p>
            {location.pathname === "/about" && activeUnderline}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            <p>CONTACT</p>
            {location.pathname === "/contact" && activeUnderline}
          </NavLink>

          {location.pathname !== "/login" && (
            <NavLink
              to="/adminlogin"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 rounded-[70px_30px_70px_30px] shadow-md hover:brightness-110 transition-all duration-200 ${
                  isActive ? "ring-2 ring-offset-2 ring-purple-500" : ""
                }`
              }
            >
              <p>ADMIN</p>
            </NavLink>
          )}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-7 relative">
          {/* Search Bar (to the left of icon) */}
          <div className="relative">
            {showSearchBar && (
              <input
                type="text"
                placeholder="Search"
                className="placeholder:text-xs absolute right-7 top-1/2 -translate-y-1/2 border px-2 py-1 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 w-16 sm:w-48 bg-white z-50"
              />
            )}
            <img
              onClick={() => setShowSearchBar(!showSearchBar)}
              src={assets.search_icon}
              className="w-5 cursor-pointer relative z-10"
              alt="Search"
            />
          </div>

          {/* Profile/Login */}
          {user ? (
            <div className="relative group z-50">
              <img
                src={assets.profile_icon}
                className="w-10 cursor-pointer"
                alt="Profile"
              />
              <div className="absolute hidden group-hover:block right-0 pt-4 z-50">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-700 rounded-md shadow-xl border border-gray-200">
                  <p
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:text-black"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    My Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <img
              className="w-12 rounded-3xl hover:brightness-110 hover:scale-110 cursor-pointer hover:shadow-lg"
              src={assets.login}
              onClick={handleLogin}
              alt="Login"
            />
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -bottom-1 bg-black w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-40 ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt="Back"
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border"
              to="/contact"
            >
              CONTACT
            </NavLink>

            {location.pathname !== "/login" && (
              <NavLink
                onClick={() => setVisible(false)}
                className="py-4 pl-6 border bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-[70px_30px_70px_30px] mx-4 mt-4 text-center shadow-md"
                to="/adminlogin"
              >
                ADMIN
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

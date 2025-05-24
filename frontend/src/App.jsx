import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Success from "./pages/Success";

// ✅ Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Logout from "./pages/Logout";
import TrackPackage from "./pages/TrackPackage";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminOrders from "./pages/Admin/AdminOrders";
import AddItem from "./pages/Admin/AddItem";
import Items from "./pages/Admin/Items";
import SampleDetail from "./pages/SampleDetail";

const App = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <Navbar />
        <SearchBar />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/track-package" element={<TrackPackage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/additem" element={<AddItem />} />
          <Route path="/admin/items" element={<Items />} />

          <Route path="/sample/:id" element={<SampleDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import AdminHome from './Modules/Admin/AdminHome';
import ManageServices from './Modules/Seller/Components/ManageProducts';
import CustomerHome from './Modules/Customer/CustomerHome';
import MyBooking from './Modules/Customer/Components/MyBookings';
import SellerHome from './Modules/Seller/SellerHome';
import Products from './Modules/Customer/Components/Products';
import Cart from './Modules/Customer/Cart';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SellerHome" element={<SellerHome />} />
        <Route path="/ManageServices" element={<ManageServices />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyBookings" element={<MyBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

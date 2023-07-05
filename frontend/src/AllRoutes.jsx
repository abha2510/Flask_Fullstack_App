import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Menu from './components/Menu';
import AddItems from './components/AddItems';
import Orders from './components/Orders';

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/menu" element={<Menu />}></Route>
                <Route path="/add" element={<AddItems />}></Route>
                <Route path="/orders" element={<Orders />}></Route>
            </Routes>
        </div>
    )
}

export default AllRoutes
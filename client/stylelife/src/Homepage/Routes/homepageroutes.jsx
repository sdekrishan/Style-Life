import { Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "../Homepage";
import Products from "../../components/Products";
import SingleProduct from "../../components/SingleProduct";
import PaymentPage from "../../Add To Cart/PaymentPage/PaymentPage";
import AdminHome from "../../pages/Admin/AdminHome";
import ErrorPage from "../../components/ErrorPage";
import PrivateRoute from "../../components/PrivateRoute";
import Saloon from "../pages/Saloon";
import Buffetpage from "../../Homepage/pages/Buffetpage";
import UserPrivateRoute from "../../components/UserPrivateRoute";
const Homepageroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/restaurant"
          element={<Products category="restro" />}
        ></Route>
        <Route path="/spa" element={<Products category="spa" />}></Route>
        <Route path="/health" element={<Products category="health" />}></Route>
        <Route path="/saloon" element={<Saloon />}></Route>
        <Route path="/buffet" element={<Buffetpage />}></Route>
        <Route
          path="/ProductDetails/:id"
          element={
            <UserPrivateRoute>
              <SingleProduct />
            </UserPrivateRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Homepageroutes;

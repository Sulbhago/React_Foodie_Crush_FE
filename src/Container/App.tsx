import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  Register,
  ShoppingCart,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { RootState } from "../Storage/Redux/store";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    if (userData.id) setSkip(false);
  }, [userData]);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="/menuItem/menuitemlist" element={<MenuItemList />} />
          <Route
            path="/menuItem/menuItemUpsert/:id"
            element={<MenuItemUpsert />}
          />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

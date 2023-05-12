import React from "react";
import { Route, Routes } from "react-router-dom";
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
} from "../../Components";

function Router() {
  return (
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
        <Route path="/authentication" element={<AuthenticationTest />}></Route>
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
  );
}

export default Router;

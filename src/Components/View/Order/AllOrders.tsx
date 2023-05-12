import React from "react";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import { MainLoader } from "../../Common";
import OrderList from "../../Page/Order/OrderList";
import { withAdminAuth } from "../../../HOC";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  return (
    <>
      {" "}
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data?.apiResponse.result} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);

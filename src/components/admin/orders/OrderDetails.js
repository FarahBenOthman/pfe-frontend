import React from "react";
import OrderDetailsComp from "../../../pages/order/OrderDetailsComp";
import ChangeOrderStatus from "../../../components/admin/ChangeOrderStatus/ChangeOrderStatus"

const OrderDetails = () => {
    
  return (
  <>
  <OrderDetailsComp orderPageLink={"/admin/orders"} />;
  <ChangeOrderStatus/>
  </>
  )
};

export default OrderDetails;
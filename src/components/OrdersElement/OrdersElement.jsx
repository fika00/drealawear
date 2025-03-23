import OrderStatus from "../OrderStatus/OrderStatus";
import {
  formatDateToDDMMYYYY,
  getImageFromProductInstanceId,
} from "../utils/misc";
import { getOrderStatusText } from "../utils/OrderStatus";
import "./OrdersElement.scss";

const OrderContent = ({ orderItems }) => {
  const firstThreeItems = orderItems.slice(0, 2);

  const hasMoreThanThreeItems = orderItems.length > 3;
  return (
    <div className="ordercontent-container ">
      {firstThreeItems.map((item, i) => (
        <div
          className="ordercontent-container-inner"
          style={{
            right: `${(i + (hasMoreThanThreeItems ? 1 : 0)) * 50}px`,
          }}
          key={i}
        >
          <img
            src={getImageFromProductInstanceId(item?.productInstanceId)}
            className="ordercontent-container-inner-img"
            alt={item.name}
          />
        </div>
      ))}

      {orderItems.length > 3 && (
        <div
          style={{
            zIndex: 3,
            right: "0px",
          }}
          className="ordercontent-container-inner ordercontent-container-inner-blank"
        >
          <span className="ordercontent-container-inner-moreitems">
            +{orderItems.length - 2}
          </span>
        </div>
      )}
    </div>
  );
};

const OrdersElement = ({ data }) => {
  const createdAtDate = formatDateToDDMMYYYY(data?.createdAt);

  console.log(data);
  return (
    <div className="orderselement-container">
      <OrderContent orderItems={data?.orderItems} />

      <span className="orderselement-container-left-ordernum text-bold">
        {data?.orderNumber}
      </span>
      <span className="orderselement-container-left-text orderselement-container-left-text-date text-bold">
        {createdAtDate}
      </span>

      <span className="orderselement-container-left-text  text-bold">
        {data?.totalPrice}€
      </span>
      <OrderStatus text={getOrderStatusText(data.status)} />
    </div>
  );
};

export default OrdersElement;

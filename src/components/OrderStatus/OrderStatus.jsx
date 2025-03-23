import "./OrderStatus.scss";
const OrderStatus = ({ text }) => {
  return (
    <div
      className={`orderstatus-container ${
        text ? `orderstatus-container-${text.toLowerCase()}` : ""
      }`}
    >
      <span className="orderstatus-container-text">{text}</span>
    </div>
  );
};

export default OrderStatus;

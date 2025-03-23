import { COUNTRIES } from "../utils/countries";
import "./ShippingCostInfo.scss";

const ShippingCostInfo = ({ data }) => {
  const country = COUNTRIES[data?.shippingCountry].title;
  const date = new Date(data?.estimatedDeliveryDate);

  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="shippingcostinfo-container">
      <span className="shippingcostinfo-container-top">
        Standard shipping:{" "}
        <span className="shippingcostinfo-container-top-bold">
          {data?.shippingCost}€
        </span>
      </span>
      <span className="shippingcostinfo-container-bottom">
        Estimated delivery to{" "}
        <span className="shippingcostinfo-container-bottom-bold">
          {country}
        </span>{" "}
        on{" "}
        <span className="shippingcostinfo-container-bottom-bold">
          {formattedDate}
        </span>
      </span>
    </div>
  );
};

export default ShippingCostInfo;

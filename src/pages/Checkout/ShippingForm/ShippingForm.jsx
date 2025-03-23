import { useEffect, useState } from "react";
import AddressSelector from "../../../components/AddressSelector/AddressSelector";
import InputField from "../../../components/InputField/InputField";
import ThirdMenuButton from "../../../components/ThirdMenuButton/ThirdMenuButton";
import "./ShippingForm.scss";
import { api, version } from "../../../components/utils/api";
import useCart from "../../../components/utils/useCart";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation } from "@tanstack/react-query";
import ShippingCostInfo from "../../../components/ShippingCostInfo/ShippingCostInfo";

const ShippingForm = () => {
  const { orderId } = useCart();

  const authHeader = useAuthHeader();

  const {
    mutate: getShippingCosts,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${api}/v${version}/Order/order-checkout-payment/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error getting shipping costs");
      }

      return response.json();
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error getting addresses.:", error);
    },
  });

  useEffect(() => {
    getShippingCosts();
  }, []);

  const {
    mutate: goToPayment,
    data: paymentData,
    isPending: isPaymentPending,
    error: paymentError,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Payment/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
          // Add CORS headers
          mode: "no-cors", // Add this line
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
        redirect: "manual",
      });

      console.log("RESPONSE", response);

      // if (response.status === 302) {
      //   const redirectUrl = response.headers.get("Location");
      //   window.location.href = redirectUrl;
      //   return;
      // }

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      return response.json();
      // return response;
    },
    onSuccess: (data) => {
      if (data?.link) {
        window.location.href = data.link;
      }
      console.log("DATA", data);
    },
    onError: (error) => {
      console.error("Error going to payment.:", error);
    },
  });

  return (
    <div className="shippingform-container">
      <div className="shippingform-container-inner">
        <h1 className="shippingform-container-inner-header">Checkout</h1>

        <div className="shippingform-container-inner-stage">
          Information {">"} Payment
        </div>

        <div className="shippingform-container-inner-formsection">
          <span className="shippingform-container-inner-formsection-header">
            Shipping
          </span>
          <div className="shippingform-container-inner-formsection-input">
            {data && <ShippingCostInfo data={data} />}
          </div>
        </div>

        <ThirdMenuButton onClick={goToPayment} wide={true} text={"Pay"} />
      </div>
    </div>
  );
};

export default ShippingForm;

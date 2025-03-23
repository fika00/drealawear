import { useEffect, useState } from "react";
import AddressSelector from "../../../components/AddressSelector/AddressSelector";
import InputField from "../../../components/InputField/InputField";
import ThirdMenuButton from "../../../components/ThirdMenuButton/ThirdMenuButton";
import "./CheckoutForm.scss";
import { api, version } from "../../../components/utils/api";
import useCart from "../../../components/utils/useCart";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ onSuccess }) => {
  const [checkoutFormData, setCheckoutFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [addressInfo, setAddressInfo] = useState({});

  const { orderId } = useCart();

  const authHeader = useAuthHeader();

  const handleFormData = (value, key) => {
    setCheckoutFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {}, [checkoutFormData]);

  const handleAddressChange = (data) => {
    setAddressInfo(data);
  };

  //   post req

  //   "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "city": "string",
  //   "postalCode": "string",
  //   "country": 0,
  //   "street": "string",
  //   "saveAddress": true,
  //   "firstName": "string",
  //   "lastName": "string",
  //   "email": "string"
  // }

  const {
    mutate: addAddress,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const body = {
        orderId: orderId,
        addressId: addressInfo.addressId,
        email: checkoutFormData.email,
        firstName: checkoutFormData.firstName,
        lastName: checkoutFormData.lastName,
      };

      console.log(addressInfo);

      const response = await fetch(`${api}/v${version}/Order/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      // return response.json();
    },
    onSuccess: (data) => {
      onSuccess();
    },
    onError: (error) => {
      console.error("Address failed:", error); // Changed data to error and
    },
  });

  return (
    <div className="checkoutform-container">
      <div className="checkoutform-container-inner">
        <h1 className="checkoutform-container-inner-header">Checkout</h1>

        <div className="checkoutform-container-inner-stage">
          Information {">"} Payment
        </div>

        <div className="checkoutform-container-inner-formsection">
          <span className="checkoutform-container-inner-formsection-header">
            Contact
          </span>
          <div className="checkoutform-container-inner-formsection-input">
            <InputField
              inputData={{
                type: "email",
                id: "email",
                name: "email",
                required: true,
              }}
              text={checkoutFormData.email}
              onChange={(value) => handleFormData(value, "email")}
            />
            <div></div>
            <InputField
              inputData={{
                name: "First Name",
              }}
              text={checkoutFormData.firstName}
              onChange={(value) => handleFormData(value, "firstName")}
            />
            <InputField
              text={checkoutFormData.lastName}
              inputData={{ name: "Last name" }}
              onChange={(value) => handleFormData(value, "lastName")}
            />
          </div>
        </div>
        <div className="checkoutform-container-inner-formsection">
          <span className="checkoutform-container-inner-formsection-header">
            Addresses
          </span>
          <AddressSelector onChange={handleAddressChange} />
        </div>
        <ThirdMenuButton onClick={addAddress} wide={true} text={"Pay"} />
      </div>
    </div>
  );
};

export default CheckoutForm;

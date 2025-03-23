import { useEffect, useState } from "react";
import CountrySelector from "../CountrySelector/CountrySelector";
import InputField from "../InputField/InputField";
import ThirdMenuButton from "../ThirdMenuButton/ThirdMenuButton";
import { api, version } from "../utils/api";
import "./AddNewAddress.scss";
import { useToast } from "../utils/ToastContext";
import { useMutation } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useModal } from "../utils/ModalProvider";
const AddressField = ({ label, onChange }) => {
  return (
    <div className="addnewaddress-container-form">
      <span className="addnewaddress-container-form-label">{label}</span>
      <InputField onChange={onChange} />
    </div>
  );
};

const AddNewAddress = ({ onComplete }) => {
  const fields = ["Street", "City", "State", "Postal Code"];

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState();

  const { addToast } = useToast();

  const authHeader = useAuthHeader();

  const { closeModal } = useModal();

  const {
    mutate: addNewAddress,
    data,
    isPending,
    error,
  } = useMutation({
    // Remove 'useMutation:' and directly provide the mutation function
    mutationFn: async () => {
      const addressData = {
        street,
        city,
        state,
        postalCode,
        country: country.index,
      };

      const response = await fetch(`${api}/v${version}/User/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      // return response.json();
    },
    onSuccess: (data) => {
      addToast("Success.", "success"); // Changed error to success for success message
      onComplete();
      closeModal();
    },
    onError: (error) => {
      console.error("Address failed:", error); // Changed data to error and
      addToast("Failed.", "error");
    },
  });

  useEffect(() => {
    const addressData = {
      street,
      city,
      state,
      postalCode,
      country,
    };

    const body = JSON.stringify(addressData);
  }, [street, city, state, postalCode, country]);

  const callbacks = [setStreet, setCity, setState, setPostalCode];

  useEffect(() => {}, [country]);

  return (
    <div className="addnewaddress-container">
      {fields.map((label, i) => (
        <AddressField onChange={callbacks[i]} label={label} key={i} />
      ))}
      <div className="addnewaddress-container-form">
        <span className="addnewaddress-container-form-label">Country</span>

        <CountrySelector selectedCountry={country} onChange={setCountry} />
      </div>
      <ThirdMenuButton
        onClick={addNewAddress}
        text={!isPending ? "Confirm" : "..."}
      />
    </div>
  );
};

export default AddNewAddress;

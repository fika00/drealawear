import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import RadioButton from "../../RadioButton/RadioButton";
import { COUNTRIES } from "../../utils/countries";
import "./ExistingAddress.scss";
import { api, version } from "../../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../utils/ToastContext";

const ExistingAddress = ({
  data,
  isSelected,
  index,
  onClick,
  profile,
  onRemove,
}) => {
  const onClickHandler = () => {
    onClick(index);
  };

  const { addToast } = useToast();

  const authHeader = useAuthHeader();

  const {
    mutate: removeAddress,
    // data: removeAddressData,
    isPending,
    error,
  } = useMutation({
    // Remove 'useMutation:' and directly provide the mutation function
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/User/address`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ addressId: data.addressId }),
      });

      if (!response.ok) {
        // throw new Error("Failed to remove address");
      }

      // return response.json();
    },
    onSuccess: (data) => {
      addToast("Address removed", "success");
      if (typeof onRemove === "function") onRemove();
    },
    onError: (error) => {
      addToast("Address removal failed", "error");
    },
  });

  return (
    <div
      className={`existingaddress-container ${
        isSelected ? "existingaddress-container-selected" : ""
      }`}
      onClick={onClickHandler}
    >
      <div className="existingaddress-container-left">
        <span className="existingaddress-container-left-text">
          {data.street}, {data.city}
        </span>
        <span className="existingaddress-container-left-text">
          {data.code},{" "}
          {COUNTRIES.find((country) => country.index === data.country).title}
        </span>
      </div>
      {!profile ? (
        <RadioButton isSelected={isSelected} />
      ) : (
        <div
          className="existingaddress-container-remove"
          onClick={removeAddress}
        >
          <img
            src="/icons/e-remove_dark.svg"
            className="existingaddress-container-remove-icon"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default ExistingAddress;

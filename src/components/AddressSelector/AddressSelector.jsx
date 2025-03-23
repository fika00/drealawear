import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import AddNewAddress from "../AddNewAddress/AddNewAddress";
import { useModal } from "../utils/ModalProvider";
import "./AddressSelector.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, version } from "../utils/api";
import { useEffect, useState } from "react";
import AddNewAddressButton from "./AddNewAddressButton/AddNewAddressButton";
import ExistingAddress from "./ExistingAddress/ExistingAddress";

const AddressSelector = ({ profile = false, onChange }) => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const [localData, setLocalData] = useState([]);

  const authHeader = useAuthHeader();

  const queryClient = useQueryClient();

  const {
    mutate: getAddressList,
    data,
    isPending,
    error,
    onAddressRemove,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Order/order-addresses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      return response.json();
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error getting addresses.:", error);
    },
  });

  useEffect(() => {
    getAddressList();
  }, []);

  const onAddressChangeHandler = (index) => {
    if (!profile) {
      setCurrentSelected(index);
    }
  };

  useEffect(() => {
    if (data && typeof onChange === "function") {
      onChange(data[currentSelected]);
    }
  }, [currentSelected, data]);

  return (
    <div
      className={`addressselector-container unselectable ${
        isPending ? "addressselector-container-loading" : ""
      }
      ${profile ? "addressselector-container-profile" : ""}
      `}
      data-lenis-prevent
    >
      {localData?.map((address, i) => (
        <ExistingAddress
          onRemove={getAddressList}
          isSelected={i === currentSelected}
          key={i}
          index={i}
          data={address}
          onClick={onAddressChangeHandler}
          profile={profile}
        />
      ))}
      {data?.map((address, i) => (
        <ExistingAddress
          onRemove={getAddressList}
          isSelected={i === currentSelected}
          key={i}
          index={i}
          data={address}
          onClick={onAddressChangeHandler}
          profile={profile}
        />
      ))}

      <AddNewAddressButton onComplete={() => getAddressList()} />
    </div>
  );
};

export default AddressSelector;

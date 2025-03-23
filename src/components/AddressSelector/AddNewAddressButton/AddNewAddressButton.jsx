import plus from "/icons/plus.svg";
import "./AddNewAddressButton.scss";
import AddNewAddress from "../../AddNewAddress/AddNewAddress";
import { useModal } from "../../utils/ModalProvider";

const AddNewAddressButton = ({ onComplete }) => {
  const { openModal } = useModal();

  const handleOnComplete = () => {
    if (typeof onComplete === "function") {
      onComplete();
    }
  };

  const onAddAddress = () => {
    openModal({
      header: "Add new address",
      content: <AddNewAddress onComplete={handleOnComplete} />,
    });
  };

  return (
    <div onClick={onAddAddress} className="addnewaddressbutton-container">
      <img src={plus} alt="" className="addnewaddressbutton-container-plus" />
      <span className="addnewaddressbutton-container-text">Add address</span>
    </div>
  );
};

export default AddNewAddressButton;

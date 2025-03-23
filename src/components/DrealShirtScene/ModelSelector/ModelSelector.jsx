import { useEffect, useState } from "react";
import "./ModelSelector.scss";

const ModelSelector = ({ onShirtModelChange }) => {
  const [currentModel, setCurrentModel] = useState(0);

  const onClickHandler = (model) => {
    setCurrentModel(model);
    onShirtModelChange(model);
  };

  return (
    <div className="modelselector-container">
      <button
        className={`modelselector-container-button ${
          currentModel === 0 ? "modelselector-container-button-active" : ""
        }`}
        onClick={() => onClickHandler(0)}
      >
        Lifestyle
      </button>
      <button
        className={`modelselector-container-button ${
          currentModel === 1 ? "modelselector-container-button-active" : ""
        }`}
        onClick={() => onClickHandler(1)}
      >
        Blueprint
      </button>
    </div>
  );
};

export default ModelSelector;

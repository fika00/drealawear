import { useEffect, useState } from "react";
import "./TopSlashTransition.scss";

const TopSlashTransition = () => {
  return (
    <div className="topslashtransition-container-wrapper">
      <div className="topslashtransition-container">
        <div className="topslashtransition-container-inner">
          <div className="topslashtransition-container-inner-textcontainer">
            <span className="topslashtransition-container-inner-textcontainer-text topslashtransition-container-inner-textcontainer-text-dark">
              View it through others' eyes
            </span>
            <span className="topslashtransition-container-inner-textcontainer-text  ">
              And experience it.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSlashTransition;

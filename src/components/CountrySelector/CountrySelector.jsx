import { useEffect, useState } from "react";
import { COUNTRIES } from "../utils/countries";
import "./CountrySelector.scss";
import { motion } from "framer-motion";
const CountrySelectorElement = ({ index, country, onClickCallback }) => {
  const onClickHandler = () => {
    onClickCallback({ title: country.title, index: index });
  };

  const imgSize = "32";
  const imgSrc = `https://flagsapi.com/${country.value}/flat/${imgSize}.png`;
  return (
    <div
      onClick={onClickHandler}
      className="countryselector-container-list-element"
    >
      <div className="countryselector-container-list-element-inner">
        <span className="countryselector-container-list-element-inner-text">
          {country.title}
        </span>
        <div className="countryselector-container-list-element-inner-imgcont">
          <img
            className="countryselector-container-list-element-inner-imgcont-img"
            src={imgSrc}
          />
        </div>
      </div>
    </div>
  );
};

const CountrySelector = ({ onChange, selectedCountry }) => {
  const [search, setSearch] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandler = () => setIsFocused(true);
  const closeHandler = () => setIsFocused(false);

  const onChangeHandler = (country) => {
    onChange(country);
    setSearch("");
    closeHandler();
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const filteredCountries = COUNTRIES.filter((country) =>
    country.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="countryselector-container">
      <input
        // onChange={searchHandler}
        onFocus={onFocusHandler}
        onChange={searchHandler}
        className="inputfield-container countryselector-container-input"
        value={search || selectedCountry?.title || ""}
      />
      {isFocused && (
        <div data-lenis-prevent className="countryselector-container-list">
          {filteredCountries.map((country) => (
            <CountrySelectorElement
              onClickCallback={onChangeHandler}
              country={country}
              key={country.index}
              index={country.index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;

const frameloop = () => {
  const condition = true;

  if (condition) {
    return "always";
  } else {
    return "demand";
  }
};

export default frameloop;

const Fit = {
  0: "S",
  1: "M",
  2: "L",
  3: "XL",
};

export function getSize(fitValue) {
  return Fit[fitValue] || "Unknown size";
}

export function getFitIndex(size) {
  const entry = Object.entries(Fit).find(([key, value]) => value === size);
  return entry ? parseInt(entry[0], 10) : -1; // Return -1 if not found
}

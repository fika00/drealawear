// Image paths
const lifestyleOffWhite = "/cataloguepics/lifestyle/lifestyle-white.webp";
const lifestyleJetBlack = "/cataloguepics/lifestyle/lifestyle-black.webp";
const lifestyleSandstorm = "/cataloguepics/lifestyle/lifestyle-cappuchino.webp";
const drealOffWhite = "/cataloguepics/dreal/dreal-white.webp";
const drealJetBlack = "/cataloguepics/dreal/dreal-black.webp";
const drealSandstorm = "/cataloguepics/dreal/dreal-cappuchino.webp";

// Map GUIDs to image paths
const guidToImageMap = {
  // Lifestyle (LSC) - OffWhite
  "085c19ca-2e05-4f6a-ba25-a76e07df35ee": lifestyleOffWhite, // LSC-M-OFF_WHITE
  "18be1250-8f6d-4d50-8df6-c4585cb7a3ab": lifestyleOffWhite, // LSC-L-OFF_WHITE
  "bedb7b97-af40-4131-a8bc-01f9681ba424": lifestyleOffWhite, // LSC-XL-OFF_WHITE
  "1aad9a3d-87c5-4487-8866-2e671c75c308": lifestyleOffWhite, // LSC-S-OFF_WHITE

  // Lifestyle (LSC) - Black
  "6dc870ae-4498-49a6-a9e1-a9a7632578c6": lifestyleJetBlack, // LSC-S-BLACK
  "a8197eb9-1513-47a1-bc9b-f937a086fb7f": lifestyleJetBlack, // LSC-M-BLACK
  "8fd0cea9-0062-432a-8ef0-e85b2f5db3db": lifestyleJetBlack, // LSC-L-BLACK
  "3062bf63-bca2-46e6-af34-a6e00eebe2cb": lifestyleJetBlack, // LSC-XL-BLACK

  // Lifestyle (LSC) - Beige
  "1ac7e02e-54d8-423d-9b5c-0acc87fccb7b": lifestyleSandstorm, // LSC-S-BEIGE
  "0f6fde6d-a88a-4c48-9510-8df2af8ba399": lifestyleSandstorm, // LSC-M-BEIGE
  "c10140d3-efff-487f-b24b-c8f5f03e94fc": lifestyleSandstorm, // LSC-L-BEIGE
  "982c9100-1aa4-4234-8a84-a9261f4f580f": lifestyleSandstorm, // LSC-XL-BEIGE

  // Dreal (DRL) - OffWhite
  "3720ed8a-9694-4efa-a6c7-35e891d220ed": drealOffWhite, // DRL-S-OFF_WHITE
  "9f2985c8-bfd4-4515-b3fa-ac520287765e": drealOffWhite, // DRL-M-OFF_WHITE
  "8b1b9ae8-b877-47be-8f7c-1cd7beb073b9": drealOffWhite, // DRL-L-OFF_WHITE
  "c9b2493a-555a-462a-a7f4-1573d1e7b8c1": drealOffWhite, // DRL-XL-OFF_WHITE

  // Dreal (DRL) - Black
  "9e017597-e56d-4c29-9b57-d3a3cf92bce9": drealJetBlack, // DRL-S-BLACK
  "ceef71d4-911d-4938-8a62-486ca8a4aca2": drealJetBlack, // DRL-M-BLACK
  "3bde6524-f60f-476a-81a9-ded827fbbcfe": drealJetBlack, // DRL-L-BLACK
  "89b70d12-6354-4de7-869f-07b0bb95d6c4": drealJetBlack, // DRL-XL-BLACK

  // Dreal (DRL) - Beige
  "0c40e800-39b8-4ec1-b1af-b741d5a7ef89": drealSandstorm, // DRL-S-BEIGE
  "0264262f-16a3-4323-8c72-3e543b73b09a": drealSandstorm, // DRL-M-BEIGE
  "e3dfa824-33fb-455c-b1f0-4cc8b54fad9c": drealSandstorm, // DRL-L-BEIGE
  "c65ac897-afc6-469b-8fb1-a4d9f8db6c80": drealSandstorm, // DRL-XL-BEIGE
};

// Optimized function for retrieving the image path based on the product instance ID
export const getImageFromProductInstanceId = (id) => guidToImageMap[id] || null;

export const formatDateToDDMMYYYY = (isoString) =>
  new Date(isoString).toLocaleDateString("en-GB").replace(/\//g, "/");

export const getShirtGridData = (color, design) => {
  const shirtColor =
    color === 0 ? "jetblack" : color === 1 ? "offwhite" : "sandstorm";

  const shirtDesign = design === "lifestyle" ? "lifestyle" : "dreal";

  const data = [
    {
      src: `/cataloguepics/${shirtDesign}/grid/${shirtColor}/1.webp`,
    },
    {
      src: `/cataloguepics/${shirtDesign}/grid/${shirtColor}/2.webp`,
    },

    {
      src: `/cataloguepics/${shirtDesign}/grid/${shirtColor}/3.webp`,
    },

    {
      src: `/cataloguepics/${shirtDesign}/grid/${shirtColor}/4.webp`,
    },
  ];

  return data;
};

export const development = false;

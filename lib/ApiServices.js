import axios from "axios";

// Get order
export const getSellOrder = async (id, quality) => {
  let result;

  // Example
  // proto: ["231"]
  // quality: ["Meteorite"]
  const sellMetadata = encodeURI(
    JSON.stringify({ proto: [id], quality: [quality] })
  );

  const options = {
    method: "GET",
    url: "https://api.x.immutable.com/v3/orders",
    params: {
      page_size: 10,
      direction: "asc",
      order_by: "buy_quantity_with_fees",
      buy_token_type: "eth",
      status: "active",
      sell_metadata: sellMetadata,
      include_fees: "true",
    },
    headers: { "Content-Type": "application/json" },
  };

  await axios
    .request(options)
    .then((res) => {
      result = res.data.result;
    })
    .catch((error) => {
      throw new Error("Error in getSellOrder", { cause: error });
    });

  return result;
};
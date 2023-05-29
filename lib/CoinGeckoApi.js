import axios from "axios";

export const getEthPrice = async () => {
  let result;
  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/simple/price",
    params: {
      ids: "ethereum",
      vs_currencies: "idr",
    },
    headers: { "Content-Type": "application/json" },
  };

  await axios
    .request(options)
    .then((res) => {
      result = res.data;
      result = result.ethereum.idr;
      console.log("data in coingecko API", res.data);
    })
    .catch((err) => console.log(err));

  return result;
};

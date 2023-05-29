import { getEthPrice } from "@/lib/CoinGeckoApi";
import { ethers } from "ethers";

const toDecimal = (num) => {
  return ethers.utils.formatEther(num);
};

export const toIDR = async (eth) => {
  if (eth) {
    const dec = toDecimal(eth);
    console.log("dec in toIDR", dec);
    const ethPrice = await getEthPrice();
    console.log("eth price in toIDR", ethPrice);
    const price = dec * ethPrice;
    console.log("real price in toIDR", price);
    return `Rp ${Math.floor(price)}`;
  } else {
    new Error(`Something error in toIDR helper, ${eth}`);
  }
};

import { getEthPriceInIDR } from "@/lib/CoinGeckoApi";
import { ethers } from "ethers";
import { calculateFee } from "./feeCalc";

export const toDecimal = (num) => {
  if (num) {
    return ethers.utils.formatEther(num);
  } else {
    return new Error(`Uhm...semething wrong with the price`);
  }
};

export const toIDR = async (price) => {
  // If price more than 1k IDR
  const ethPrice = await getEthPriceInIDR();

  const totalInIDR = price * ethPrice;

  // Calculate fee here
  const amountObject = await calculateFee(totalInIDR);

  return amountObject;
};

// Let's use library
export const formatCurrency = (total) => {
  if (total) {
    const nf = new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
    });
    const newFormat = nf.format(total);
    return newFormat;
  } else {
    new Error(`Something error in toIDR helper, ${total}`);
  }
};

export const formatString = async (arr, input) => {
  let strFormat = `List pesanan saya:`;
  let strInput;
  let strList;

  if (input.name && input.address) {
    strInput = `
    Nama: ${input.name}
    Alamat Kripto: ${input.address}
    `;
    strFormat = strFormat.concat(`\n`, strInput);
  }

  if (arr.length) {
    // process string
    arr.forEach((item) => {
      strList = `
      ---
      Nama: ${item.name}
      Quality: ${item.quality}
      Total Bayar: ${item.totalInIDR}
      Jumlah: ${item.amount}
      ---`;

      strFormat = strFormat.concat(`\n`, strList);
    });
  }

  if (input.total) {
    const strTotal = `Total Yang Harus Di Bayar: ${input.total}`;
    strFormat = strFormat.concat(`\n`, strTotal);
  }

  return strFormat;
};

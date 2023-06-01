import { feeTier } from "@/const";

export const calculateFee = async (amount) => {

  if (amount > 0 && amount <= 500) {
    const amountPlusFee = 2000;
    const profit = amountPlusFee - amount;
    return {
      totalInIDR: amountPlusFee,
      profit: profit,
    };
  }

  if (amount > 500 && amount <= 2000) {
    const amountPlusFee = amount * feeTier[0];

    if (amountPlusFee < 2000) {
      const profit = 2000 - amount;

      return {
        totalInIDR: 2000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;

      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }

  if (amount > 2000 && amount <= 10000) {
    const amountPlusFee = amount * feeTier[1];
    if (amountPlusFee < 6000) {
      const profit = 6000 - amount;

      return {
        totalInIDR: 6000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }

  if (amount > 10000 && amount <= 20000) {
    const amountPlusFee = amount * feeTier[2];
    if (amountPlusFee < 20000) {
      const profit = 20000 - amount;

      return {
        totalInIDR: 20000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }

  if (amount > 20000 && amount <= 50000) {
    const amountPlusFee = amount * feeTier[3];

    if (amountPlusFee < 30000) {
      const profit = 30000 - amount;

      return {
        totalInIDR: 30000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }
  
  if (amount > 50000 && amount <= 100000) {
    const amountPlusFee = amount * feeTier[4];

    if (amountPlusFee < 67500) {
      const profit = 67500 - amount;

      return {
        totalInIDR: 67500,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }

  if (amount > 100000 && amount <= 200000) {
    const amountPlusFee = amount * feeTier[5];

    if (amountPlusFee < 120000) {
      const profit = 120000 - amount;

      return {
        totalInIDR: 120000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }

  if (amount > 200000) {
    const amountPlusFee = amount * feeTier[6];

    if (amountPlusFee < 220000) {
      const profit = 220000 - amount;

      return {
        totalInIDR: 220000,
        profit: profit,
      };
    } else {
      const profit = amountPlusFee - amount;
      return {
        totalInIDR: amountPlusFee,
        profit: profit,
      };
    }
  }
};

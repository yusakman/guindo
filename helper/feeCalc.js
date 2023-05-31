export const calculateFee = async (amount) => {
  const currentFee = 50 / 100;
  const amountPlusFee = Math.floor(amount + amount * currentFee);
  return amountPlusFee;
};

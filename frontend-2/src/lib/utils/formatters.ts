// Helper function for price formatting
export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // Remove decimals if not needed
    maximumFractionDigits: 0,
  });
};

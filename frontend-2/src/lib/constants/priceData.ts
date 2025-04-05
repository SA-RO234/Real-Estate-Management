export const priceData = [
  { id: 1, name: "Apartment", price: 100000 },
  { id: 2, name: "House", price: 200000 },
  { id: 3, name: "Land", price: 300000 },
];
export const priceRanges = [
  { id: 1, name: "Under $50,000", min: 0, max: 50000 },
  { id: 2, name: "$50,000 - $100,000", min: 50000, max: 100000 },
  { id: 3, name: "$100,000 - $200,000", min: 100000, max: 200000 },
  { id: 4, name: "$200,000 - $300,000", min: 200000, max: 300000 },
  { id: 5, name: "Over $300,000", min: 300000, max: Infinity },
];
export const priceRangeOptions = priceRanges.map((range) => ({
  value: range.id,
  label: range.name,
}));

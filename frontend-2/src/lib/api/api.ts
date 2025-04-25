export const fetchProperties = async (page: number = 1, limit: number = 4) => {
  const response = await fetch(`http://localhost:3000/app/api/properties.php`);
  const data = await response.json();
console.log(data);
  // Get total items count from the headers
  const totalItems = response.headers.get("X-Total-Count")
    ? parseInt(response.headers.get("X-Total-Count") || "0", 10)
    : 50;

  return {
    data,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    },
  };
};

export const fetchPropertyById = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/app/api/properties.php/${id}`
  );
  const data = await response.json();

  return data;
};

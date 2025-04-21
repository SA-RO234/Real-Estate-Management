export const fetchProperties = async (page: number = 1, limit: number = 4) => {
  const response = await fetch(
    `http://localhost:8081/properties?_page=${page}&_limit=${limit}`
  );
  const data = await response.json();

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
  const response = await fetch(`http://localhost:8081/properties/${id}`);
  const data = await response.json();

  return data;
};

const API_URL = "http://localhost:8081";

export async function getProperties() {
  const res = await fetch(`${API_URL}/properties`);
  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }
  return res.json();
}

export async function getProperty(id) {
  const res = await fetch(`${API_URL}/properties/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }
  return res.json();
}

export async function createProperty(property) {
  const res = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });
  if (!res.ok) {
    throw new Error("Failed to create property");
  }
  return res.json();
}

export async function updateProperty(id, property) {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });
  if (!res.ok) {
    throw new Error("Failed to update property");
  }
  return res.json();
}

export async function deleteProperty(id) {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete property");
  }
  return true;
}

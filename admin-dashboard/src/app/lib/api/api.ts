export const fetchProperties = async (page: number = 1, limit: number = 4) => {
  const response = await fetch(
    `http://localhost:3000/app/api/properties.php?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  const totalItems = response.headers.get("X-Total-Count")
    ? parseInt(response.headers.get("X-Total-Count") || "0", 10)
    : data.length;

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

//  Fetch ALl Property
export const fetchAllProperties = async () => {
  const response = await fetch(`http://localhost:3000/app/api/properties.php`);
  const data = await response.json();
  return {
    data,
  };
};

//  Fetch Property for Ad
export const fetchPropertyForAd = async () => {
  const response = await fetch(
    `http://localhost:3000/app/api/properties.php?ads`
  );
  const data = await response.json();
  return data;
};

export const fetchPropertyById = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/app/api/properties.php/id=${id}`
  );
  const data = await response.json();
  return data;
};

// New============================================
const API_URL = "http://localhost:3000/app/api/properties.php";

export async function getProperty(id: number) {
  const res = await fetch(`${API_URL}/properties/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }
  return res.json();
}

export async function createProperty(property: any) {
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

export async function updateProperty(id: number, property: any) {
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

export async function deleteProperty(id: number) {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete property");
  }
  return true;
}

//  ============================================
export const fetchPropertyByCategory = async () => {
  const response = await fetch(
    "http://localhost:3000/app/api/properties.php?typeCount"
  );
  const data = await response.json();
  return data;
};

// get Number of Each Propety in City

export const fetchPropertyOfEachCity = async () => {
  const response = await fetch(
    "http://localhost:3000/app/api/properties.php?byCity"
  );
  const data = await response.json();
  return data;
};

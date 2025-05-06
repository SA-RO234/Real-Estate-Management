import { Property } from "../types/property";

const API_URL = "http://localhost:8000/Backend/app/api/properties.php";

export const propertyService = {
  // Get all properties
  async getAll(): Promise<Property[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  },

  // Get a single property by ID
  async getById(id: number): Promise<Property> {
    const response = await fetch(`${API_URL}?id=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID: ${id}`);
    }
    return response.json();
  },

  // Create a new property
  async create(property: Property): Promise<Property> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error("Failed to create property");
    }
    return response.json();
  },

  // Update an existing property
  async update(id: number, property: Property): Promise<Property> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error(`Failed to update property with ID: ${id}`);
    }
    return response.json();
  },

  // Delete a property
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete property with ID: ${id}`);
    }
  },
};

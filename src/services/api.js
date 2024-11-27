import axios from "axios";

const BASE_URL = "http://localhost:3000";
const accessToken = "";

export const createUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData);

    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, formData);

    return response.data;
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create product", error);
  }
};

export const createCategory = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/product-category`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create new category", error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product-category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product`, {
      data: {
        ids: [id],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete real estate", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete real estate", error);
    throw error;
  }
};

export const fetchUserDetails = async (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/user/current-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
};
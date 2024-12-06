import axios from "axios";

const BASE_URL = "http://localhost:3000";

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

export const updateUserApi = async (data, accessToken) => {
  try {
    const response = await axios.put(`${BASE_URL}/user`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("დაფიქსირდა შეცდომა:", error);
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

export const createProduct = async (formData, accessToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create product", error);
  }
};

export const createCategory = async (formData, accessToken) => {
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

export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  categoryName,
  minPrice,
  maxPrice,
  productName,
  onlySales,
}) => {
  try {
    const params = {
      page,
      pageSize,
      ...(categoryName && { categoryName }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(productName && { productName }),
      ...(onlySales !== undefined && { onlySales }),
    };

    const response = await axios.get(`${BASE_URL}/product`, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${id}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteProductApi = async (id, accessToken) => {
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
    console.error("დაფიქსირდა შეცდომა", error);
    throw error;
  }
};

export const deleteCategoryApi = async (id, accessToken) => {
  console.log(id);
  try {
    const response = await axios.delete(`${BASE_URL}/product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("დაფიქსირდა შეცდომა", error);
    throw error;
  }
};

export const addProductToCart = async (id, accessToken) => {
  const response = await axios.post(
    `${BASE_URL}/cart`,
    { product_id: id },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const fetchCartFromAPI = async (accessToken) => {
  const response = await axios.get(`${BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteCartItem = async (id, accessToken) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("დაფიქსირდა შეცდომა", error);
    throw error;
  }
};

export const deleteCart = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/clear`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("დაფიქსირდა შეცდომა", error);
    throw error;
  }
};

export const purchase = async (data, accessToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/purchases`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to purchase products", error);
  }
};

export const refreshAuthToken = async ({ refresh_token }) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-tokens`, {
      refresh_token,
    });

    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token. Please log in again.");
  }
};

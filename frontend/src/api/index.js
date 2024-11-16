const API_BASE_URL = "https://car-nation-nik8.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";

export const api = {

  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Car endpoints
  createCar: async (carData, token) => {
    const response = await fetch(`${API_BASE_URL}/car/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: carData,
    });
    return response.json();
  },

  getCars: async (token) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const response = await fetch(`${API_BASE_URL}/car/view/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    return data;
  },

  getCar: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/car/getById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  updateCar: async (id, carFormData, token) => {
    const response = await fetch(`${API_BASE_URL}/car/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:carFormData,
    });
    return response.json();
  },

  deleteCar: async (id, token, userId) => {
    const response = await fetch(`${API_BASE_URL}/car/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userId),
    });
    return response.json();
  },
};

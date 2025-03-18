import axios from "axios";

const Base_Url = "http://localhost:4000"; // Replace with your base URL

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: Base_Url,
  timeout: 5000, // Optional: Set a timeout for requests
});

// GET request
export async function Get({ url, headers = {}, params = {} }) {
  try {
    const response = await axiosInstance.get(url, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error.response?.data || error.message);
    throw error;
  }
}

// POST request
export async function Post({ url, data = {}, headers = {} }) {
  try {
    const response = await axiosInstance.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error.response?.data || error.message);
    throw error;
  }
}

// PUT request
export async function Put({ url, data = {}, headers = {} }) {
  try {
    const response = await axiosInstance.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`PUT ${url} failed:`, error.response?.data || error.message);
    throw error;
  }
}

// PATCH request
export async function Patch({ url, data = {}, headers = {} }) {
  try {
    const response = await axiosInstance.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(
      `PATCH ${url} failed:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

// DELETE request
export async function Delete({ url, headers = {} }) {
  try {
    const response = await axiosInstance.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error(
      `DELETE ${url} failed:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

// Export all methods together
const API = { Get, Post, Put, Patch, Delete };
export default API;

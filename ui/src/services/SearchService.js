import axios from "axios";

const searchAxiosInstance = axios.create({
  baseURL: "http://localhost:8080/search",
  validateStatus: (status) => status < 500,
});

// TODO: Error handling. Also data sanitization for the title
export const searchAll = async () => {
  const response = await searchAxiosInstance.get("/");
  return response.data;
};

export const searchTitle = async (title) => {
  const response = await searchAxiosInstance.get(`/${title}`);
  return response.data;
};

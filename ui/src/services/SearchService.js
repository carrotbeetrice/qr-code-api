import axios from "axios";

const searchAxiosInstance = axios.create({
  baseURL: "http://localhost:8080/search",
  validateStatus: (status) => status < 500,
});

// export const searchAll = async () => {
//   const response = await searchAxiosInstance.get("/");
//   return response.data;
// };

// TODO: Data sanitization for the title
export const searchTitle = async (title) => {
  const response = await searchAxiosInstance.get(`/${title}`);
  if (response.status === 404) return null;
  console.log(typeof response.data, response.data);
  try {
    return JSON.stringify(response.data.data, null, "\t");
  } catch (e) {
    return response.data.data;
  }
};

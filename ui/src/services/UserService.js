import axios from "axios";

const loginAxiosInstance = axios.create({
  baseURL: "http://localhost:8080/auth",
  validateStatus: (status) => status < 500,
});

export const login = async (email, password) => {
  let loginResult = {
    success: true,
    message: "",
  };

  try {
    const response = await loginAxiosInstance.post("/login", {
      email,
      password,
    });
    if (response.status === 200) {
      // Save access token for simplicity
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } else {
      loginResult.success = false;
      loginResult.message = response.data;
    }
  } catch (e) {
    loginResult.success = false;
    loginResult.message = "An unexpected error has occured.";
  }

  return loginResult;
};

export const logout = () => {
  localStorage.clear();
};

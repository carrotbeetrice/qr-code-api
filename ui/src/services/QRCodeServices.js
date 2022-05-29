import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const protectedAxiosInstance = axios.create({
  baseURL: "http://localhost:8080/qr",
  headers: {
    Bearer: accessToken,
  },
  validateStatus: (status) => status < 500,
});

export const uploadData = async (image, title) => {
  const formData = new FormData();
  formData.append("qr-code", image);
  if (title && title !== "") {
    formData.append("title", title);
  }

  let uploadResult = {
    success: true,
    title: "",
    message: "",
  };

  try {
    const response = await protectedAxiosInstance.post("/", formData);
    if (response.status === 201) {
      uploadResult = {
        ...uploadResult,
        title: response.data.title,
        message: "Upload successful",
      };
    } else {
      uploadResult = {
        ...uploadResult,
        success: false,
        message: response.data,
      };
    }
  } catch (e) {
    uploadResult = {
      ...uploadResult,
      success: false,
      message: "An unexpected error has occurred.",
    };
  }

  return uploadResult;
};

export const deleteData = async (title) => {
  let deleteResult = {
    success: true,
    message: "",
  };
  try {
    const response = await protectedAxiosInstance.delete(`/${title}`);
    if (response.status === 200) {
      deleteResult.message = `Title ${response.data.title} successfully deleted`;
    } else {
      deleteResult.success = false;
      deleteResult.message = response.data;
    }
  } catch (e) {
    deleteResult.success = false;
    deleteResult.message = "An unexpected error has occurred";
  }

  return deleteResult;
};

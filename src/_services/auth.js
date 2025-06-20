import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post(
      "/logout",
      { token },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    localStorage.removeItem("accessToken");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async ({ santri_id, email, password }) => {
  try {
    const { data } = await API.post("/register", { santri_id, email, password });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✅ Custom hook yang valid
export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  if (!token) {
    return { success: false, message: "Token kosong", data: null };
  }

  if (isExpired) {
    return {
      success: false,
      message: "Token Expired",
      data: decodedToken,
    };
  }

  return {
    success: true,
    message: "Token Valid",
    data: decodedToken,
  };
};

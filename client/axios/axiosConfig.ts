import axios, { AxiosInstance } from "axios";
import { FormData } from "@/types/formData";
import {
  BASE_URL,
  REGISTER_ENDPOINT,
  OTP_ENDPOINT,
  LOGIN_ENDPOINT,
  EDIT_ENDPOINT,
  FETCH_USER,
  LIKE_USER,
  CHANGE_PASS,
  GOOGLE_ENDPOINT,
  GET_ALL
} from "./endpoints";

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    console.error("Response Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default client;

export const sendOtp = async (email: string, otp: number) => {
  const data = {
    email: email,
    otp: otp,
  };

  try {
    const response = await client.post(OTP_ENDPOINT, data);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error occurred during sending otp:", error);
    throw error;
  }
};

interface validateData {
  email: string | null;
  username?: string | null;
  password? : string | null;
}

export const registerUser = async (data: validateData) => {
  try {
    const response = await client.post(REGISTER_ENDPOINT, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log("User registered successfully!", data);
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const changePass = async (data: FormData) => {
  try{
    const res = await client.post(CHANGE_PASS, data);
    console.log(res.data);
    return res.data;
  }catch (error) {
    throw error;
  }
}

export const userLogin = async (userData: FormData) => {
  try {
    const res = await client.post(LOGIN_ENDPOINT, userData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};

export const googleAuth = async (userData: any) => {
  try{
    const res = await client.post(GOOGLE_ENDPOINT, userData);
    console.log(res.data);
    return res.data;
  }catch (error) {
    console.error("Error during google login:", error);
    throw error;
  }
}

export const editUserProfile = async (userId: string, updatedUserData: any) => {
  try {
    const res = await client.post(`${EDIT_ENDPOINT}/${userId}`, updatedUserData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error during user profile edit:', error);
    throw error;
  }
};

export const randomUserFetch = async (userId: string, token: string) => {
    console.log(userId);
    try {
      const response = await client.get(`${FETCH_USER}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }

export const matchUserButton = async (userId: string, likedUserId: string) => {
  try {
    const response = await client.post(LIKE_USER, {
      userId,
      likedUserId,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response; 
  } catch (error) {
    console.error("Error during matching user:", error);
    throw error; 
  }
};

export const getAllUsers = async () =>{
  try{
    const response = await client.get(GET_ALL);
    return response.data.users;
  }catch (error) {
    return error;
}
}

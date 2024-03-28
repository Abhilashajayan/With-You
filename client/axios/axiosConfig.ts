import axios, { AxiosInstance } from "axios";
import { FormData } from "@/types/formData";
import { getCookie } from "@/features/authCookies";
import { HttpStatusCode } from "./enums";
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
  GET_ALL,
  BAN_USER,
  USER_PROFILE,
  LIKED_USERS,
} from "./endpoints";

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  async (config) => {
    console.log("Request Interceptor:", config);
    try {
      const token: string | undefined = await getCookie();
      if (token) {
        console.log("token is there");
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error.response);
   
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
    if(error.response.status === HttpStatusCode.FORBIDDEN){
      window.location.href = '/signup';
    }
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
    if (response.status === HttpStatusCode.OK) {
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
  password?: string | null;
}

export const registerUser = async (data: validateData) => {
  try {
    const response = await client.post(REGISTER_ENDPOINT, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== HttpStatusCode.OK) {
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
  try {
    const res = await client.post(CHANGE_PASS, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

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
  try {
    const res = await client.post(GOOGLE_ENDPOINT, userData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error during google login:", error);
    throw error;
  }
};

export const editUserProfile = async (userId: string, updatedUserData: any) => {
  try {
    const res = await client.post(
      `${EDIT_ENDPOINT}/${userId}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error during user profile edit:", error);
    throw error;
  }
};

export const randomUserFetch = async (userId: string) => {
  try {
    console.log(userId);
    const response = await client.get(`${FETCH_USER}/${userId}`);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const matchUserButton = async (
  userId: string,
  likedUserId: string | undefined
) => {
  try {
    const response = await client.post(
      LIKE_USER,
      {
        userId,
        likedUserId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error during matching user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await client.get(GET_ALL);
    return response.data.users;
  } catch (error) {
    return error;
  }
};

export const banUser = async (userId: string) => {
  try {
    const response = await client.post(`${BAN_USER}/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const usersProfiles = async (userId: string) => {
  try {
    const response = await client.get(`${USER_PROFILE}/${userId}`);
    console.log(response.data,"the response was");
    return response.data;
  } catch (error) {
    return error;
  }
};


export const likedUsers = async (userId: string) => {
  try {
    const response = await client.get(`${LIKED_USERS}/${userId}`);
    console.log(response.data,"the response was");
    return response.data;
  } catch (error) {
    return error;
  }
};

"use client";

import axios, { AxiosInstance } from "axios";
import { FormData } from "@/types/formData";
import {
  BASE_URL,
  BASEs_URL,
  REGISTER_ENDPOINT,
  OTP_ENDPOINT,
  LOGIN_ENDPOINT,
  EDIT_ENDPOINT,
  FETCH_USER,
  LIKE_USER
} from "./endpoints";
import { string } from "zod";

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const sendOtp = async (email: string, otp: number) => {
  const data = {
    email: email,
    otp: otp,
  };

  try {
    const response = await axios.post(`${BASE_URL}${OTP_ENDPOINT}`, data);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error occurred during sending otp:", error);
  }
};

export const registerUser = async (data: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}${REGISTER_ENDPOINT}`, data, {
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

export const userLogin = async (userData: FormData) => {
  try {
    const res = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, userData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};

export const editUserProfile = async (userId: string, updatedUserData: any) => {
  try {
    const res = await axios.post(`${BASEs_URL}${EDIT_ENDPOINT}/${userId}`, updatedUserData, {
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

export const randomUserFetch = async (userId: string) => {
  console.log(userId);
  try {
    const response = await axios.get(`${BASEs_URL}${FETCH_USER}/${userId}`);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}

export const matchUserButton = async (userId: string, likedUserId: string) => {
  try {
    const response = await axios.post(`${BASEs_URL}${LIKE_USER}`, {
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
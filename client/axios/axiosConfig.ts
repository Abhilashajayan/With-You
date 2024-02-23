"use client"

import axios, { AxiosInstance } from 'axios';
import { FormData } from '@/types/formData';
import { BASE_URL, REGISTER_ENDPOINT, OTP_ENDPOINT, LOGIN_ENDPOINT } from './endpoints';

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
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    console.log('User registered successfully!', data);
    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
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

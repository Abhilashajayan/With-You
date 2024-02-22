import React from 'react';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const  page:React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData):Promise<any> => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission failed:', responseData.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center bg-white min-h-screen">
        <div className="w-full max-w-md p-8 rounded shadow-md">
          <div className="mx-auto mb-4 w-60 h-[100px]  rounded-full overflow-hidden">
            <img
              src="/Bae-logos-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
               {...register('email', { required: 'Email is required', maxLength: 255 })}
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                className="border border-gray-300 text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                 {...register('username', { required: 'Name is required', maxLength: 255 })}
                type="username"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="border border-gray-300 text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-black text-gray-700 text-sm font-bold mb-2"
              >
                 Password
              </label>
              <input
                 {...register('password', { required: 'Password is required', maxLength: 255 })}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <a
              type="submit"
              href="/otpauth"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Continue
            </a>
          </form>
        </div>
      </div>
    </>
  );
}


export default page;
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { changePass } from "@/axios/axiosConfig";
import { toast } from "@/components/ui/use-toast";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = z.object({
    email: z
      .string().min(6,{message:"Invalid email address"})
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .nonempty({ message: "Password is required" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      }),
    confirmPassword: z.string(),
  });
  
  
  

const Page: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof FormData, value);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
      } else {
        await changePass(data);
        const queryString = `?email=${data.email.trim()}`;
        router.push(`/otpauth${queryString}`);
        console.log(data);
        toast({
            variant: "destructive",
            description: "Otp has sended successfully",
          });
        setError(null);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-center bg-white min-h-screen">
        <div className="w-full max-w-md p-8 rounded">
          <div className="mx-auto mb-4 w-60 h-[100px] rounded-full overflow-hidden">
            <img
              src="/Bae-logos-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg text-black text-center">
            Sign up to continue
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="john.doe@example.com"
                className={`border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300`}
                onChange={handleInputChange}
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
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className={`border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300`}
                onChange={handleInputChange}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                placeholder="Confirm your password"
                className={`border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300`}
                onChange={handleInputChange}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;


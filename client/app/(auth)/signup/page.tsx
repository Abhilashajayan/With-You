"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { userLogin } from "@/axios/axiosConfig";
import { useAppDispatch } from "@/features/hooks";
import { setLogin, updateProfile } from "@/features/auth/authSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
  OAuthCredential,
} from "firebase/auth";
import { setCookie } from "@/features/authCookies";
import { toast } from "@/components/ui/use-toast";
import { app } from "@/config/firebase";

interface FormData {
  email: string;
  password: string;
}
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .nonempty({ message: "Password is required" }),
});

const Page: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormData>({
    email: "",
    password: "",
  });
  console.log(formValues);

  const onSubmit = async (data: FormData): Promise<any> => {
    try {
      const isValid = await trigger();
      if (isValid) {
        const response = await userLogin(data);
        console.log(response, "the response");
        if (response !== "") {
          dispatch(
            setLogin({
              user: response?.user,
            })
          );

          if (response?.data.phone) {
            dispatch(updateProfile(response?.data));
            console.log("hello");
          }

          await setCookie(response?.token);
          router.push(`/Match`);
          toast({
            variant: "destructive",
            description: "Login successful",
          });
        } else {
          setError("Invalid username or password");
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof FormData, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleGoogleLogin = () => {
    console.log("button clicked");
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken || "";
        const user = result.user;
        const userData: any = {
          email: user.email,
          username: user.displayName,
          google: true,
        };
        console.log(userData, "the google auth data");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
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
                value={formValues.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
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
                value={formValues.password}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
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

            <a href="/changePassword" className="text-gray-700 hover:underline">
              Forgotten your password?
            </a>
          </form>

          <div className="flex mt-2 items-center">
            <div className="flex-grow border-b border-gray-400"></div>
            <span className="text-black mx-4">or sign up with</span>
            <div className="flex-grow border-b border-gray-400"></div>
          </div>

          <div className="flex text-black justify-center">
            <button
              className="flex items-center justify-center mt-4 p-2 border border-gray-300 rounded cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Icon"
                className="w-7 h-7"
              />
            </button>
               

          </div>
          <p className="text-sm text-black text-left mt-10">
            Don't have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;

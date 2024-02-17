import React from "react";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center bg-white min-h-screen">
        <div className="w-full max-w-md p-8  rounded ">
          <div className="mx-auto mb-4 w-60 h-[100px]  rounded-full overflow-hidden">
            <img
              src="/Bae-logos-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg   text-black text-center">
            Sign up to continue
          </h2>
          <form>
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
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-300 text-black rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <a
              type="submit"
              href="/"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Continue
            </a>
          </form>

          <div className="flex items-center">
            <div className="flex-grow border-b border-gray-400"></div>
            <span className="text-black  mx-4">or sign up with</span>
            <div className="flex-grow border-b border-gray-400"></div>
          </div>

          <div className="flex text-black justify-center">
            <button className="flex items-center justify-center mt-4 p-2 border border-gray-300 rounded cursor-pointer">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Icon"
                className="w-7 h-7"
              />
            </button>
          </div>
          <p className="text-sm text-black text-left  mt-10">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

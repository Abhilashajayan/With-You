"use client"
export default function Login() {
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
            Signin up to continue
          </h2>
          <div className=" flex justify-center p-5">
            <a
              href="/emailauth"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg w-full text-sm px-5 py-2.5 text-center me-2 "
            >
              Continue with email
            </a>
          </div>
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
            Already have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}



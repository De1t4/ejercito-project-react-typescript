
const LoginForm = () => {
  return (
    <div className="h-full justify-center flex items-center flex-col w-full gap-10">
      <div className="  justify-start items-start text-left flex-col font-inter">
        <h1 className="text-3xl font-bold mb-2 text-left  ">Welcome Back</h1>
        <p className=" text-black-color/90 font-medium">You've successfully logged into the Military System. We wish you a productive day.</p>
      </div>
      <form className="flex flex-col gap-4 w-full">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-roboto font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Example@email.com"
            className=" placeholder:text-[#8897AD] placeholder:font-roboto text-sm appearance-none w-full h-10  bg-[#F7FBFF] border rounded-lg  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="">
          <label className="block text-[#0C1421] text-sm font-roboto font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className=" placeholder:text-[#8897AD] placeholder:font-roboto text-sm appearance-none w-full h-10  bg-[#F7FBFF] border rounded-lg  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className=" flex justify-end">
          <p className=" font-roboto text-[#1E4AE9] text-sm font-medium hover:cursor-pointer">Forgot Password?</p>
        </div>
        <button
          type="submit"
          className="bg-primary-color hover:bg-primary-color/90 transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
        >
          Sign in
        </button>
        <div className="flex justify-center">
          <p className="text-gray-600 text-sm font-roboto">Don't have an account? <span className="text-primary-color font-bold">Sign up</span></p>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;

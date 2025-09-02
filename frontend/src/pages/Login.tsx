import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { HeadingSection } from "../components";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUser } from "../store/slices/authSlice";

interface LoginType {
  emailAddress: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authSlice.isAuthenticated
  );
  const navigate = useNavigate();
  const [data, setData] = useState<LoginType>({
    emailAddress: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: LoginType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log(data);
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoading(false);
      toast.success(responseData.message);
      setData({
        emailAddress: "",
        password: "",
      });
      navigate("/");
      dispatch(fetchUser());
    } catch (error: unknown) {
      setLoading(false);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "/api/v1/users/auth/google";
  };
  return (
    <>
      <HeadingSection pageName="Login">
        <h3>Login</h3>
      </HeadingSection>
      <div className="min-w-[300px] w-full min-h-[600px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex flex-col justify-center items-center gap-y-5 sm:gap-y-8 md:gap-y-10 p-5 md:p-10">
          <h4 className="text-xl sm:text-2xl text-gray-800 font-medium text-center">
            Log in on our website!
          </h4>
          <div className="max-w-[500px] w-full min-h-[500px] flex flex-col justify-center items-center gap-y-4 border border-gray-50 shadow rounded p-5 sm:p-10 ">
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="emailAddress"
                className="text-base sm:text-lg font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                name="emailAddress"
                id="emailAddress"
                type="text"
                value={data.emailAddress}
                onChange={handleLoginChange}
                className="w-full text-sm sm:text-base h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="password"
                className="text-base sm:text-lg font-medium text-gray-800"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={data.password}
                onChange={handleLoginChange}
                className="w-full h-8 text-sm sm:text-base border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="flex items-center gap-x-2 self-start">
                <input id="rememberMe" type="checkbox" />
                <label
                  htmlFor="rememberMe"
                  className="select-none text-[12px] sm:text-sm text-gray-800"
                >
                  Remember Me
                </label>
              </div>
              <button className="cursor-pointer text-[12px] sm:text-sm text-gray-800 hover:underline font-semibold">
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              onClick={handleLoginSubmit}
              disabled={loading}
              className="cursor-pointer w-full h-8 uppercase text-lg font-medium text-blue-500 border border-gray-300 hover:bg-gray-50 rounded my-5"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <p className="text-sm text-gray-800">
              Don't have an account!{" "}
              <Link
                to={"/register"}
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <div className="w-full flex items-center gap-x-2 mt-2">
              <div className="w-full h-[1px] bg-gray-300" />
              <p className="text-sm text-gray-800 text-nowrap">
                Or continue with
              </p>
              <div className="w-full h-[1px] bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="cursor-pointer hover:bg-gray-50 px-10 flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white mt-3"
            >
              <FcGoogle />
              <span className="text-base font-semibold leading-6">Google</span>
            </button>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Login;

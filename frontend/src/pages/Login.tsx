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
  return (
    <>
      <HeadingSection pageName="Login">
        <h3>Login</h3>
      </HeadingSection>
      <div className="w-full min-h-[700px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex flex-col justify-center items-center gap-y-10 p-10">
          <h4 className="text-2xl text-gray-800 font-medium">
            Log in on our website!
          </h4>
          <div className="max-w-[500px] w-full min-h-[500px] flex flex-col justify-center items-center gap-y-4 border border-gray-50 shadow rounded p-10 ">
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="emailAddress"
                className="text-lg font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                name="emailAddress"
                id="emailAddress"
                type="text"
                value={data.emailAddress}
                onChange={handleLoginChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="password"
                className="text-lg font-medium text-gray-800"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={data.password}
                onChange={handleLoginChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="flex items-center gap-x-2 self-start">
                <input id="rememberMe" type="checkbox" />
                <label
                  htmlFor="rememberMe"
                  className="select-none text-sm text-gray-800"
                >
                  Remember Me
                </label>
              </div>
              <button className="cursor-pointer text-sm text-gray-800 hover:underline font-semibold">
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

            <div className="mt-6 flex items-center justify-center gap-5">
              <button className="cursor-pointer hover:bg-gray-50 px-10 flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FcGoogle />
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>

              <button className="cursor-pointer hover:bg-[#24292F]/90 px-10 flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">GitHub</span>
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Login;

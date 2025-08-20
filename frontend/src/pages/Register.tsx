import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { HeadingSection } from "../components";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

function Register() {
  const [data, setData] = useState<RegisterUserType>({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: RegisterUserType) => ({
      ...prevData,
      [name as keyof RegisterUserType]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (data.confirmPassword !== data.password) {
        throw new Error("Confirm password is not matached to password!");
      }
      setLoading(true);
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message as string);
      }
      console.log(responseData);
      setLoading(false);
      toast.success("User Registered Successfully!");
      setData({
        fullName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error instanceof Error ? error.message : "Error: User not registered!"
      );
    }
  };
  return (
    <>
      <HeadingSection pageName="Register">
        <h3>Register</h3>
      </HeadingSection>
      <div className="w-full min-h-[700px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex flex-col justify-center items-center gap-y-10 p-10">
          <h4 className="text-2xl text-gray-800 font-medium ">
            Sign Up on our Website!
          </h4>
          <div className="max-w-[500px] w-full min-h-[500px] flex flex-col justify-center items-center gap-y-4 border border-gray-50 shadow rounded p-10 ">
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="fullName"
                className="text-lg font-medium text-gray-800"
              >
                Full Name
              </label>
              <input
                required
                name="fullName"
                id="fullName"
                type="text"
                value={data.fullName}
                onChange={handleChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="emailAddress"
                className="text-lg font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                required
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={data.emailAddress}
                onChange={handleChange}
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
                required
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-lg font-medium text-gray-800"
              >
                Confirm Password
              </label>
              <input
                required
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="flex items-center gap-x-2 self-start">
              <input required id="privacyPolicy" type="checkbox" />
              <label
                htmlFor="privacyPolicy"
                className="select-none text-sm text-gray-800"
              >
                Accept our terms and privacy policy
              </label>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer w-full h-8 uppercase text-lg font-medium text-blue-500 border border-gray-300 hover:bg-gray-50 rounded my-5"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <p className="text-sm text-gray-800">
              Already have an account!{" "}
              <Link
                to={"/login"}
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Register;

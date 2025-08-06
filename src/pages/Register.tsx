import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { Link } from "react-router-dom";
import { HeadingSection } from "../components";
import { useState, type ChangeEvent, type FormEvent } from "react";

function Register() {
  const [data, setData] = useState<RegisterUserType>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: RegisterUserType) => ({
      ...prevData,
      [name as keyof RegisterUserType]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
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
                htmlFor="firstName"
                className="text-lg font-medium text-gray-800"
              >
                First Name
              </label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                value={data.firstName}
                onChange={handleChange}
                className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label
                htmlFor="lastName"
                className="text-lg font-medium text-gray-800"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={data.lastName}
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
                id="emailAddress"
                name="emailAddress"
                type="text"
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
              className="cursor-pointer w-full h-8 uppercase text-lg font-medium text-blue-500 border border-gray-300 hover:bg-gray-50 rounded my-5"
            >
              Sign Up
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

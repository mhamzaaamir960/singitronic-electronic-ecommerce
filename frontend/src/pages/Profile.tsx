import { useDispatch, useSelector } from "react-redux";
import { HeadingSection, PopUp } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import type { AppDispatch, RootState } from "../store/store";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import toast from "react-hot-toast";
import { fetchUser } from "../store/slices/authSlice";

interface UserData {
  fullName: string;
  phoneNumber?: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  profileImage?: File | string;
}

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const imageRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserData>({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    zipCode: "",
    profileImage: "",
  });
  const image = user?.profileImage as CategoryImage;
  const formData = new FormData();

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setData((prevData: UserData) => ({
        ...prevData,
        profileImage: files[0] as File,
      }));
    }
  };

  const imageRefHandler = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: UserData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  formData.append("fullName", data.fullName);
  formData.append("phoneNumber", data.phoneNumber as string);
  formData.append("street", data.street);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append("zipCode", data.zipCode);
  formData.append("profileImage", data.profileImage as File);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/v1/users/update-user", {
        method: "PATCH",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      setData({
        fullName: "",
        phoneNumber: "",
        street: "",
        city: "",
        country: "",
        zipCode: "",
        profileImage: "",
      });
    } catch (error: unknown | Error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <HeadingSection pageName="Profile">
        <h3>Profile</h3>
      </HeadingSection>
      <PopUp
        isOpen={openPopUp}
        setIsOpen={setOpenPopUp}
        className="w-full min-w-[300px] max-w-[500px] flex flex-col items-center gap-y-5 mx-5 p-5 md:p-10"
      >
        <div
          onClick={imageRefHandler}
          className="cursor-pointer w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full border-2 border-blue-500"
        >
          <input
            ref={imageRef}
            onChange={handleProfileImage}
            name="profileImage"
            type="file"
            className="hidden"
          />
          {data?.profileImage ? (
            <img
              src={URL.createObjectURL(data.profileImage as File)}
              alt={`${data?.fullName} image`}
              className="w-full h-full object-fill rounded-full"
            />
          ) : (
            <img
              src="/avatar.png"
              alt="avatar image"
              className="w-full h-full object-fill rounded-full"
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <label
            htmlFor="fullName"
            className="text-base sm:text-lg font-medium text-gray-800"
          >
            Full Name*
          </label>
          <input
            name="fullName"
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={handleUserDataChange}
            className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
          />
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <label
            htmlFor="phoneNumber"
            className="text-base sm:text-lg font-medium text-gray-800"
          >
            Phone Number
          </label>
          <input
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            value={data.phoneNumber}
            onChange={handleUserDataChange}
            className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
          />
        </div>
        <address className="flex flex-col gap-3">
          <label
            htmlFor="address"
            className="text-base sm:text-lg font-medium text-gray-800"
          >
            Address
          </label>
          <div id="address" className="flex gap-3">
            <input
              name="street"
              id="street"
              type="text"
              value={data.street}
              onChange={handleUserDataChange}
              placeholder="Street No."
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />

            <input
              name="city"
              id="city"
              type="text"
              value={data.city}
              onChange={handleUserDataChange}
              placeholder="City"
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />
          </div>
          <div className="flex gap-3">
            <input
              name="country"
              id="country"
              type="text"
              value={data.country}
              onChange={handleUserDataChange}
              placeholder="Country"
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />

            <input
              name="zipCode"
              id="zipCode"
              type="text"
              value={data.zipCode}
              onChange={handleUserDataChange}
              placeholder="Zip Code"
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />
          </div>
        </address>

        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-fit disabled:bg-green-500/50 self-end cursor-pointer text-white text-xl font-medium bg-green-400 hover:bg-green-500 px-10 py-1 rounded-lg"
        >
          {loading ? (
            <span className="loader w-[20px] h-[20px] border-2 border-gray-100" />
          ) : (
            "Save"
          )}
        </button>
      </PopUp>
      <div className="min-w-[300px] w-full min-h-[500px] bg-white flex justify-center items-center">
        <MaxWidthWrapper className="relative top-0 w-full flex  flex-col items-center gap-x-20 p-5">
          <button
            onClick={() => setOpenPopUp(true)}
            className="absolute -top-10 sm:top-0 right-2 cursor-pointer text-lg sm:text-xl font-medium text-white bg-blue-500  hover:bg-blue-600 px-3 py-1 sm:px-5 sm:py-2 rounded"
          >
            Edit Profile
          </button>
          <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full border-2 border-blue-500">
            {user?.profileImage ? (
              <img
                src={image?.url}
                alt={`${user.fullName} image`}
                className="w-full h-full object-fill rounded-full "
              />
            ) : (
              <img
                src="/avatar.png"
                alt="avatar image"
                className="w-full h-full object-fill"
              />
            )}
          </div>
          <div className="flex flex-col items-center  gap-y-3 sm:gap-y-5 mt-10">
            <h4 className="capitalize text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800">
              {user?.fullName}
            </h4>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
              {user?.emailAddress}
            </p>
            {user?.phoneNumber && (
              <p className=" text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
                {user?.phoneNumber}
              </p>
            )}
            <p className="capitalize text-lg sm:text-xl md:text-2xl font-medium text-black">
              Role: {user?.role}
            </p>

            {user?.address && <address>{user?.address?.city}</address>}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Profile;

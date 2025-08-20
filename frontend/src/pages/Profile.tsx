import { useSelector } from "react-redux";
import { HeadingSection, PopUp } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import type { RootState } from "../store/store";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

interface UserData {
  fullName: string;
  description: string;
}

function Profile() {
  const imageRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File | string>("");
  const [data, setData] = useState<UserData>({
    fullName: "",
    description: "",
  });
  const formData = new FormData();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData: UserData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const imageRefHandler = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  formData.append("fullName", data.fullName);
  formData.append("description", data.description);
  formData.append("profileImage", profileImage);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <HeadingSection pageName="Profile">
        <h3>Profile</h3>
      </HeadingSection>
      <PopUp
        isOpen={openPopUp}
        setIsOpen={setOpenPopUp}
        className="w-full max-w-[500px] flex flex-col items-center gap-y-5 p-10"
      >
        <div
          onClick={imageRefHandler}
          className="cursor-pointer w-[100px] h-[100px] rounded-full border-2 border-blue-500 p-2"
        >
          <input
            ref={imageRef}
            onChange={handleProfileImage}
            type="file"
            className="hidden"
          />
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${user.fullName} image`}
              className="w-full h-full object-fill"
            />
          ) : (
            <img
              src="/avatar.png"
              alt="avatar image"
              className="w-full h-full object-fill"
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <label
            htmlFor="fullName"
            className="text-lg font-medium text-gray-800"
          >
            Full Name*
          </label>
          <input
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
            htmlFor="description"
            className="text-lg font-medium text-gray-800"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
            className="w-full min-h-20 max-h-52 border border-gray-300 focus:outline-blue-500 rounded p-2"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-fit self-end cursor-pointer text-white text-xl font-medium bg-green-400 hover:bg-green-500 px-10 py-1 rounded-lg"
        >
          Save
        </button>
      </PopUp>
      <div className="w-full min-h-[500px] bg-white flex justify-center">
        <MaxWidthWrapper className="relative top-0 w-full border flex  flex-col items-center gap-x-20 p-5">
          <button
            onClick={() => setOpenPopUp(true)}
            className="absolute top-10 right-10 cursor-pointer text-xl font-medium text-white bg-blue-500  hover:bg-blue-600 px-5 py-2 rounded"
          >
            Edit Profile
          </button>
          <div className="w-[150px] h-[150px] rounded-full border-2 border-blue-500 p-2">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.fullName} image`}
                className="w-full h-full object-fill"
              />
            ) : (
              <img
                src="/avatar.png"
                alt="avatar image"
                className="w-full h-full object-fill"
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-y-5 mt-10">
            <h4 className="capitalize text-5xl font-semibold text-gray-800">
              {user?.fullName}
            </h4>

            <p className=" text-2xl font-medium text-gray-800">
              {user?.emailAddress}
            </p>
            {user?.phoneNumber && (
              <p className=" text-2xl font-medium text-gray-800">
                {user?.phoneNumber}
              </p>
            )}
            <p className="capitalize text-2xl font-medium text-black">
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

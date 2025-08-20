import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  AddNewButton,
  AdminLayout,
  AdminSectionHeading,
  PopUp,
  TableHeadingWrapper,
  TableWrapper,
} from "../../components";
// import { categoryMenuList } from "../../utils/data";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchCategories } from "../../store/slices/categorySlice";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import "../../utils/loader.css";

function Categories() {
  const { categories } = useSelector((state: RootState) => state.categorySlice);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Category>({
    name: "",
    description: "",
    categoryImage: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData: Category) => ({ ...prevData, [name]: value }));
  };

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({ ...data, categoryImage: e.target.files[0] });
    }
  };

  const imageRefHandler = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("categoryImage", data.categoryImage as File);
  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/v1/categories", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(`Error: ${responseData.message}`);
      }
      setLoading(false);
      setData({
        name: "",
        description: "",
        categoryImage: "",
      });
      toast.success("Category published successflly!");
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  const openUpdatePopup = async (
    e: FormEvent<HTMLButtonElement>,
    category: Category
  ) => {
    e.preventDefault();
    setIsOpen(true);
    setData(category);
  };
  const handleDelete = async (
    e: FormEvent<HTMLButtonElement>,
    categoryId: string | undefined
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/v1/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      setData({
        name: "",
        description: "",
        categoryImage: "",
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, data, categories]);
  return (
    <AdminLayout>
      <AdminSectionHeading title="All Categories" />
      <AddNewButton
        handleClick={() => {
          setIsOpen(true);
        }}
        buttonTitle="ADD NEW CATEGORY"
      />
      <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="w-full max-w-[500px] flex flex-col items-center gap-y-5 p-10"
      >
        <div
          onClick={imageRefHandler}
          className="cursor-pointer w-[100px] h-[100px] rounded-full border-2 border-blue-500 "
        >
          <input
            ref={imageRef}
            onChange={handleProfileImage}
            type="file"
            className="hidden"
          />
          {data.categoryImage ? (
            <img
              src={
                data.categoryImage?.url
                  ? (data.categoryImage?.url as string)
                  : URL.createObjectURL(data.categoryImage as File)
              }
              alt={`${data.name} image`}
              className="w-full h-full object-fill rounded-full"
            />
          ) : (
            <img
              src="/dummyImage.png"
              alt="avatar image"
              className="w-full h-full object-fill"
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <label htmlFor="name" className="text-lg font-medium text-gray-800">
            Category Name*
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={data.name}
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
          disabled={loading}
          className="disabled:bg-green-500/50 self-end cursor-pointer w-[100px] h-10 flex justify-center items-center text-white text-xl font-medium bg-green-400 hover:bg-green-500 rounded-lg"
        >
          {loading ? (
            <span className="loader w-[20px] h-[20px] border-2 border-gray-100" />
          ) : (
            "Publish"
          )}
        </button>
      </PopUp>
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Image</TableHeadingWrapper>
            <TableHeadingWrapper>Name</TableHeadingWrapper>
            <TableHeadingWrapper>Description</TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Update/Delete
            </TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {categories &&
            categories?.length > 0 &&
            categories.map((category: Category) => {
              const image = category.categoryImage as CategoryImage;
              return (
                <tr key={category?._id} className="bg-gray-100 p-2 ">
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={image.url}
                      alt={category.name}
                      className="w-12 h-12 object-cover inline-block rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-2 text-lg text-gray-800">
                    {category?.name}
                  </td>
                  <td className="px-4 py-2 text-base text-gray-800">
                    {category?.description}
                  </td>
                  <td className="flex items-center justify-center gap-x-5 pt-5 px-4 text-center text-gray-800 font-semibold">
                    <button onClick={(e) => openUpdatePopup(e, category)}>
                      <LiaEditSolid className="cursor-pointer text-2xl text-green-500 hover:text-green-600" />
                    </button>
                    <button onClick={(e) => handleDelete(e, category._id)}>
                      <MdDelete className="cursor-pointer text-2xl text-red-500 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Categories;

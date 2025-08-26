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
import { MdDelete, MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchCategories } from "../../store/slices/categorySlice";
import toast from "react-hot-toast";
import { fetchProducts } from "../../store/slices/productSlice";

const manufacturers: string[] = [
  "Samsung",
  "Apple",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "Huawei",
  "Realme",
  "OnePlus",
];

function Products() {
  const { products } = useSelector((state: RootState) => state.productsSlice);
  const { categories } = useSelector((state: RootState) => state.categorySlice);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const productRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    price: 0.0,
    categoryId: "",
    manufacturer: "",
    inStock: true,
    rating: 0,
    slug: "",
    productImage: "",
  });

  const handleProductImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileImage = e.target.files[0];
      setProductData((prevData: Product) => ({
        ...prevData,
        productImage: fileImage,
      }));
      setPreviewImage(URL.createObjectURL(fileImage));
    }
  };

  const handleProductImageClick = () => {
    if (productRef.current) {
      productRef.current.click();
    }
  };

  const generateSlug = () => {
    const slug = productData.name.trim().toLowerCase().replace(/\s+/g, "-");
    setProductData((prevData: Product) => ({ ...prevData, slug: slug }));
  };

  const handleProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData: Product) => ({ ...prevData, [name]: value }));
  };

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", `${productData.price}`);
  formData.append("categoryId", productData.categoryId);
  formData.append("manufacturer", productData.manufacturer);
  formData.append("inStock", `${productData.inStock}`);
  formData.append("rating", `${productData.rating}`);
  formData.append("slug", productData.slug);
  formData.append("productImage", productData.productImage as File);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(productData);
    try {
      setLoading(true);
      const response = await fetch("/api/v1/products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      setLoading(false);
      setProductData({
        name: "",
        description: "",
        price: 0.0,
        categoryId: "",
        manufacturer: "",
        inStock: true,
        rating: 0,
        slug: "",
        productImage: "",
      });
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };
  const handleDelete = async (
    e: FormEvent<HTMLButtonElement>,
    productId: string | undefined
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/v1/products/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, categories, productData]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, productData]);

  return (
    <AdminLayout>
      <AdminSectionHeading title="All Products" />
      <AddNewButton
        handleClick={() => {
          setIsOpen(true);
        }}
        buttonTitle="ADD NEW PRODUCT"
      />
      <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="max-w-[800px] w-full flex gap-x-5 py-14 "
      >
        <div
          onClick={handleProductImageClick}
          className="w-[50%] flex justify-center items-center cursor-pointer w-72 h-72 bg-gray-200 border-2 border-gray-300 rounded-lg"
        >
          <input
            type="file"
            onChange={handleProductImageChange}
            ref={productRef}
            className="hidden"
          />
          {productData.productImage ? (
            <img
              src={previewImage}
              alt="dummy image"
              className="w-full h-full object-fill"
            />
          ) : (
            <img
              src="/dummyImage.png"
              alt="dummy image"
              className="w-full h-full object-fill"
            />
          )}
        </div>
        <div className="w-[50%] flex flex-col gap-y-2">
          <div className="w-full flex flex-col gap-y-1">
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-800"
            >
              Product Name
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              value={productData.name}
              onChange={handleProductChange}
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label
              htmlFor="description"
              className="text-base font-medium text-gray-800"
            >
              Description
            </label>
            <textarea
              required
              id="description"
              name="description"
              value={productData.description}
              onChange={handleProductChange}
              className="w-full min-h-32 max-h-40 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label
              htmlFor="price"
              className="text-base font-medium text-gray-800"
            >
              Price
            </label>
            <input
              required
              id="price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleProductChange}
              className="w-full h-8 border border-gray-300 focus:outline-blue-500 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-y-2 my-3">
            <input
              required
              readOnly
              id="slug"
              name="slug"
              type="text"
              value={productData.slug}
              placeholder="Generate slug..."
              className="w-full h-8 border border-gray-300 outline-none rounded p-2"
            />
            <button
              onClick={generateSlug}
              className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded"
            >
              Generate Slug
            </button>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label
              htmlFor="manufacturer"
              className="text-base font-medium text-gray-800"
            >
              Manufacturer
            </label>
            <select
              name="manufacturer"
              id="manufacturer"
              value={productData.manufacturer}
              onChange={handleProductChange}
              className="cursor-pointer border border-gray-300 px-2 py-1 text-base rounded outline-none w-full"
            >
              <option value="">-- Select Manufacturer --</option>
              {manufacturers.map((manufacturer: string) => (
                <option key={manufacturer} value={manufacturer} className="">
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label
              htmlFor="categoryId"
              className="text-base font-medium text-gray-800"
            >
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              value={productData.categoryId}
              onChange={handleProductChange}
              className="cursor-pointer border border-gray-300 px-2 py-1 text-base rounded outline-none w-full"
            >
              <option value="">-- Select Category --</option>
              {categories &&
                categories.length > 0 &&
                categories.map((category: Category) => (
                  <option key={category._id} value={category._id} className="">
                    {category.name}
                  </option>
                ))}
            </select>
            <div className="my-3 flex items-center gap-x-5">
              <label htmlFor="rating" className="text-gray-800 text-base">
                Rating:
              </label>
              <div className="flex items-center gap-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <MdOutlineStar
                    onClick={() =>
                      setProductData({ ...productData, rating: index + 1 })
                    }
                    key={index}
                    className={`cursor-pointer text-xl ${
                      productData.rating >= index + 1
                        ? "text-yellow-500"
                        : "text-gray-400"
                    } hover:scale-125 transition-transform ease-in-out duration-300 delay-75`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-5 ">
            <label className="text-gray-800">In Stock:</label>
            <div className="cursor-pointer flex items-center gap-x-2">
              <input
                id="instock-yes"
                name="instock"
                type="radio"
                checked={productData.inStock === true}
                value={"true"}
                onChange={() =>
                  setProductData({ ...productData, inStock: true })
                }
              />
              <label htmlFor="instock-yes" className="cursor-pointer">
                Yes
              </label>
            </div>
            <div className="cursor-pointer flex items-center gap-x-2">
              <input
                id="instock-no"
                name="instock"
                type="radio"
                checked={productData.inStock === false}
                value={"false"}
                onChange={() =>
                  setProductData({ ...productData, inStock: false })
                }
              />
              <label htmlFor="instock-no" className="cu rsor-pointer">
                No
              </label>
            </div>{" "}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="disabled:bg-green-500/50 flex justify-center items-center w-full cursor-pointer w-[100px] h-10  text-lg font-semibold bg-green-400 hover:bg-green-500 text-white rounded mt-5"
          >
            {loading ? (
              <span className="loader w-[20px] h-[20px] border-2 border-gray-100" />
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </PopUp>
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Product</TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Stock Availablity
            </TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Price
            </TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Delete
            </TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {products &&
            products.length > 0 &&
            products.map((product: Product) => {
              const image = product.productImage as CategoryImage;
              return (
                <tr key={product._id} className="bg-gray-100 p-2">
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 flex gap-x-3 items-center">
                    <img
                      src={image.url}
                      alt={product.name}
                      width={50}
                      className="w-[50px] object-cover rounded-xl"
                    />
                    <div className="inline-block">
                      <h3 className="text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.manufacturer}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {product.inStock ? (
                      <span className="text-white text-[12px] font-semibold bg-green-500 rounded-full px-3 py-1">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-white text-[12px] font-semibold bg-red-500 rounded-full px-3 py-1">
                        Out Of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800 font-medium">
                    {product.price}
                  </td>
                  <td className="text-center">
                    {" "}
                    <button onClick={(e) => handleDelete(e, product._id)}>
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

export default Products;

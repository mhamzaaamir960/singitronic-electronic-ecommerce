import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  AddNewButton,
  AdminLayout,
  AdminSectionHeading,
  PopUp,
  TableHeadingWrapper,
  TableWrapper,
} from "../../components";
import { demoProducts } from "../../utils/data";
import { MdOutlineStar } from "react-icons/md";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const productRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    price: 0.0,
    categoryId: "",
    manufacturer: "",
    inStock: false,
    rating: 0,
    slug: "",
    productImage: "",
  });

  const handleClick = () => {
    setIsOpen(true);
  };

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

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <AdminLayout>
      <AdminSectionHeading title="All Products" />
      <AddNewButton handleClick={handleClick} buttonTitle="ADD NEW PRODUCT" />
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
              htmlFor="category"
              className="text-base font-medium text-gray-800"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="cursor-pointer border border-gray-300 px-2 py-1 text-base rounded outline-none w-full"
            >
              <option value="">-- Select Category --</option>
              {manufacturers.map((manufacturer: string) => (
                <option key={manufacturer} value={manufacturer} className="">
                  {manufacturer}
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
            className="w-full cursor-pointer text-lg font-semibold bg-green-400 hover:bg-green-500 text-white py-2 rounded mt-5"
          >
            Publish
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
              Details
            </TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {demoProducts.map((product: ProductType) => (
            <tr key={product.id} className="bg-gray-100 p-2">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 flex gap-x-3 items-center">
                <img
                  src={`/${product.mainImage}`}
                  alt={product.title}
                  width={50}
                  className="w-[50px] object-cover rounded-xl"
                />
                <div className="inline-block">
                  <h3 className="text-lg font-medium text-gray-800">
                    {product.title}
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
                ${product.price}
              </td>
              <td className="text-center">details</td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Products;

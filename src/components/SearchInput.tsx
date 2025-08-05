import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");
  const searchProducts = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?search=${searchInput}`);
  };
  return (
    <form
      className="h-[50px] flex  w-full max-w-[60%] justify-center "
      onSubmit={searchProducts}
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search products here..."
        className="bg-gray-50 input input-bordered w-[70%] rounded-l-lg border border-gray-300 outline-none max-sm:w-full p-2"
      />
      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white rounded-r-xl hover:bg-blue-600 px-5 "
      >
        Search
      </button>
    </form>
  );
}

export default SearchInput;

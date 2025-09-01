function AddNewButton({
  buttonTitle,
  handleClick,
}: {
  buttonTitle: string;
  handleClick?: () => void;
}) {
  return (
    <button
      onClick={handleClick}
      className="self-end uppercase cursor-pointer text-white text-sm sm:text-base md:text-lg font-semibold bg-blue-500 hover:bg-blue-500/90 rounded md:rounded-lg px-3 sm:px-5 lg:px-8 py-2 md:py-3"
    >
      {buttonTitle}
    </button>
  );
}

export default AddNewButton;

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
      className="self-end uppercase cursor-pointer text-white text-lg font-semibold bg-blue-500 hover:bg-blue-500/90 rounded-lg px-8 py-3"
    >
      {buttonTitle}
    </button>
  );
}

export default AddNewButton;

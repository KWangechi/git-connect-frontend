const Modal = ({
  onClose,
  onOpen,
}: {
  onClose: () => void;
  onOpen: () => void;
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto" onClick={handleClick}>
      <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75">
        <div className="p-4 w-full max-w-md">
          {/* Your modal content here */}
        </div>
      </div>
      <div className="fixed inset-0 z-40" onClick={onOpen}>
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      <div className="fixed inset-y-0 right-0 px-4 sm:px-6">
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
        {/* Your modal actions here */}
        <button
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          onClick={() => {
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
};
export default Modal;

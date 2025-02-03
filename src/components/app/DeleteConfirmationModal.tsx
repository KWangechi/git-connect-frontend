const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          {/* Modal Header */}
          <h2 className="text-lg font-semibold text-center">Confirm Deletion</h2>
          <p className="text-gray-600 text-sm text-center mt-2">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
  
          {/* Modal Footer */}
          <div className="flex justify-center mt-4 space-x-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteConfirmationModal;
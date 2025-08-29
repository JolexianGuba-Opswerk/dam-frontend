import { FaTimes, FaExclamationCircle } from "react-icons/fa";

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        {/* Warning Icon */}
        <FaExclamationCircle className="w-16 h-16 text-red-600 mx-auto" />

        {/* Message */}
        <h3 className="text-lg font-medium text-gray-700 mt-4">{message}</h3>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

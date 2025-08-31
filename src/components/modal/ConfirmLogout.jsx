import { FaSignOutAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ModalPortal from "./ModalPortal";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  if (!isOpen) return null;

  const onConfirm = async () => {
    queryClient.clear();
    queryClient.removeQueries();
    sessionStorage.clear();
    window.location.href = "http://127.0.0.1:8000/api/logout/";
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/15 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 text-gray-700 text-center space-y-2">
            <FaSignOutAlt className="mx-auto text-red-500" size={40} />
            <p>Are you sure you want to log out?</p>
            <p className="text-sm text-gray-500">
              You will need to sign in again to access your account.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 px-6 py-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

import { FaInfoCircle } from "react-icons/fa";

const AdminOnlyNotice = () => {
  return (
    <div className="flex items-center gap-2 p-3 mb-4 mt-5  border border-blue-300 bg-blue-50 text-blue-700 rounded-lg text-sm">
      <FaInfoCircle className="text-blue-500 text-lg" />
      <span>
        Only administrators can update <strong>Department</strong>,{" "}
        <strong>Position</strong>, and <strong>Email</strong>. Please contact
        your administrator if you need changes.
      </span>
    </div>
  );
};

export default AdminOnlyNotice;

import { MdErrorOutline } from "react-icons/md";

export default function ErrorMessage({message}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-100 text-red-800 p-3 border border-red-300">
      <MdErrorOutline className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}

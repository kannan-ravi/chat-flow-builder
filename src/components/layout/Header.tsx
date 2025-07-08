import { FaCheckCircle } from "react-icons/fa";
import Logo from "/logo.jpg";

type HeaderPropsType = {
  onSaveChanges: () => void;
};
function Header({ onSaveChanges }: HeaderPropsType) {
  return (
    <header className="flex justify-between items-center h-14 bg-gray-100 px-4">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 h-10 rounded" />
        <div>
          <h1 className="text-xl font-semibold">Chatbot Flow Builder</h1>
          <p className="text-sm font-medium tracking-wide">
            By Kannan Ravindran
          </p>
        </div>
      </div>

      <button
        className="border cursor-pointer transition duration-300 outline-0 flex items-center gap-2 bg-gray-200 text-black border-gray-200 px-4 py-1.5 text-base"
        type="button"
        onClick={onSaveChanges}
      >
        <FaCheckCircle />
        Save Changes
      </button>
    </header>
  );
}

export default Header;

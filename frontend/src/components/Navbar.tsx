import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  function logoutUser() {
    localStorage.removeItem("token");
    toast.message("Logged out successfully");
    window.location.href = "/";
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 w-full  z-50 backdrop-blur-md bg-blue-500 text-white shadow-md rounded-lg px-6 py-3 m-4">
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-lg font-semibold">Nami-Payment App</div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden block">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row md:gap-8 gap-4 md:items-center absolute md:static top-14 left-0 right-0 bg-blue-500 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {localStorage.getItem("token") ? (
            <>
              <a
                href="/dashboard"
                className="hover:text-gray-200 transition duration-200"
              >
                Dashboard
              </a>
              <a
                href="/send"
                className="hover:text-gray-200 transition duration-200"
              >
                Send
              </a>
              <button
                type="button"
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                onClick={logoutUser}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/signup"
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Signup
              </a>
              <a
                href="/signin"
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Signin
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

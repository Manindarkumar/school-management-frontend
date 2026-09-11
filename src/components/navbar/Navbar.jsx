import { useState } from "react";
import {
  FaBars,
  FaUserCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] =
    useState(false);

  const user =
    JSON.parse(localStorage.getItem("user"));

  const handleProfileClick = () => {

    setShowDropdown(!showDropdown);

  };

const goToProfile = () => {

  if (!user) {
    console.log("User not found");
    return;
  }

  console.log("Logged User:", user);

  const role = user.role?.toLowerCase();

  if (role === "teacher") {

    navigate("/teacher/profile");

  } else if (role === "student") {

    console.log(
      "Student logged in. User ID:",
      user.id
    );

    navigate("/student/profile");

  } else if (role === "admin") {

    navigate("/admin/profile");

  }

  setShowDropdown(false);
};
  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div
      className="
        bg-gradient-to-r
        from-white
        to-slate-50
        border-b
        border-slate-200
        flex
        justify-between
        items-center
        p-4 md:p-5
        shadow-sm
        sticky
        top-0
        z-30
      "
    >

      {/* ========================= */}
      {/* LEFT - SIDEBAR BUTTON */}
      {/* ========================= */}

      <button
        onClick={toggleSidebar}
        title="Toggle sidebar"
        className="
          border
          border-slate-200
          p-2 md:p-3
          rounded-xl
          text-lg md:text-xl
          bg-white
          text-slate-700
          hover:bg-blue-600
          hover:text-white
          hover:border-blue-600
          transition-all
          duration-200
          shadow-sm
        "
      >

        <FaBars />

      </button>


      {/* ========================= */}
      {/* RIGHT - PROFILE */}
      {/* ========================= */}

      <div className="relative">

        <div
          onClick={handleProfileClick}
          className="
            cursor-pointer
            flex
            items-center
            gap-2
            hover:bg-slate-100
            pl-2
            pr-3
            py-1.5
            rounded-full
            border
            border-transparent
            hover:border-slate-200
            transition-all
            duration-200
          "
        >

          <FaUserCircle
            className="
              text-3xl
              text-blue-600
            "
          />

          {(user?.username || user?.email) && (
            <span className="hidden sm:block text-sm font-semibold text-slate-700">
              {user.username || user.email}
            </span>
          )}

        </div>


        {/* ========================= */}
        {/* DROPDOWN */}
        {/* ========================= */}

        {showDropdown && (

          <div
            className="
              absolute
              right-0
              mt-2
              w-48
              bg-white
              shadow-xl
              rounded-xl
              border
              border-slate-200
              z-50
              overflow-hidden
              py-1
            "
          >

            {/* My Profile */}

            <button
              onClick={goToProfile}
              className="
                w-full
                text-left
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-600
                transition-colors
              "
            >

              My Profile

            </button>


            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
                w-full
                text-left
                px-4
                py-3
                text-sm
                font-medium
                hover:bg-red-50
                text-red-600
                transition-colors
              "
            >

              Logout

            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default Navbar;
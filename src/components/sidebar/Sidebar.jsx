import {
  FaSchool,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { sidebarMenus } from "../../data/sidebarMenu";

function Sidebar({ open, setOpen }) {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const menus =
    sidebarMenus[user?.role] || [];

  return (

    <>

      {/* Overlay (mobile only - on desktop the sidebar pushes content instead of floating over it) */}
      {
        open && (

          <div

            onClick={() =>
              setOpen(false)
            }

            className="
              fixed
              inset-0
              bg-black/40
              z-40
              lg:hidden
            "
          />

        )
      }

      {/* Sidebar */}
      <div
        className={`

          fixed
          top-0
          left-0

          h-screen
          w-64

          bg-gradient-to-b
          from-slate-900
          to-slate-950
          text-white

          z-50

          transition-transform
          duration-300

          flex
          flex-col

          shadow-2xl

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

        `}
      >

        {/* Logo */}
       <div className="
  h-[84px]
  px-5
  flex
  items-center
  border-b
  border-slate-800
">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              bg-blue-600
              p-3
              rounded-xl
              shadow-lg
              shadow-blue-600/30
            ">

              <FaSchool className="
                text-xl
              " />

            </div>

            <div>

              <h3 className="
                text-2xl
                font-bold
              ">
                SMS
              </h3>

              <p className="
                text-sm
                text-slate-400
              ">
                School Management System
              </p>

            </div>

          </div>

        </div>

        {/* Menus */}
        <div className="
          flex
          flex-col
          flex-1
          min-h-0
        ">

          {/* Scrollable Menu */}
          <ul className="
            flex-1
            overflow-y-auto
            mt-5
          ">

            {
              menus.map((menu, index) => (

                <li key={index}>

                  <NavLink
                    to={menu.path}

                    onClick={() => {
                      // Only auto-close on mobile - on desktop the
                      // sidebar should stay open while navigating.
                      if (window.innerWidth < 1024) {
                        setOpen(false);
                      }
                    }}

                    className={({ isActive }) => `

                      flex
                      items-center
                      gap-3

                      mx-3
                      my-1
                      px-4
                      py-3
                      rounded-xl

                      hover:bg-slate-800

                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-blue-600 shadow-lg shadow-blue-600/20"
                          : "text-slate-300"
                      }
                    `}
                  >

                    <span className="
                      text-lg
                    ">
                      {menu.icon}
                    </span>

                    <span className="
                      font-medium
                    ">
                      {menu.name}
                    </span>

                  </NavLink>

                </li>

              ))
            }

          </ul>

          {/* Logout */}
          <div className="p-3">

            <hr className="
              border-slate-800
              mb-2
            " />

            <NavLink

              to="/login"

              className="
                flex
                items-center
                gap-3

                px-4
                py-3
                rounded-xl

                text-slate-300

                hover:bg-red-600
                hover:text-white

                transition-all
                duration-200
              "
            >

              <FaSignOutAlt />

              <span>
                Logout
              </span>

            </NavLink>

          </div>

        </div>

      </div>

    </>
  );
}

export default Sidebar;

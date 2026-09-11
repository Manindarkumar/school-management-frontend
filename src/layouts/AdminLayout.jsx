import { useState } from "react";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function AdminLayout({ children }) {

  // Sidebar is visible by default on desktop.
  // Clicking the navbar toggle button collapses / expands it.
  const [open, setOpen] =
    useState(true);

  return (

    <div className="
      bg-slate-100
      min-h-screen
    ">

      {/* Sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      {/* Main */}
      <div
        className={`
          flex
          flex-col
          min-h-screen
          transition-all
          duration-300
          ${open ? "lg:ml-64" : "lg:ml-0"}
        `}
      >

        {/* Navbar */}
        <Navbar
          toggleSidebar={() =>
            setOpen(!open)
          }
        />

        {/* Content */}
        <main className="
          flex-1
          p-4 md:p-6
        ">

          {children}

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default AdminLayout;
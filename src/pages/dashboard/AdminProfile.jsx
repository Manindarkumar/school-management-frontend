import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaUserShield,
  FaEnvelope,
  FaIdCard,
  FaCalendar,
  FaUser,
  FaUserTag,
  FaCheckCircle,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AdminProfile() {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH LOGGED-IN ADMIN PROFILE
  // =====================================================

  useEffect(() => {

    const fetchMyProfile = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        console.log("Logged in Admin User:", user);

        if (!user) {

          console.error("User not found");

          setLoading(false);

          return;

        }

        if (
          user.role?.toUpperCase() !== "ADMIN"
        ) {

          console.error(
            "Only admin profile can be viewed here"
          );

          setLoading(false);

          return;

        }

        console.log(
          "Admin User ID:",
          user.id
        );

        // =================================================
        // GET ADMIN PROFILE
        // =================================================

        const response =
          await apiService.getMyAdminProfile(
            user.id
          );

        console.log(
          "ADMIN PROFILE RESPONSE:",
          response
        );

        console.log(
          "ADMIN PROFILE DATA:",
          response.data
        );

        // =================================================
        // SUCCESS
        // =================================================

        if (
          response.data &&
          response.data.status === 0 &&
          response.data.data
        ) {

          setAdmin(
            response.data.data
          );

        } else {

          console.error(
            "Admin Profile API Error:",
            response.data?.message
          );

          setAdmin(null);

        }

      } catch (error) {

        console.error(
          "Failed to fetch admin profile:",
          error
        );

        setAdmin(null);

      } finally {

        setLoading(false);

      }

    };

    fetchMyProfile();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10 text-center">

          <h2 className="text-xl font-semibold">
            Loading Admin Profile...
          </h2>

        </div>

      </AdminLayout>

    );

  }


  // =====================================================
  // NO DATA
  // =====================================================

  if (!admin) {

    return (

      <AdminLayout>

        <div className="p-10">

          <button
            onClick={() => navigate(-1)}
            className="
              bg-gray-200
              hover:bg-gray-300
              px-5
              py-2
              rounded-xl
              font-semibold
              mb-6
            "
          >
            ← Back
          </button>

          <h2 className="
            text-2xl
            font-bold
            text-red-600
          ">
            Unable to load admin profile
          </h2>

          <p className="
            text-gray-500
            mt-2
          ">
            Please check the admin login and profile API.
          </p>

        </div>

      </AdminLayout>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <AdminLayout>

      <div className="p-6">

        {/* ================================================= */}
        {/* BACK BUTTON */}
        {/* ================================================= */}

        <div className="mb-6">

          <button
            onClick={() => navigate(-1)}
            className="
              bg-gray-200
              hover:bg-gray-300
              px-5
              py-2
              rounded-xl
              font-semibold
            "
          >
            ← Back
          </button>

        </div>


        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <div className="mb-8">

          <h1 className="
            text-4xl
            font-bold
            text-slate-800
          ">
            Admin Profile
          </h1>

        </div>


        {/* ================================================= */}
        {/* PROFILE CARD */}
        {/* ================================================= */}

        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
        ">


          {/* ================================================= */}
          {/* TOP SECTION */}
          {/* ================================================= */}

          <div className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-8
            border-b
            pb-8
          ">


            {/* PROFILE ICON */}

            <div className="
              bg-blue-100
              w-32
              h-32
              rounded-full
              flex
              items-center
              justify-center
            ">

              <FaUserShield
                className="
                  text-6xl
                  text-blue-600
                "
              />

            </div>


            {/* ADMIN NAME */}

            <div>

              <h2 className="
                text-3xl
                font-bold
              ">

                {admin.username || "N/A"}

              </h2>


              <p className="
                text-gray-500
                mt-2
              ">

                Admin ID:{" "}

                {admin.id || "N/A"}

              </p>


              <span className="
                inline-block
                mt-4
                bg-green-100
                text-green-700
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              ">

                {admin.status || "Active"}

              </span>

            </div>

          </div>


          {/* ================================================= */}
          {/* DETAILS */}
          {/* ================================================= */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mt-10
          ">


            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaEnvelope
                className="
                  text-blue-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold">

                  {admin.email || "N/A"}

                </h3>

              </div>

            </div>


            {/* ================================================= */}
            {/* USERNAME */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaUser
                className="
                  text-green-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Username
                </p>

                <h3 className="font-semibold">

                  {admin.username || "N/A"}

                </h3>

              </div>

            </div>


            {/* ================================================= */}
            {/* ADMIN ID */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaIdCard
                className="
                  text-indigo-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Admin ID
                </p>

                <h3 className="font-semibold">

                  {admin.id || "N/A"}

                </h3>

              </div>

            </div>


            {/* ================================================= */}
            {/* ROLE */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaUserTag
                className="
                  text-purple-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Role
                </p>

                <h3 className="font-semibold">

                  {admin.role || "N/A"}

                </h3>

              </div>

            </div>


            {/* ================================================= */}
            {/* STATUS */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaCheckCircle
                className="
                  text-green-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Account Status
                </p>

                <h3 className="font-semibold">

                  {admin.status || "N/A"}

                </h3>

              </div>

            </div>


            {/* ================================================= */}
            {/* CREATED DATE */}
            {/* ================================================= */}

            <div className="
              flex
              items-center
              gap-4
              bg-gray-50
              p-5
              rounded-2xl
            ">

              <FaCalendar
                className="
                  text-orange-600
                  text-2xl
                "
              />

              <div>

                <p className="text-gray-500">
                  Created At
                </p>

                <h3 className="font-semibold">

                  {admin.createdAt
                    ? new Date(
                        admin.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </h3>

              </div>

            </div>


          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminProfile;
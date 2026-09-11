import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaUmbrellaBeach,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheckCircle
} from "react-icons/fa";

import AdminLayout
from "../../layouts/AdminLayout";

import apiService
from "../../api/apiService";


function HolidayDetails() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [holiday, setHoliday] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  // =========================
  // GET HOLIDAY BY ID
  // =========================

  useEffect(() => {

    fetchHoliday();

  }, [id]);


  const fetchHoliday = async () => {

    try {

      setLoading(true);


      const response =
        await apiService.getHolidayById(id);


      console.log(
        "Holiday Details Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        setHoliday(
          response.data.data
        );

      } else {

        alert(
          response.data?.message ||
          "Holiday not found"
        );

        navigate(-1);

      }

    } catch (error) {

      console.error(
        "Get Holiday Details Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to fetch holiday details"
      );

      navigate(-1);

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <AdminLayout>

        <div className="
          flex
          justify-center
          items-center
          p-10
        ">

          <p className="
            text-gray-500
            text-lg
          ">
            Loading holiday details...
          </p>

        </div>

      </AdminLayout>

    );

  }


  // =========================
  // NO DATA
  // =========================

  if (!holiday) {

    return (

      <AdminLayout>

        <div className="
          text-center
          p-10
        ">

          <p className="
            text-gray-500
            text-lg
          ">
            Holiday not found
          </p>

        </div>

      </AdminLayout>

    );

  }


  return (

    <AdminLayout>

      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>


      {/* Header */}

      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <FaUmbrellaBeach
          className="
            text-4xl
            text-blue-600
          "
        />

        <h1 className="
          text-4xl
          font-bold
        ">
          Holiday Details
        </h1>

      </div>


      {/* Details */}

      <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">


          {/* Holiday Name */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Holiday Name
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {holiday.holidayName}
            </h2>

          </div>


          {/* Type */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Holiday Type
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {holiday.holidayType}
            </h2>

          </div>


          {/* Start Date */}

          <div>

            <p className="
              text-gray-500
              mb-2
              flex
              items-center
              gap-2
            ">

              <FaCalendarAlt />

              Start Date

            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {holiday.startDate}
            </h2>

          </div>


          {/* End Date */}

          <div>

            <p className="
              text-gray-500
              mb-2
              flex
              items-center
              gap-2
            ">

              <FaCalendarAlt />

              End Date

            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {holiday.endtDate}
            </h2>

          </div>


          {/* Status */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Status
            </p>

            <span className={`

              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              inline-flex
              items-center
              gap-2

              ${
                holiday.status === "Active"

                ? "bg-green-100 text-green-700"

                : holiday.status === "Inactive"

                ? "bg-red-100 text-red-700"

                : "bg-yellow-100 text-yellow-700"
              }

            `}>

              <FaCheckCircle />

              {holiday.status}

            </span>

          </div>


          {/* Created By */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Created By
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {holiday.createdByName || "N/A"}
            </h2>

          </div>


          {/* Description */}

          <div className="
            md:col-span-2
          ">

            <p className="
              text-gray-500
              mb-2
              flex
              items-center
              gap-2
            ">

              <FaInfoCircle />

              Description

            </p>

            <div className="
              bg-gray-100
              p-5
              rounded-2xl
            ">

              <p className="
                text-lg
                leading-8
              ">
                {holiday.description}
              </p>

            </div>

          </div>


        </div>

      </div>

    </AdminLayout>

  );

}


export default HolidayDetails;
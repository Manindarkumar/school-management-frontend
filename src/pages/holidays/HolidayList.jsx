import { useEffect, useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUmbrellaBeach
} from "react-icons/fa";

import AdminLayout
from "../../layouts/AdminLayout";

import apiService
from "../../api/apiService";


function HolidayList() {

  const navigate = useNavigate();


  const [holidays, setHolidays] =
    useState([]);


  const [search, setSearch] =
    useState("");


  const [loading, setLoading] =
    useState(true);


  const [currentPage, setCurrentPage] =
    useState(1);


  const itemsPerPage = 5;


  // =========================
  // GET ALL HOLIDAYS
  // =========================

  useEffect(() => {

    fetchHolidays();

  }, []);


  const fetchHolidays = async () => {

    try {

      setLoading(true);


      const response =
        await apiService.getAllHolidays();


      console.log(
        "Holiday List Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        setHolidays(
          response.data.data || []
        );

      } else {

        setHolidays([]);

      }

    } catch (error) {

      console.error(
        "Get Holidays Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to fetch holidays"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // SEARCH
  // =========================

  const filteredHolidays =
    holidays.filter((item) =>

      item.holidayName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );


  // =========================
  // PAGINATION
  // =========================

  const lastIndex =
    currentPage * itemsPerPage;


  const firstIndex =
    lastIndex - itemsPerPage;


  const currentHolidays =
    filteredHolidays.slice(
      firstIndex,
      lastIndex
    );


  const totalPages =
    Math.ceil(
      filteredHolidays.length /
      itemsPerPage
    );


  // =========================
  // DELETE
  // =========================

  const deleteHoliday = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this holiday?"
    );

  if (!confirmDelete) {
    return;
  }

  try {

    const response =
      await apiService.deleteHoliday(id);

    console.log(
      "Delete Holiday Response:",
      response.data
    );

    if (response.data?.status === 0) {

      alert(
        response.data.message ||
        "Holiday deleted successfully"
      );

      // Remove deleted holiday from UI
      setHolidays((prevHolidays) =>
        prevHolidays.filter(
          (item) => item.id !== id
        )
      );

    } else {

      alert(
        response.data?.message ||
        "Failed to delete holiday"
      );

    }

  } catch (error) {

    console.error(
      "Delete Holiday Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Something went wrong while deleting holiday"
    );

  }

};


  // =========================
  // SEARCH PAGE RESET
  // =========================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    setCurrentPage(1);

  };


  return (

    <AdminLayout>

      {/* Header */}

      <div className="
        flex
        flex-col
        md:flex-row
        justify-between
        md:items-center
        gap-5
        mb-8
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <FaUmbrellaBeach
            className="
              text-3xl
              text-blue-600
            "
          />

          <h1 className="
            text-4xl
            font-bold
          ">
            Holidays
          </h1>

        </div>


        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
        ">

          {/* Search */}

          <div className="
            flex
            items-center
            bg-white
            px-4
            rounded-xl
            shadow-md
          ">

            <FaSearch
              className="
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search Holiday..."
              value={search}
              onChange={handleSearch}
              className="
                p-3
                outline-none
              "
            />

          </div>


          {/* Add */}

          <Link
            to="/admin/holidays/add"
          >

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              + Add Holiday
            </button>

          </Link>

        </div>

      </div>


      {/* Table */}

      <div className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-auto
      ">

        <table className="
          w-full
        ">

          <thead className="
            bg-gray-100
            text-gray-600
          ">

            <tr>

              <th className="
                p-5
                text-left
              ">
                ID
              </th>


              <th className="
                p-5
                text-left
              ">
                HOLIDAY
              </th>


              <th className="
                p-5
                text-left
              ">
                TYPE
              </th>


              <th className="
                p-5
                text-left
              ">
                START DATE
              </th>


              <th className="
                p-5
                text-left
              ">
                END DATE
              </th>


              <th className="
                p-5
                text-left
              ">
                STATUS
              </th>


              <th className="
                p-5
                text-left
              ">
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="
                    text-center
                    p-10
                    text-gray-500
                  "
                >
                  Loading holidays...

                </td>

              </tr>

            ) : currentHolidays.length > 0 ? (

              currentHolidays.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >

                  {/* ID */}

                  <td className="
                    p-5
                  ">
                    {item.id}
                  </td>


                  {/* HOLIDAY */}

                  <td className="
                    p-5
                    font-semibold
                  ">
                    {item.holidayName}
                  </td>


                  {/* TYPE */}

                  <td className="
                    p-5
                  ">
                    {item.holidayType}
                  </td>


                  {/* START DATE */}

                  <td className="
                    p-5
                  ">
                    {item.startDate}
                  </td>


                  {/* END DATE */}

                  <td className="
                    p-5
                  ">
                    {item.endtDate}
                  </td>


                  {/* STATUS */}

                  <td className="
                    p-5
                  ">

                    <span
                      className={`

                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          item.status === "Active"

                          ? "bg-green-100 text-green-700"

                          : item.status === "Inactive"

                          ? "bg-red-100 text-red-700"

                          : "bg-yellow-100 text-yellow-700"
                        }

                      `}
                    >

                      {item.status}

                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="
                    p-5
                  ">

                    <div className="
                      flex
                      gap-3
                    ">


                      {/* VIEW */}

                      <Link
                        to={`/admin/holidays/details/${item.id}`}
                      >

                        <button
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            p-3
                            rounded-lg
                          "
                          title="View Holiday"
                        >

                          <FaEye />

                        </button>

                      </Link>


                      {/* EDIT */}

                      <Link
                        to={`/admin/holidays/edit/${item.id}`}
                      >

                        <button
                          className="
                            bg-yellow-500
                            hover:bg-yellow-600
                            text-white
                            p-3
                            rounded-lg
                          "
                          title="Edit Holiday"
                        >

                          <FaEdit />

                        </button>

                      </Link>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          deleteHoliday(item.id)
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          p-3
                          rounded-lg
                        "
                        title="Delete Holiday"
                      >

                        <FaTrash />

                      </button>


                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="
                    text-center
                    p-10
                    text-gray-500
                  "
                >

                  No Holidays Found

                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* Pagination */}

        {!loading &&
          totalPages > 0 && (

          <div className="
            flex
            justify-end
            items-center
            gap-2
            p-5
            flex-wrap
          ">


            {/* PREVIOUS */}

            <button
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              disabled={
                currentPage === 1
              }
              className="
                bg-gray-200
                px-4
                py-2
                rounded-lg
                disabled:opacity-50
              "
            >
              Previous
            </button>


            {/* PAGE NUMBERS */}

            {[...Array(totalPages)]
              .map((_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                  className={`

                    px-4
                    py-2
                    rounded-lg

                    ${
                      currentPage === index + 1

                      ? "bg-blue-600 text-white"

                      : "bg-gray-200"
                    }

                  `}
                >

                  {index + 1}

                </button>

              ))
            }


            {/* NEXT */}

            <button
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                disabled:opacity-50
              "
            >
              Next
            </button>


          </div>

        )}

      </div>

    </AdminLayout>

  );

}


export default HolidayList;
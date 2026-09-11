import { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import {
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes
} from "react-icons/fa";

import AdminLayout
from "../../layouts/AdminLayout";

import apiService
from "../../api/apiService";


function LeaveRequestList() {

  const [leaveRequests, setLeaveRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;


  // GET ALL LEAVE REQUESTS
  const fetchLeaveRequests = async () => {

    try {

      setLoading(true);

      const response =
        await apiService.getAllLeaveRequests();

      console.log(
        "Leave Requests:",
        response.data
      );

      if (response.data?.status === 0) {

        setLeaveRequests(
          response.data.data || []
        );

      } else {

        setLeaveRequests([]);

      }

    } catch (error) {

      console.error(
        "Error fetching leave requests:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to fetch leave requests"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchLeaveRequests();

  }, []);


  // APPROVE LEAVE
  const handleApprove = async (id) => {

    const adminRemark =
      window.prompt(
        "Enter admin remark:"
      );

    if (!adminRemark) {
      return;
    }


    try {

      const response =
        await apiService.approveLeaveRequest(
          id,
          {
            adminRemark: adminRemark
          }
        );


      console.log(
        "Approve Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        alert(
          response.data.message ||
          "Leave approved successfully"
        );

        fetchLeaveRequests();

      } else {

        alert(
          response.data?.message ||
          "Failed to approve leave"
        );

      }

    } catch (error) {

      console.error(
        "Approve Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong while approving leave"
      );

    }

  };


  // REJECT LEAVE
  const handleReject = async (id) => {

    const adminRemark =
      window.prompt(
        "Enter rejection remark:"
      );

    if (!adminRemark) {
      return;
    }


    try {

      const response =
        await apiService.rejectLeaveRequest(
          id,
          {
            adminRemark: adminRemark
          }
        );


      console.log(
        "Reject Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        alert(
          response.data.message ||
          "Leave rejected successfully"
        );

        fetchLeaveRequests();

      } else {

        alert(
          response.data?.message ||
          "Failed to reject leave"
        );

      }

    } catch (error) {

      console.error(
        "Reject Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong while rejecting leave"
      );

    }

  };


  // DELETE LEAVE
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this leave request?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await apiService.deleteLeaveRequest(
          id
        );


      console.log(
        "Delete Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        alert(
          response.data.message ||
          "Leave deleted successfully"
        );

        fetchLeaveRequests();

      } else {

        alert(
          response.data?.message ||
          "Failed to delete leave request"
        );

      }

    } catch (error) {

      console.error(
        "Delete Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong while deleting leave"
      );

    }

  };


  // SEARCH
  const filteredRequests =
    leaveRequests.filter((item) => {

      const searchText =
        search.toLowerCase();

      return (

        String(item.id)
          .toLowerCase()
          .includes(searchText)

        ||

        (item.studentName || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (item.teacherName || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (item.leaveType || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (item.status || "")
          .toLowerCase()
          .includes(searchText)

      );

    });


  // PAGINATION
  const totalPages =
    Math.ceil(
      filteredRequests.length /
      itemsPerPage
    );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const currentRequests =
    filteredRequests.slice(
      startIndex,
      startIndex + itemsPerPage
    );


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

          <FaCalendarAlt
            className="
              text-3xl
              text-blue-600
            "
          />

          <h1 className="
            text-4xl
            font-bold
          ">
            Leave Requests
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
              placeholder="Search..."
              value={search}
              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setCurrentPage(1);

              }}
              className="
                p-3
                outline-none
              "
            />

          </div>


          {/* Add */}
          <Link
            to="/admin/leaveRequests/add"
          >

            <button
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              + Add Leave
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
                NAME
              </th>

              <th className="
                p-5
                text-left
              ">
                ROLE
              </th>

              <th className="
                p-5
                text-left
              ">
                LEAVE TYPE
              </th>

              <th className="
                p-5
                text-left
              ">
                FROM
              </th>

              <th className="
                p-5
                text-left
              ">
                TO
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

            {loading ? (

              <tr>

                <td
                  colSpan="8"
                  className="
                    text-center
                    p-10
                  "
                >
                  Loading...
                </td>

              </tr>

            ) : currentRequests.length > 0 ? (

              currentRequests.map((item) => (

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


                  {/* NAME */}
                  <td className="
                    p-5
                    font-semibold
                  ">

                    {
                      item.studentName ||
                      item.teacherName ||
                      "-"
                    }

                  </td>


                  {/* ROLE */}
                  <td className="
                    p-5
                  ">

                    {
                      item.studentName
                        ? "Student"
                        : item.teacherName
                          ? "Teacher"
                          : "-"
                    }

                  </td>


                  {/* LEAVE TYPE */}
                  <td className="
                    p-5
                  ">
                    {item.leaveType}
                  </td>


                  {/* FROM */}
                  <td className="
                    p-5
                  ">
                    {item.fromDate}
                  </td>


                  {/* TO */}
                  <td className="
                    p-5
                  ">
                    {item.toDate}
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
                          item.status === "APPROVED"

                            ? "bg-green-100 text-green-700"

                            : item.status === "REJECTED"

                            ? "bg-red-100 text-red-700"

                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >

                      {item.status}

                    </span>

                  </td>

{/* ACTION */}
<td className="p-5">

  <div className="
    flex
    items-center
    gap-3
    whitespace-nowrap
  ">

    {/* VIEW */}
    <Link
      to={`/admin/leaveRequests/details/${item.id}`}
    >
      <button
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-3
          rounded-lg
          flex
          items-center
          justify-center
        "
        title="View Leave"
      >
        <FaEye size={20} />
      </button>
    </Link>


    {/* EDIT */}
    <Link
      to={`/admin/leaveRequests/edit/${item.id}`}
    >
      <button
        className="
          bg-yellow-500
          hover:bg-yellow-600
          text-white
          p-3
          rounded-lg
          flex
          items-center
          justify-center
        "
        title="Edit Leave"
      >
        <FaEdit size={20} />
      </button>
    </Link>


    {/* APPROVE + REJECT */}
    {item.status === "PENDING" && (
      <>

        {/* APPROVE */}
        <button
          onClick={() =>
            handleApprove(item.id)
          }
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-3
            rounded-lg
            flex
            items-center
            gap-2
            font-semibold
          "
          title="Approve Leave"
        >
          <FaCheck />
          Approve
        </button>


        {/* REJECT */}
        <button
          onClick={() =>
            handleReject(item.id)
          }
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-3
            rounded-lg
            flex
            items-center
            gap-2
            font-semibold
          "
          title="Reject Leave"
        >
          <FaTimes />
          Reject
        </button>

      </>
    )}


    {/* DELETE */}
    <button
      onClick={() =>
        handleDelete(item.id)
      }
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        p-3
        rounded-lg
        flex
        items-center
        justify-center
      "
      title="Delete Leave"
    >
      <FaTrash size={20} />
    </button>

  </div>

</td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="
                    text-center
                    p-10
                  "
                >
                  No Data Found
                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* Pagination */}
        <div className="
          flex
          justify-end
          items-center
          gap-2
          p-5
          flex-wrap
        ">

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
            "
          >
            Previous
          </button>


          {
            [...Array(totalPages)].map(
              (_, index) => (

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
                      currentPage ===
                      index + 1

                        ? "bg-blue-600 text-white"

                        : "bg-gray-200"
                    }
                  `}
                >

                  {index + 1}

                </button>

              )
            )
          }


          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Next
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}


export default LeaveRequestList;
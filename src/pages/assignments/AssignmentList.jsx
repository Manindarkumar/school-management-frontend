import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTasks,
} from "react-icons/fa";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AssignmentList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllAssignments();

      if (response.data.status === 0) {
        setAssignments(response.data.data);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter((assignment) =>
    (assignment.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentAssignments = filteredAssignments.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredAssignments.length / itemsPerPage
  );

  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this assignment?"
    );

    if (!confirmDelete) return;

    try {
      const response = await apiService.deleteAssignment(id);

      if (response.data.status === 0) {
        alert(response.data.message);

        // Refresh list
        fetchAssignments();

        // OR you can update state directly
        // setAssignments((prev) =>
        //   prev.filter((item) => item.id !== id)
        // );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete assignment");
    }
  };

  return (
    <AdminLayout>

      {/* Header */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-5
          mb-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <FaTasks
            className="
              text-3xl
              text-blue-600
            "
          />

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Assignments
          </h1>

        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
          "
        >

          {/* Search */}

          <div
            className="
              flex
              items-center
              bg-white
              px-4
              rounded-xl
              shadow-md
            "
          >

            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Assignment..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                p-3
                outline-none
              "
            />

          </div>

          <Link to="/admin/assignment/add">

            <button
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              + Add Assignment
            </button>

          </Link>

        </div>

      </div>

      {/* Table */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          overflow-auto
        "
      >

        <table className="w-full">

          <thead
            className="
              bg-gray-100
              text-gray-600
            "
          >

            <tr>

              <th className="p-5 text-left">ID</th>

              <th className="p-5 text-left">TITLE</th>

              <th className="p-5 text-left">SECTION</th>

              <th className="p-5 text-left">TEACHER</th>

              <th className="p-5 text-left">DUE DATE</th>

              <th className="p-5 text-left">YEAR</th>

              <th className="p-5 text-left">TOPICS</th>

              <th className="p-5 text-left">ACTION</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center p-10"
                >
                  Loading...
                </td>

              </tr>

            ) : currentAssignments.length > 0 ? (

              currentAssignments.map((assignment) => (

                <tr
                  key={assignment.id}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >

                  <td className="p-5">
                    {assignment.id}
                  </td>

                  <td className="p-5 font-semibold">
                    {assignment.title}
                  </td>

                  <td className="p-5">
                    {assignment.section}
                  </td>

                  <td className="p-5">
                    {assignment.teacherName}
                  </td>

                  <td className="p-5">
                    {assignment.dueDate}
                  </td>

                  <td className="p-5">
                    {assignment.year}
                  </td>

                  <td className="p-5">
                    {assignment.topics}
                  </td>

                  <td className="p-5">

                    <div className="flex gap-3">
                      <Link to={`/admin/assignment/details/${assignment.id}`}>
                        <button
                          className="
                            bg-blue-600
                            text-white
                            p-3
                            rounded-lg
                          "
                        >
                          <FaEye />
                        </button>
                      </Link>

                      <Link to={`/admin/assignment/edit/${assignment.id}`}>
                        <button
                          className="
                            bg-yellow-500
                            text-white
                            p-3
                            rounded-lg
                          "
                        >
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        className="
    bg-red-600
    hover:bg-red-700
    text-white
    p-3
    rounded-lg
  "
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
                  colSpan="8"
                  className="
                    text-center
                    p-10
                  "
                >
                  No Assignments Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

        {/* Pagination */}

        <div
          className="
            flex
            justify-end
            items-center
            gap-2
            p-5
            flex-wrap
          "
        >

          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
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

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
                }`}
            >
              {index + 1}
            </button>

          ))}

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
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
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AssignmentList;
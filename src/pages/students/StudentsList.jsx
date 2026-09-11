import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getAllStudents();

      console.log("API response", response);

      if (response.data.status === 0) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  const filteredStudents = students.filter((student) =>
    student.studentFullName?.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination
  const lastIndex = currentPage * studentsPerPage;

  const firstIndex = lastIndex - studentsPerPage;

  const currentStudents = filteredStudents.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Delete Student (Frontend only)
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      const response = await apiService.deleteStudent(id);

      if (response.data.status === 0) {
        alert(response.data.message);

        setStudents((prev) => prev.filter((student) => student.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-xl">Loading students...</div>
      </AdminLayout>
    );
  }

  // Small helper - initials for the avatar circle
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div
        className="
        flex flex-col md:flex-row
        justify-between md:items-center
        gap-5 mb-8
      "
      >
        <div>
          <h1
            className="
            text-3xl md:text-4xl font-bold text-slate-800
          "
          >
            Students
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredStudents.length} student{filteredStudents.length === 1 ? "" : "s"} enrolled
          </p>
        </div>

        <div
          className="
          flex flex-col sm:flex-row gap-4
        "
        >
          {/* Search */}
          <div
            className="
            flex items-center bg-white
            px-4 rounded-xl shadow-sm
            border border-slate-200
          "
          >
            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 outline-none text-sm"
            />
          </div>

          {/* Add */}
          <Link to="/admin/students/add">
            <button
              className="
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3
              rounded-xl transition-all
              shadow-sm shadow-blue-600/20
              font-semibold
              flex items-center gap-2
              whitespace-nowrap
            "
            >
              + Add Student
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div
        className="
        bg-white rounded-3xl
        shadow-sm border border-slate-200
        overflow-auto
      "
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Student List</h2>
        </div>

        <table className="w-full">
          <thead
            className="
            bg-slate-50 text-slate-500 text-xs uppercase tracking-wide
          "
          >
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Course</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Phone</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="
                    border-t border-slate-100 hover:bg-slate-50
                    transition-colors
                  "
                >
                  <td className="p-5 text-slate-500 font-medium">{student.studentFullId}</td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {getInitials(student.studentFullName)}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {student.studentFullName}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-slate-600">{student.courseName || "N/A"}</td>

                  <td className="p-5 text-slate-600">{student.email}</td>

                  <td className="p-5 text-slate-600">{student.mobileNumber}</td>

                  <td className="p-5">
                    <span
                      className="
                        px-3 py-1.5 rounded-full
                        text-xs font-semibold
                        bg-green-100 text-green-700
                      "
                    >
                      Active
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-2">
                      <Link to={`/admin/students/profile/${student?.id}`}>
                        <button
                          title="View"
                          className="
                            bg-blue-50 hover:bg-blue-600 hover:text-white
                            text-blue-600 p-2.5 rounded-lg
                            transition-colors
                          "
                        >
                          <FaEye />
                        </button>
                      </Link>

                      <Link to={`/admin/students/edit/${student?.id}`}>
                        <button
                          title="Edit"
                          className="
                            bg-amber-50 hover:bg-amber-500 hover:text-white
                            text-amber-600 p-2.5 rounded-lg
                            transition-colors
                          "
                        >
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        title="Delete"
                        onClick={() => deleteStudent(student.id)}
                        className="bg-red-50 hover:bg-red-600 hover:text-white text-red-600 p-2.5 rounded-lg transition-colors"
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
                  text-center p-10
                  text-slate-400 text-lg
                "
                >
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          className="
          flex justify-end items-center
          gap-2 p-5 flex-wrap
          border-t border-slate-100
        "
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="
            bg-slate-100 hover:bg-slate-200 text-slate-600
            px-4 py-2 text-sm font-medium
            rounded-lg disabled:opacity-40 transition-colors
          "
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`
                  w-9 h-9 rounded-lg font-semibold text-sm
                  transition-colors
                  ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }
                `}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
            bg-blue-600 hover:bg-blue-700 text-white
            px-4 py-2 text-sm font-medium rounded-lg
            disabled:opacity-40 transition-colors
          "
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default StudentList;

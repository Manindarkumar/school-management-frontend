import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await apiService.getAllTeacher();

      console.log("FULL RESPONSE =", response);

      // Case 1: apiService returns axios response
      if (response.data.status === 0) {
        setTeachers(response.data.data);
      }
      // Case 2: apiService returns response.data directly
      else if (response?.status === 0) {
        setTeachers(response.data || []);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.log("Failed to fetch teacher data:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    (teacher.teacherFullName || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-xl">Loading teachers...</div>
      </AdminLayout>
    );
  }

    // Delete Student (Frontend only)
  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?",
    );

    if (!confirmDelete) return;

    try {
      const response = await apiService.deleteTeacher(id);

      if (response.data.status === 0) {
        alert(response.data.message);

        setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Teachers</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredTeachers.length} teacher{filteredTeachers.length === 1 ? "" : "s"} on staff
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex items-center bg-white px-4 rounded-xl shadow-sm border border-slate-200">
            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search Teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 outline-none text-sm"
            />
          </div>

          {/* Add Teacher */}
          <Link to="/admin/teachers/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm shadow-blue-600/20 transition-all whitespace-nowrap">
              + Add Teacher
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-auto">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Teacher List</h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Subject</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Phone</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.teacherFullId}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-5 text-slate-500 font-medium">{teacher.teacherFullId}</td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {getInitials(teacher.teacherFullName)}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {teacher.teacherFullName}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-slate-600">{teacher.subject}</td>
                  <td className="p-5 text-slate-600">{teacher.email}</td>
                  <td className="p-5 text-slate-600">{teacher.mobileNumber}</td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        teacher.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex gap-2">
                      <Link to={`/admin/teachers/profile/${teacher?.id}`}>
                        <button title="View" className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 p-2.5 rounded-lg transition-colors">
                          <FaEye />
                        </button>
                      </Link>

                     <Link to={`/admin/teachers/edit/${teacher?.id}`}
                        title="Edit"
                        className="bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-600 p-2.5 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        title="Delete"
                        onClick={() => deleteTeacher(teacher.id)}
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
                <td colSpan="7" className="text-center p-10 text-slate-400 text-lg">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default TeacherList;

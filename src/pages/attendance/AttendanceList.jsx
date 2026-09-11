import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaClipboardCheck,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  const fetchAttendanceList = async () => {
    try {
      const response = await apiService.getAttendanceList();

      console.log("FULL RESPONSE =", response);

      if (response?.data?.status === 0) {
        setAttendance(response.data.data);
      } else if (response?.status === 0) {
        setAttendance(response.data || []);
      } else {
        setAttendance([]);
      }
    } catch (error) {
      console.log("Failed to fetch attendance:", error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredData = attendance.filter((item) =>
  item?.studentName?.toLowerCase()?.includes(search.toLowerCase())
);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const deleteAttendance = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this attendance record?"
  );

  if (!confirmDelete) return;

  try {
    const response = await apiService.deleteAttendance(id);

    if (response.data.status === 0) {
      alert(response.data.message);

      // Refresh list after delete
      fetchAttendanceList();
    }
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-xl">Loading attendance...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaClipboardCheck className="text-3xl text-blue-600" />
          <h1 className="text-4xl font-bold text-slate-800">Attendance</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white px-4 rounded-xl shadow-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 outline-none"
            />
          </div>

          <Link to="/admin/attendance/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
              + Mark Attendance
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">STUDENT</th>
              <th className="p-5 text-left">SUBJECT</th>
              <th className="p-5 text-left">DATE</th>
              <th className="p-5 text-left">STATUS</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-5">{item.id}</td>
                  <td className="p-5 font-semibold">{item.studentName}</td>
                  <td className="p-5">{item.subject}</td>
                  <td className="p-5">{item.date}</td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status.toUpperCase() === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : item.status.toUpperCase() === "ABSENT"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <Link to={`/admin/attendance/details/${item.id}`}>
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      <Link to={`/admin/attendance/edit/${item.id}`}>
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteAttendance(item.id)}
                        className="bg-red-600 text-white p-3 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-10 text-gray-500 text-xl">
                  No Attendance Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 p-5 flex-wrap">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AttendanceList;
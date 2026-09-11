import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function TimetableList() {
  const [timetables, setTimetables] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await apiService.getAllTimetable();

      if (response.data.status === 0) {
        setTimetables(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = timetables.filter((t) =>
    (t.courseName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filtered.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

const deleteTimetable = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this timetable?"
  );

  if (!confirmDelete) return;

  try {
    const response = await apiService.deleteTimetable(id);

    if (response.data.status === 0) {
      alert(response.data.message);

      console.log(response)

      setTimetables((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete timetable."
    );
  }
};

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-3xl text-blue-600" />
          <h1 className="text-4xl font-bold">Timetable</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white px-4 rounded-xl shadow-md">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 outline-none"
            />
          </div>

          <Link to="/admin/timetable/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
              + Add Timetable
            </button>
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-md overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">COURSE</th>
              <th className="p-5 text-left">TEACHER</th>
              <th className="p-5 text-left">DAY</th>
              <th className="p-5 text-left">TIME</th>
              <th className="p-5 text-left">BATCH</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-5">{t.id}</td>

                  <td className="p-5">{t.courseName}</td>

                  <td className="p-5">{t.teacherName}</td>

                  <td className="p-5">{t.day}</td>

                  <td className="p-5">
                    {t.startTime} - {t.endTime}
                  </td>

                  <td className="p-5">{t.batchName}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      {/* VIEW */}
                      <Link to={`/admin/timetable/details/${t.id}`}>
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      {/* EDIT */}
                      <Link to={`/admin/timetable/edit/${t.id}`}>
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteTimetable(t.id)}
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
                <td
                  colSpan="7"
                  className="text-center p-10 text-gray-500"
                >
                  No Timetable Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
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
            disabled={
              currentPage === totalPages || totalPages === 0
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TimetableList;
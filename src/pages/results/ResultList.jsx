import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChartBar
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function ResultList() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await apiService.getAllResults();

      if (response.data.status === 0) {
        setResults(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = results.filter((r) =>
    (r.studentName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filtered.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

const deleteResult = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this result?"
  );

  if (!confirmDelete) return;

  try {
    const response = await apiService.deleteResult(id);

    if (response.data.status === 0) {
      alert(response.data.message);

      // Remove deleted row without calling API again
      setResults((prev) => prev.filter((item) => item.id !== id));

      // OR you can use:
      // fetchResults();
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Failed to delete result."
    );
  }
};

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaChartBar className="text-3xl text-blue-600" />
          <h1 className="text-4xl font-bold">Results</h1>
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

          <Link to="/admin/results/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
              + Add Result
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
              <th className="p-5 text-left">STUDENT</th>
              <th className="p-5 text-left">COURSE</th>
              <th className="p-5 text-left">EXAM</th>
              <th className="p-5 text-left">MARKS</th>
              <th className="p-5 text-left">GRADE</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-5">{r.id}</td>
                  <td className="p-5 font-semibold">{r.studentName}</td>
                  <td className="p-5">{r.courseName}</td>
                  <td className="p-5">{r.examName}</td>
                  <td className="p-5">
                    {r.marksObtained}/{r.totalMarks}
                  </td>
                  <td className="p-5 font-bold text-green-600">
                    {r.grade}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <Link to={`/admin/results/details/${r.id}`}>
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      <Link to={`/admin/results/edit/${r.id}`}>
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteResult(r.id)}
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
                <td colSpan="7" className="text-center p-10 text-gray-500">
                  No Results Found
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

export default ResultList;
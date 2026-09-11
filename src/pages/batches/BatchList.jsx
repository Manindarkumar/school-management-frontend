import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaLayerGroup,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function BatchList() {
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await apiService.getAllBatches();

      if (response.data.status === 0) {
        setBatches(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching batches:", error);
    }
  };

  // Search
  const filteredBatches = batches.filter((batch) =>
    batch.batchName?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentBatches = filteredBatches.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredBatches.length / itemsPerPage
  );

  // Delete
  const deleteBatch = async (id) => {
    const confirmDelete = window.confirm("Delete this batch?");

    if (confirmDelete) {
      try {
        const response = await apiService.deleteBatch(id);

        if (response.data.status === 0) {
          alert(response.data.message);
          fetchBatches();
        }
      } catch (error) {
        console.log(error);
        alert("Delete failed");
      }
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaLayerGroup className="text-3xl text-blue-600" />

          <h1 className="text-4xl font-bold">
            Batches
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex items-center bg-white px-4 rounded-xl shadow-md">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Batch..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="p-3 outline-none"
            />
          </div>

          {/* Add */}
          <Link to="/admin/batch/add">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
              + Add Batch
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
              <th className="p-5 text-left">BATCH NAME</th>
              <th className="p-5 text-left">COURSE</th>
              <th className="p-5 text-left">TEACHER</th>
              <th className="p-5 text-left">STUDENTS</th>
              <th className="p-5 text-left">TIMING</th>
              <th className="p-5 text-left">STATUS</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentBatches.length > 0 ? (
              currentBatches.map((batch) => (
                <tr
                  key={batch.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-5">
                    {batch.id}
                  </td>

                  <td className="p-5 font-semibold">
                    {batch.batchName}
                  </td>

                  <td className="p-5">
                    {batch.course}
                  </td>

                  <td className="p-5">
                    {batch.teacherName}
                  </td>

                  <td className="p-5">
                    {batch.totalStudents}
                  </td>

                  <td className="p-5">
                    {batch.batchTiming}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        batch.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : batch.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {batch.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/batch/details/${batch.id}`}
                      >
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      <Link
                        to={`/admin/batch/edit/${batch.id}`}
                      >
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteBatch(batch.id)
                        }
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
                  colSpan="8"
                  className="text-center p-10"
                >
                  No Batches Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 p-5 flex-wrap">
          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            Previous
          </button>

          {[...Array(totalPages || 1)].map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default BatchList;
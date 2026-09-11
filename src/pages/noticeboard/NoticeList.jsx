import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBullhorn,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await apiService.getAllNotice();

      if (response.data.status === 0) {
        const role = localStorage.getItem("role"); // ADMIN / TEACHER / STUDENT

        let noticeData = response.data.data;

        // UI Role Filter
        if (role !== "ADMIN") {
          noticeData = noticeData.filter(
            (notice) =>
              notice.targetRole === "ALL" ||
              notice.targetRole === role
          );
        }

        setNotices(noticeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = notices.filter((notice) =>
    (notice.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filtered.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      await apiService.deleteNotice(id);

      alert("Notice deleted successfully.");

      fetchNotices();
    } catch (error) {
      console.log(error);
      alert("Delete failed.");
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-3xl text-blue-600" />

          <h1 className="text-4xl font-bold">
            Notice Board
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white px-4 rounded-xl shadow-md">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Notice..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="p-3 outline-none"
            />
          </div>

          <Link to="/admin/notice-board/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
              + Add Notice
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
              <th className="p-5 text-left">TITLE</th>
              <th className="p-5 text-left">ROLE</th>
              <th className="p-5 text-left">FROM DATE</th>
              <th className="p-5 text-left">TO DATE</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((notice) => (
                <tr
                  key={notice.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-5">
                    {notice.id}
                  </td>

                  <td className="p-5 font-semibold">
                    {notice.title}
                  </td>

                  <td className="p-5">
                    {notice.targetRole}
                  </td>

                  <td className="p-5">
                    {notice.fromDate || "-"}
                  </td>

                  <td className="p-5">
                    {notice.toDate || "-"}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/notice-board/details/${notice.id}`}
                      >
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      <Link
                        to={`/admin/notice-board/edit/${notice.id}`}
                      >
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteNotice(notice.id)
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
                  colSpan="6"
                  className="text-center p-10 text-gray-500"
                >
                  No Notices Found
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
            className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
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
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={
              currentPage === totalPages ||
              totalPages === 0
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

export default NoticeList;
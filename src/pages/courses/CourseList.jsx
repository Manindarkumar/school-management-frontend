import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBook,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;

  useEffect(() => {
    fetchAllCourse();
  }, []);

  const fetchAllCourse = async () => {
    try {
      const response = await apiService.fetchAllCourse();

      console.log("FULL RESPONSE =", response);

      if (response.data.status === 0) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.log("Failed to fetch courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * coursesPerPage;
  const firstIndex = lastIndex - coursesPerPage;
  const currentCourses = filteredCourses.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const deleteCourse = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-xl">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div className="flex items-center gap-3">
          <FaBook className="text-3xl text-blue-600" />
          <h1 className="text-4xl font-bold text-slate-800">Courses</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
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

          {/* Add Course */}
           <Link to="/admin/courses/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
              + Add Course
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-auto">
        <div className="p-6 border-b">
          <h2 className="text-3xl font-semibold">Course List</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">COURSE NAME</th>
              <th className="p-5 text-left">DESCRIPTION</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-5">{course.id}</td>
                  <td className="p-5 font-semibold">
                    {course.courseName}
                  </td>
                  <td className="p-5">{course.description}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <Link to={`/admin/courses/details/${course.id}`}>
                        <button className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaEye />
                        </button>
                      </Link>

                      <Link to={`/admin/courses/edit/${course.id}`}>
                        <button className="bg-yellow-500 text-white p-3 rounded-lg">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteCourse(course.id)}
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
                  colSpan="4"
                  className="text-center p-10 text-gray-500 text-xl"
                >
                  No Courses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
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
              disabled={currentPage === totalPages}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default CourseList;
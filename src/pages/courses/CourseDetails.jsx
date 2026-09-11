import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaBook,
  FaFileAlt,
  FaIdCard,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await apiService.getCourseDetails(id);

      console.log(response);

      if (response.data.status === 0) {
        setCourse(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch course details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

  if (!course) {
    return (
      <AdminLayout>
        <div className="p-10">No Course Found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Course Details
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
          <div className="bg-blue-100 w-32 h-32 rounded-full flex items-center justify-center">
            <FaBook className="text-6xl text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {course.courseName}
            </h2>

            <p className="text-gray-500 mt-2">
              Course ID: {course.id}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-6 mt-10">
          {/* Course ID */}
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaIdCard className="text-blue-600 text-2xl" />
            <div>
              <p className="text-gray-500">Course ID</p>
              <h3 className="font-semibold">{course.id}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="flex gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaFileAlt className="text-red-500 text-2xl mt-1" />
            <div>
              <p className="text-gray-500">Description</p>
              <h3 className="font-semibold leading-7">
                {course.description}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CourseDetails;
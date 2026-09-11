import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaLayerGroup,
  FaBook,
  FaUserTie,
  FaUsers,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function BatchDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatchDetails();
  }, [id]);

  const fetchBatchDetails = async () => {
    try {
      const response = await apiService.getBatchById(id);

      if (response.data.status === 0) {
        setBatch(response.data.data);
      }
    } catch (error) {
      console.log(error);
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

  if (!batch) {
    return (
      <AdminLayout>
        <div className="p-10">Batch not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl mb-6"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaLayerGroup className="text-4xl text-blue-600" />
        <h1 className="text-4xl font-bold">Batch Details</h1>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Batch Name */}
          <div className="flex items-center gap-4">
            <FaLayerGroup className="text-2xl text-blue-600" />
            <div>
              <p className="text-gray-500">Batch Name</p>
              <h2 className="text-xl font-semibold">
                {batch.batchName}
              </h2>
            </div>
          </div>

          {/* Course */}
          <div className="flex items-center gap-4">
            <FaBook className="text-2xl text-green-600" />
            <div>
              <p className="text-gray-500">Course</p>
              <h2 className="text-xl font-semibold">
                {batch.course}
              </h2>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-center gap-4">
            <FaUserTie className="text-2xl text-purple-600" />
            <div>
              <p className="text-gray-500">Teacher</p>
              <h2 className="text-xl font-semibold">
                {batch.teacherName}
              </h2>
            </div>
          </div>

          {/* Students */}
          <div className="flex items-center gap-4">
            <FaUsers className="text-2xl text-orange-600" />
            <div>
              <p className="text-gray-500">Total Students</p>
              <h2 className="text-xl font-semibold">
                {batch.totalStudents}
              </h2>
            </div>
          </div>

          {/* Timing */}
          <div className="flex items-center gap-4">
            <FaClock className="text-2xl text-cyan-600" />
            <div>
              <p className="text-gray-500">Batch Timing</p>
              <h2 className="text-xl font-semibold">
                {batch.batchTiming}
              </h2>
            </div>
          </div>

          {/* Grade */}
          <div className="flex items-center gap-4">
            <FaLayerGroup className="text-2xl text-indigo-600" />
            <div>
              <p className="text-gray-500">Grade</p>
              <h2 className="text-xl font-semibold">
                {batch.grade}
              </h2>
            </div>
          </div>

          {/* Section */}
          <div className="flex items-center gap-4">
            <FaLayerGroup className="text-2xl text-pink-600" />
            <div>
              <p className="text-gray-500">Section</p>
              <h2 className="text-xl font-semibold">
                {batch.section}
              </h2>
            </div>
          </div>

          {/* Batch Year */}
          <div className="flex items-center gap-4">
            <FaLayerGroup className="text-2xl text-yellow-600" />
            <div>
              <p className="text-gray-500">Batch Year</p>
              <h2 className="text-xl font-semibold">
                {batch.year}
              </h2>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4 md:col-span-2">
            <FaCheckCircle className="text-2xl text-green-600" />
            <div>
              <p className="text-gray-500">Status</p>
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
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

export default BatchDetails;
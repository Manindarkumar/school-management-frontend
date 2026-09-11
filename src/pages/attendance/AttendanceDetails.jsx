import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaLayerGroup,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AttendanceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [attendance, setAttendance] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceDetails();
  }, [id]);

  const fetchAttendanceDetails = async () => {
    try {
      const response = await apiService.getAttendanceById(id);

      if (response.data.status === 0) {
        const attendanceData = response.data.data;
        setAttendance(attendanceData);

        // call summary API using student id
        if (attendanceData.student?.id) {
          fetchAttendanceSummary(attendanceData.student.id);
        }
      }
    } catch (error) {
      console.log("Failed to fetch attendance details:", error);
      setLoading(false);
    }
  };

  const fetchAttendanceSummary = async (studentId) => {
    try {
      const response = await apiService.getAttendanceSummary(studentId);

      if (response.data.status === 0) {
        setSummary(response.data.data);
      }
    } catch (error) {
      console.log("Failed to fetch summary:", error);
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

  if (!attendance) {
    return (
      <AdminLayout>
        <div className="p-10">No attendance found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">Attendance Details</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-2xl flex items-center gap-4">
          <FaUserCheck className="text-green-600 text-3xl" />
          <div>
            <p>Present</p>
            <h3 className="text-2xl font-bold">
              {summary?.presentDays || 0}
            </h3>
          </div>
        </div>

        <div className="bg-red-100 p-6 rounded-2xl flex items-center gap-4">
          <FaUserTimes className="text-red-600 text-3xl" />
          <div>
            <p>Absent</p>
            <h3 className="text-2xl font-bold">
              {summary?.absentDays || 0}
            </h3>
          </div>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl flex items-center gap-4">
          <FaCalendarAlt className="text-blue-600 text-3xl" />
          <div>
            <p>Total Days</p>
            <h3 className="text-2xl font-bold">
              {summary?.totalDays || 0}
            </h3>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-2xl">
          <p>Percentage</p>
          <h3 className="text-2xl font-bold">
            {summary?.attendancePercentage || 0}%
          </h3>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student */}
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaUserGraduate className="text-blue-600 text-2xl" />
            <div>
              <p className="text-gray-500">Student Name</p>
              <h3 className="font-semibold">
                {summary?.studentName ||
                  `${attendance.student?.firstName || ""} 
                  ${attendance.student?.middleName || ""} 
                  ${attendance.student?.lastName || ""}`}
              </h3>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaChalkboardTeacher className="text-green-600 text-2xl" />
            <div>
              <p className="text-gray-500">Teacher Name</p>
              <h3 className="font-semibold">
                {attendance.teacher?.teacherFullName}
              </h3>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaBook className="text-purple-600 text-2xl" />
            <div>
              <p className="text-gray-500">Subject</p>
              <h3 className="font-semibold">
                {attendance.teacher?.subject}
              </h3>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-gray-500">Status</p>
            <h3
              className={`font-semibold ${
                attendance.status === "PRESENT"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {attendance.status}
            </h3>
          </div>

          {/* Batch */}
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl">
            <FaLayerGroup className="text-orange-600 text-2xl" />
            <div>
              <p className="text-gray-500">Batch Year</p>
              <h3 className="font-semibold">
                {attendance.batch?.batchYear}
              </h3>
            </div>
          </div>

          {/* Section */}
          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-gray-500">Section</p>
            <h3 className="font-semibold">
              {attendance.batch?.section}
            </h3>
          </div>

          {/* Grade */}
          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-gray-500">Grade</p>
            <h3 className="font-semibold">
              {attendance.batch?.grade?.gradeName}
            </h3>
          </div>

          {/* Date */}
          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-gray-500">Attendance Date</p>
            <h3 className="font-semibold">{attendance.date}</h3>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AttendanceDetails;
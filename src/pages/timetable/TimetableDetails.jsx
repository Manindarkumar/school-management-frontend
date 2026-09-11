import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function TimetableDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await apiService.getTimeTableById(id);

      if (response.data.status === 0) {
        setTimetable(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!timetable) {
    return (
      <AdminLayout>
        <div className="text-center mt-10 text-lg">
          Loading...
        </div>
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

      <h1 className="text-4xl font-bold mb-8">
        Timetable Details
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Course</p>
          <h2 className="text-lg font-semibold">
            {timetable.courseName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Teacher</p>
          <h2 className="text-lg font-semibold">
            {timetable.teacherFullName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Teacher ID</p>
          <h2 className="text-lg font-semibold">
            {timetable.teacherFullId}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Batch</p>
          <h2 className="text-lg font-semibold">
            {timetable.grade}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Day</p>
          <h2 className="text-lg font-semibold">
            {timetable.day}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Start Time</p>
          <h2 className="text-lg font-semibold">
            {timetable.startTime}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">End Time</p>
          <h2 className="text-lg font-semibold">
            {timetable.endTime}
          </h2>
        </div>

      </div>
    </AdminLayout>
  );
}

export default TimetableDetails;
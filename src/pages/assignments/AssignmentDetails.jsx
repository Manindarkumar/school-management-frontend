import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AssignmentDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = async () => {
    try {

      const response = await apiService.getAssignmentById(id);

      console.log("Assignment Details:", response.data);

      if (response.data.status === 0) {
        setAssignment(response.data.data);
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
        <div className="text-center text-xl py-20">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!assignment) {
    return (
      <AdminLayout>
        <div className="text-center text-red-500 py-20">
          Assignment Not Found
        </div>
      </AdminLayout>
    );
  }

  return (

    <AdminLayout>

      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          px-5
          py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Assignment Details
      </h1>

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-md
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <div>
          <p className="text-gray-500">Title</p>

          <h2 className="text-xl font-semibold">
            {assignment.title}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Teacher</p>

          <h2 className="text-lg font-semibold">
            {assignment.teacherName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Section</p>

          <h2 className="text-lg font-semibold">
            {assignment.section}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Year</p>

          <h2 className="text-lg font-semibold">
            {assignment.year}
          </h2>
        </div>

                <div>
          <p className="text-gray-500">
            Due Date
          </p>

          <h2 className="text-lg font-semibold">
            {assignment.dueDate}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">
            Topics
          </p>

          <h2 className="text-lg font-semibold">
            {assignment.topics}
          </h2>
        </div>

        <div className="md:col-span-2">

          <p className="text-gray-500">
            Description
          </p>

          <p className="text-lg leading-8 mt-2">
            {assignment.description}
          </p>

        </div>

      </div>

    </AdminLayout>

  );
}

export default AssignmentDetails;
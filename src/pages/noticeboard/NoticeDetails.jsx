import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function NoticeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await apiService.getNoticeById(id);

      if (response.data.status === 0) {
        setNotice(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notice.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center mt-20 text-xl font-semibold">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!notice) {
    return (
      <AdminLayout>
        <div className="text-center mt-20 text-red-600 text-xl">
          Notice Not Found
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

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">
        Notice Details
      </h1>

      {/* Card */}
      <div className="bg-white p-8 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title */}
        <div>
          <p className="text-gray-500">Title</p>
          <h2 className="text-xl font-semibold mt-1">
            {notice.title}
          </h2>
        </div>

        {/* Target Role */}
        <div>
          <p className="text-gray-500">Target Role</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.targetRole}
          </h2>
        </div>

        {/* From Date */}
        <div>
          <p className="text-gray-500">From Date</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.fromDate || "-"}
          </h2>
        </div>

        {/* To Date */}
        <div>
          <p className="text-gray-500">To Date</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.toDate || "-"}
          </h2>
        </div>

        {/* Created By */}
        <div>
          <p className="text-gray-500">Created By</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.createdByName}
          </h2>
        </div>

        {/* Created By Role */}
        <div>
          <p className="text-gray-500">Created By Role</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.createdByRole}
          </h2>
        </div>

        {/* Created Date */}
        <div className="md:col-span-2">
          <p className="text-gray-500">Created Date</p>
          <h2 className="text-lg font-semibold mt-1">
            {notice.createdDate}
          </h2>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <p className="text-gray-500">Message</p>

          <div className="mt-2 border rounded-xl p-5 bg-gray-50 leading-8">
            {notice.message}
          </div>
        </div>

      </div>

    </AdminLayout>
  );
}

export default NoticeDetails;
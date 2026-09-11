import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditNotice() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [notice, setNotice] = useState({
    title: "",
    message: "",
    targetRole: "",
    fromDate: "",
    toDate: "",
  });

  // Convert dd-MM-yyyy -> yyyy-MM-dd
  const formatDateForInput = (date) => {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return "";

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  // Convert yyyy-MM-dd -> dd-MM-yyyy
  const formatDateForApi = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await apiService.getNoticeById(id);

      if (response.data.status === 0) {
        const data = response.data.data;

        setNotice({
          title: data.title || "",
          message: data.message || "",
          targetRole: data.targetRole || "",
          fromDate: formatDateForInput(data.fromDate),
          toDate: formatDateForInput(data.toDate),
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notice");
    }
  };

  const handleChange = (e) => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: notice.title,
        message: notice.message,
        targetRole: notice.targetRole,
        fromDate: formatDateForApi(notice.fromDate),
        toDate: formatDateForApi(notice.toDate),
      };

      const response = await apiService.updateNotice(id, payload);

      if (response.data.status === 0) {
        alert(response.data.message);
        //navigate("/admin/notice-board");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <AdminLayout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Edit Notice
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div>
            <label className="font-semibold">
              Notice Title
            </label>

            <input
              type="text"
              name="title"
              value={notice.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            />
          </div>

          {/* Target Role */}
          <div>
            <label className="font-semibold">
              Target Role
            </label>

            <select
              name="targetRole"
              value={notice.targetRole}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            >
              <option value="">Select Role</option>
              <option value="ALL">ALL</option>
              <option value="ADMIN">ADMIN</option>
              <option value="TEACHER">TEACHER</option>
              <option value="STUDENT">STUDENT</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="font-semibold">
              From Date
            </label>

            <input
              type="date"
              name="fromDate"
              value={notice.fromDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="font-semibold">
              To Date
            </label>

            <input
              type="date"
              name="toDate"
              value={notice.toDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Message
            </label>

            <textarea
              name="message"
              rows="5"
              value={notice.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Notice
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditNotice;
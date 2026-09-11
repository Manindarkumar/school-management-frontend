import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddNotice() {
  const navigate = useNavigate();

  const [notice, setNotice] = useState({
    title: "",
    message: "",
    targetRole: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.createNotice(notice);

      if (response.data.status === 0) {
        alert(response.data.message);
        //navigate("/admin/noticeboard");
        setNotice({
          title: "",
          message: "",
          targetRole: "",
          fromDate: "",
          toDate: "",
        })
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to create notice."
      );
    }
  };

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

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        Add Notice
      </h1>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Notice Title */}
          <div>
            <label className="block font-semibold mb-2">
              Notice Title
            </label>

            <input
              type="text"
              name="title"
              value={notice.title}
              onChange={handleChange}
              placeholder="Enter Notice Title"
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Target Role */}
          <div>
            <label className="block font-semibold mb-2">
              Target Role
            </label>

            <select
              name="targetRole"
              value={notice.targetRole}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="TEACHER">TEACHER</option>
              <option value="STUDENT">STUDENT</option>
              <option value="ALL">ALL</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block font-semibold mb-2">
              From Date
            </label>

            <input
              type="date"
              name="fromDate"
              value={notice.fromDate}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block font-semibold mb-2">
              To Date
            </label>

            <input
              type="date"
              name="toDate"
              value={notice.toDate}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Notice Message */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Notice Message
            </label>

            <textarea
              name="message"
              rows="6"
              value={notice.message}
              onChange={handleChange}
              placeholder="Enter Notice Message"
              required
              className="w-full border p-3 rounded-xl resize-none"
            />
          </div>

          {/* Save Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Notice
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddNotice;
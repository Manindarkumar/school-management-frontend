import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";
function AddLeaveRequest() {

  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !leave.leaveType ||
      !leave.fromDate ||
      !leave.toDate ||
      !leave.reason
    ) {
      alert("Please fill all fields");
      return;
    }

    if (leave.fromDate > leave.toDate) {
      alert("From Date cannot be greater than To Date");
      return;
    }

    try {

      const payload = {
        leaveType: leave.leaveType,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        reason: leave.reason,
      };

      const response =
        await apiService.createLeaveRequest(payload);

      console.log("Leave Response:", response);

      if (response.data?.status === 0) {

        alert(
          response.data.message ||
          "Leave request submitted successfully"
        );

        setLeave({
          leaveType: "",
          fromDate: "",
          toDate: "",
          reason: ""
        })

        //navigate("/leave-requests");

      } else {

        alert(
          response.data?.message ||
          "Failed to submit leave request"
        );
      }

    } catch (error) {

      console.error("Leave Request Error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong while submitting leave request"
      );
    }
  };

  return (

    <AdminLayout>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Add Leave Request
      </h1>

      {/* Form */}
      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-md
      ">

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* Leave Type */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                Select Leave Type
              </option>

              <option value="Medical Leave">
                Medical Leave
              </option>

              <option value="Casual Leave">
                Casual Leave
              </option>

              <option value="Emergency Leave">
                Emergency Leave
              </option>

              <option value="Test Leave">
                Test Leave
              </option>

            </select>

          </div>

          {/* From Date */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              From Date
            </label>

            <input
              type="date"
              name="fromDate"
              value={leave.fromDate}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* To Date */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              To Date
            </label>

            <input
              type="date"
              name="toDate"
              value={leave.toDate}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* Reason */}
          <div className="md:col-span-2">

            <label className="
              block
              font-semibold
              mb-2
            ">
              Reason
            </label>

            <textarea
              rows="4"
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              placeholder="Enter Reason"
              className="
                w-full
                border
                p-3
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* Submit */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-400
                text-white
                px-6
                py-3
                rounded-xl
              "
            >

              {loading
                ? "Submitting..."
                : "Submit Leave Request"
              }

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddLeaveRequest;
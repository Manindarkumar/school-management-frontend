import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

import apiService
from "../../api/apiService";


function EditLeaveRequest() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [leave, setLeave] =
    useState({

      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: ""

    });


  const [loading, setLoading] =
    useState(true);


  const [updating, setUpdating] =
    useState(false);


  // Fetch Leave Request By ID
  const fetchLeaveRequest = async () => {

    try {

      const response =
        await apiService.getLeaveRequestById(id);

      console.log(
        "Leave Request Details:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        const data =
          response.data.data;


        // Auto fill form
        setLeave({

          leaveType:
            data.leaveType || "",

          fromDate:
            data.fromDate || "",

          toDate:
            data.toDate || "",

          reason:
            data.reason || ""

        });

      } else {

        alert(
          response.data?.message ||
          "Leave request not found"
        );

      }

    } catch (error) {

      console.error(
        "Error fetching leave request:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to fetch leave request"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    if (id) {

      fetchLeaveRequest();

    }

  }, [id]);


  // Handle input change
  const handleChange = (e) => {

    setLeave({

      ...leave,

      [e.target.name]:
        e.target.value

    });

  };


  // Update Leave Request
  const handleSubmit = async (e) => {

    e.preventDefault();


    // Validation
    if (
      !leave.leaveType ||
      !leave.fromDate ||
      !leave.toDate ||
      !leave.reason
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }


    // Date validation
    if (
      leave.fromDate >
      leave.toDate
    ) {

      alert(
        "From Date cannot be greater than To Date"
      );

      return;

    }


    try {

      setUpdating(true);


      const payload = {

        leaveType:
          leave.leaveType,

        fromDate:
          leave.fromDate,

        toDate:
          leave.toDate,

        reason:
          leave.reason

      };


      console.log(
        "Update Payload:",
        payload
      );


      const response =
        await apiService.updateLeaveRequest(
          id,
          payload
        );


      console.log(
        "Update Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        alert(
          response.data.message ||
          "Leave Request Updated Successfully"
        );


        navigate(
          "/admin/leaveRequests"
        );

      } else {

        alert(
          response.data?.message ||
          "Failed to update leave request"
        );

      }

    } catch (error) {

      console.error(
        "Error updating leave request:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Something went wrong while updating leave request"
      );

    } finally {

      setUpdating(false);

    }

  };


  // Loading
  if (loading) {

    return (

      <AdminLayout>

        <div className="
          text-center
          p-10
        ">

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
        Edit Leave Request
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


              <option value="Festival Leave">
                Festival Leave
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
              "
            />

          </div>


          {/* Reason */}
          <div className="
            md:col-span-2
          ">

            <label className="
              block
              font-semibold
              mb-2
            ">
              Reason
            </label>


            <textarea
              rows="5"
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* Button */}
          <div className="
            md:col-span-2
          ">

            <button
              type="submit"
              disabled={updating}
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

              {updating
                ? "Updating..."
                : "Update Leave Request"
              }

            </button>

          </div>


        </form>

      </div>

    </AdminLayout>

  );

}


export default EditLeaveRequest;
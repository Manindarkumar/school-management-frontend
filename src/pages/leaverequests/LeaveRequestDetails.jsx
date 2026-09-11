import { useEffect, useState } from "react";

import { useNavigate, useParams }
  from "react-router-dom";

import {
  FaCalendarAlt,
  FaUserGraduate,
  FaUserTie,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

import AdminLayout
  from "../../layouts/AdminLayout";

import apiService
  from "../../api/apiService";


function LeaveRequestDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [leave, setLeave] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // Fetch Leave By ID
  const fetchLeaveRequest = async () => {

    try {

      const response =
        await apiService.getLeaveRequestById(id);

      console.log(
        "Leave Details:",
        response.data
      );

      if (response.data?.status === 0) {

        setLeave(
          response.data.data
        );

      }

    } catch (error) {

      console.error(
        "Error fetching leave details:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchLeaveRequest();

  }, [id]);


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


  if (!leave) {

    return (

      <AdminLayout>

        <div className="
          text-center
          p-10
        ">
          Leave Request Not Found
        </div>

      </AdminLayout>

    );

  }


  // Name
  const name =
    leave.studentName ||
    leave.teacherName ||
    "-";


  // Role
  const role =
    leave.studentName
      ? "Student"
      : leave.teacherName
        ? "Teacher"
        : "-";


  return (

    <AdminLayout>

      {/* Back */}
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


      {/* Header */}
      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <FaCalendarAlt
          className="
            text-4xl
            text-blue-600
          "
        />

        <h1 className="
          text-4xl
          font-bold
        ">
          Leave Request Details
        </h1>

      </div>


      {/* Details */}
      <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">


          {/* Name */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Name
            </p>

            <h2 className="
              text-xl
              font-semibold
              flex
              items-center
              gap-2
            ">

              {
                role === "Student"

                  ? <FaUserGraduate />

                  : <FaUserTie />
              }

              {name}

            </h2>

          </div>


          {/* Role */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Role
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {role}
            </h2>

          </div>


          {/* Leave Type */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Leave Type
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {leave.leaveType}
            </h2>

          </div>


          {/* From Date */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              From Date
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {leave.fromDate}
            </h2>

          </div>


          {/* To Date */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              To Date
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {leave.toDate}
            </h2>

          </div>


          {/* Status */}
          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Status
            </p>

            <span className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              inline-flex
              items-center
              gap-2

              ${leave.status === "APPROVED"
                ? "bg-green-100 text-green-700"

                : leave.status === "REJECTED"
                  ? "bg-red-100 text-red-700"

                  : "bg-yellow-100 text-yellow-700"
              }
            `}>

              {
                leave.status === "APPROVED"

                  ? <FaCheckCircle />

                  : <FaClock />
              }

              {leave.status}

            </span>

          </div>


          {/* Reason */}
          <div className="md:col-span-2">

            <p className="
              text-gray-500
              mb-2
            ">
              Reason
            </p>

            <div className="
              bg-gray-100
              p-5
              rounded-2xl
            ">

              <p className="
                text-lg
                leading-8
              ">
                {leave.reason}
              </p>

            </div>

          </div>

          {/* Admin Remark */}
          <div className="md:col-span-2">

            <p className="
    text-gray-500
    mb-2
  ">
              Admin Remark
            </p>

            <div className="
    bg-gray-100
    p-5
    rounded-2xl
  ">

              <p className="
      text-lg
      leading-8
    ">
                {leave.adminRemark || "No admin remark"}
              </p>

            </div>

          </div>


        </div>

      </div>

    </AdminLayout>

  );

}

export default LeaveRequestDetails;
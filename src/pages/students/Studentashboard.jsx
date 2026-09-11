
import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaAward,
  FaTimesCircle,
  FaCalendarCheck,
  FaTimes,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  // =====================================
  // FETCH STUDENT DASHBOARD
  // =====================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          setLoading(false);
          return;
        }

        console.log("Student Dashboard ID:", user.id);

        const response = await apiService.getStudentDashboard(user.id);

        console.log("Student Dashboard Response:", response);

        if (response?.data?.status === 0) {
          setDashboard(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch student dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =====================================
  // SUMMARY
  // =====================================

  const summary = dashboard?.summary || {};

  // =====================================
  // CARD DATA
  // =====================================

  const cards = [
    {
      key: "courses",
      title: "My Courses",
      value: summary.totalCourses ?? 0,
      icon: <FaBookOpen />,
      bg: "bg-blue-600",
      details: (
        <div className="space-y-4">
          <DetailRow
            label="Total Courses"
            value={summary.totalCourses ?? 0}
          />

          {dashboard?.student && (
            <>
              <DetailRow
                label="Course"
                value={dashboard.student.courseName || "N/A"}
              />

              <DetailRow
                label="Batch"
                value={dashboard.student.batchName || "N/A"}
              />

              <DetailRow
                label="Semester"
                value={dashboard.student.semester || "N/A"}
              />

              <DetailRow
                label="Roll Number"
                value={dashboard.student.rollNumber || "N/A"}
              />
            </>
          )}
        </div>
      ),
    },

    {
      key: "attendance",
      title: "Attendance",
      value: `${summary.attendancePercentage ?? 0}%`,
      icon: <FaCalendarCheck />,
      bg: "bg-emerald-600",
      details: (
        <div className="space-y-4">
          <DetailRow
            label="Attendance"
            value={`${summary.attendancePercentage ?? 0}%`}
          />

          <DetailRow
            label="Present Days"
            value={summary.presentDays ?? 0}
          />

          <DetailRow
            label="Absent Days"
            value={summary.absentDays ?? 0}
          />

          <DetailRow
            label="Total Attendance"
            value={
              (summary.presentDays ?? 0) +
              (summary.absentDays ?? 0)
            }
          />
        </div>
      ),
    },

    {
      key: "assignments",
      title: "Total Assignments",
      value: summary.totalAssignments ?? 0,
      icon: <FaClipboardList />,
      bg: "bg-purple-600",
      details: (
        <div className="space-y-4">
          <DetailRow
            label="Total Assignments"
            value={summary.totalAssignments ?? 0}
          />

          <DetailRow
            label="Pending"
            value={summary.pendingAssignments ?? 0}
          />

          <DetailRow
            label="Completed"
            value={summary.completedAssignments ?? 0}
          />
        </div>
      ),
    },

    {
      key: "pending",
      title: "Pending Assignments",
      value: summary.pendingAssignments ?? 0,
      icon: <FaClock />,
      bg: "bg-orange-500",
      details: (
        <div>
          <DetailRow
            label="Pending Assignments"
            value={summary.pendingAssignments ?? 0}
          />

          <div className="mt-5 space-y-3">
            {dashboard?.pendingAssignments?.length > 0 ? (
              dashboard.pendingAssignments.map((assignment) => (
                <div
                  key={assignment.assignmentId}
                  className="bg-orange-50 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center gap-3">
                    <h4 className="font-semibold text-gray-800">
                      {assignment.title}
                    </h4>

                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {assignment.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Subject: {assignment.subject}
                  </p>

                  <p className="text-sm text-red-500 mt-2">
                    Due Date: {assignment.dueDate}
                  </p>
                </div>
              ))
            ) : (
              <EmptyMessage message="No pending assignments." />
            )}
          </div>
        </div>
      ),
    },

    {
      key: "completed",
      title: "Completed Assignments",
      value: summary.completedAssignments ?? 0,
      icon: <FaCheckCircle />,
      bg: "bg-green-600",
      details: (
        <div className="space-y-4">
          <DetailRow
            label="Completed Assignments"
            value={summary.completedAssignments ?? 0}
          />

          <DetailRow
            label="Total Assignments"
            value={summary.totalAssignments ?? 0}
          />

          <DetailRow
            label="Pending Assignments"
            value={summary.pendingAssignments ?? 0}
          />
        </div>
      ),
    },

    {
      key: "present",
      title: "Present Days",
      value: summary.presentDays ?? 0,
      icon: <FaAward />,
      bg: "bg-cyan-600",
      details: (
        <div>
          <DetailRow
            label="Present Days"
            value={summary.presentDays ?? 0}
          />

          <DetailRow
            label="Attendance Percentage"
            value={`${summary.attendancePercentage ?? 0}%`}
          />

          <div className="mt-5 space-y-3">
            {dashboard?.recentAttendance?.length > 0 ? (
              dashboard.recentAttendance.map((attendance, index) => (
                <div
                  key={index}
                  className="bg-cyan-50 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      {attendance.subject}
                    </p>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        attendance.status === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {attendance.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Date: {attendance.date}
                  </p>
                </div>
              ))
            ) : (
              <EmptyMessage message="No attendance records available." />
            )}
          </div>
        </div>
      ),
    },

    {
      key: "absent",
      title: "Absent Days",
      value: summary.absentDays ?? 0,
      icon: <FaTimesCircle />,
      bg: "bg-red-600",
      details: (
        <div className="space-y-4">
          <DetailRow
            label="Absent Days"
            value={summary.absentDays ?? 0}
          />

          <DetailRow
            label="Present Days"
            value={summary.presentDays ?? 0}
          />

          <DetailRow
            label="Attendance Percentage"
            value={`${summary.attendancePercentage ?? 0}%`}
          />
        </div>
      ),
    },
  ];

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="text-lg font-semibold text-gray-600">
            Loading dashboard...
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =====================================
  // DASHBOARD
  // =====================================

  return (
    <AdminLayout>
      <div className="w-full">

        {/* =====================================
            SUMMARY CARDS
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mb-7
          "
        >
          {cards.slice(0, 4).map((card) => (
            <DashboardCard
              key={card.key}
              card={card}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* =====================================
            SECOND ROW - 3 CARDS
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            mb-8
          "
        >
          {cards.slice(4, 7).map((card) => (
            <DashboardCard
              key={card.key}
              card={card}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* =====================================
            OTHER DASHBOARD SECTIONS
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pending Assignments */}

          <DashboardSection
            title="Pending Assignments"
            icon={<FaClipboardList />}
          >
            {dashboard?.pendingAssignments?.length > 0 ? (
              dashboard.pendingAssignments.map((assignment) => (
                <div
                  key={assignment.assignmentId}
                  className="bg-orange-50 rounded-xl p-4 mb-3"
                >
                  <div className="flex justify-between items-center gap-3">
                    <h3 className="font-semibold text-gray-800">
                      {assignment.title}
                    </h3>

                    <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {assignment.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {assignment.subject}
                  </p>

                  <p className="text-sm text-red-500 mt-2">
                    Due: {assignment.dueDate}
                  </p>
                </div>
              ))
            ) : (
              <EmptyMessage message="No pending assignments." />
            )}
          </DashboardSection>

          {/* Recent Attendance */}

          <DashboardSection
            title="Recent Attendance"
            icon={<FaCalendarCheck />}
          >
            {dashboard?.recentAttendance?.length > 0 ? (
              dashboard.recentAttendance.map((attendance, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-4 mb-3"
                >
                  <div>
                    <p className="font-semibold">
                      {attendance.subject}
                    </p>

                    <p className="text-sm text-gray-500">
                      {attendance.date}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      attendance.status === "PRESENT"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {attendance.status}
                  </span>
                </div>
              ))
            ) : (
              <EmptyMessage message="No attendance records." />
            )}
          </DashboardSection>

          {/* Upcoming Exams */}

          <DashboardSection
            title="Upcoming Exams"
            icon={<FaClipboardList />}
          >
            {dashboard?.upcomingExams?.length > 0 ? (
              dashboard.upcomingExams.map((exam) => (
                <div
                  key={exam.examId}
                  className="bg-blue-50 rounded-xl p-4 mb-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {exam.examName}
                    </h3>

                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {exam.totalMarks} Marks
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Course: {exam.courseName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Batch: {exam.batchName}
                  </p>

                  <p className="text-sm text-red-500 mt-2">
                    Exam Date: {exam.examDate}
                  </p>

                  <p className="text-sm text-gray-500">
                    Teacher: {exam.teacherName}
                  </p>
                </div>
              ))
            ) : (
              <EmptyMessage message="No upcoming exams." />
            )}
          </DashboardSection>

          {/* Recent Notices */}

          <DashboardSection
            title="Recent Notices"
            icon={<FaBookOpen />}
          >
            {dashboard?.recentNotices?.length > 0 ? (
              dashboard.recentNotices.map((notice) => (
                <div
                  key={notice.noticeId}
                  className="bg-purple-50 rounded-xl p-4 mb-3"
                >
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-semibold text-gray-800">
                      {notice.title}
                    </h3>

                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {notice.targetRole}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {notice.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Date: {notice.date}
                  </p>

                  <p className="text-xs text-gray-500">
                    Created By: {notice.createdBy}
                  </p>
                </div>
              ))
            ) : (
              <EmptyMessage message="No recent notices." />
            )}
          </DashboardSection>

        </div>

        {/* =====================================
            POPUP
        ====================================== */}

        {selectedCard && (
          <div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/50
              backdrop-blur-sm
              px-4
            "
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="
                bg-white
                w-full
                max-w-xl
                rounded-2xl
                shadow-2xl
                overflow-hidden
                max-h-[85vh]
              "
              onClick={(e) => e.stopPropagation()}
            >

              {/* Modal Header */}

              <div
                className={`
                  ${selectedCard.bg}
                  px-6
                  py-5
                  text-white
                  flex
                  justify-between
                  items-center
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {selectedCard.icon}
                  </div>

                  <h2 className="text-xl font-bold">
                    {selectedCard.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-white/20
                    hover:bg-white/30
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}

              <div className="p-6 max-h-[65vh] overflow-y-auto">
                {selectedCard.details}
              </div>

              {/* Modal Footer */}

              <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="
                    px-5
                    py-2
                    rounded-xl
                    bg-gray-800
                    text-white
                    font-semibold
                    hover:bg-gray-700
                  "
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}


/* =====================================
   DASHBOARD CARD
===================================== */

function DashboardCard({ card, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        ${card.bg}
        relative
        min-h-[155px]
        rounded-2xl
        px-7
        py-6
        text-white
        cursor-pointer
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-200
        group
        overflow-hidden
      `}
    >

      {/* Title */}

      <div className="text-base font-semibold">
        {card.title}
      </div>

      {/* Value */}

      <div className="text-4xl font-bold mt-5">
        {card.value}
      </div>

      {/* Icon */}

      <div
        className="
          absolute
          right-6
          top-6
          text-4xl
          opacity-80
          group-hover:scale-110
          transition-transform
          duration-200
        "
      >
        {card.icon}
      </div>

      {/* Subtle decorative circle */}

      <div
        className="
          absolute
          -right-8
          -bottom-10
          w-32
          h-32
          rounded-full
          bg-white/10
        "
      />

    </div>
  );
}


/* =====================================
   DETAIL ROW
===================================== */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center gap-5 border-b pb-3">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-gray-800 text-right">
        {value}
      </span>
    </div>
  );
}


/* =====================================
   DASHBOARD SECTION
===================================== */

function DashboardSection({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

      </div>

      {children}

    </div>
  );
}


/* =====================================
   EMPTY MESSAGE
===================================== */

function EmptyMessage({ message }) {
  return (
    <div className="text-center py-8 text-gray-400">
      {message}
    </div>
  );
}

export default StudentDashboard;


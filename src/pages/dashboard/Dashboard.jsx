import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaLayerGroup,
  FaTasks,
  FaFileAlt,
  FaGraduationCap,
  FaUmbrellaBeach,
  FaCalendarCheck,
  FaUserClock,
  FaCloudUploadAlt,
  FaQuestionCircle,
  FaEye,
  FaArrowRight,
  FaPlus,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaUserGraduate,
  FaClock,
  FaChartBar,
  FaAward,
  FaBell,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // MODAL STATE  (NEW)
  // =========================================================
  // activeModal holds the "key" of whichever summary card was
  // clicked (e.g. "students", "teachers"...) or null if closed.
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (key) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  // =========================================================
  // FETCH ADMIN DASHBOARD
  // =========================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiService.getAdminDashboard();

        console.log("ADMIN DASHBOARD RESPONSE:", response);

        if (response?.data?.status === 0) {
          setDashboard(response.data.data);
        } else {
          console.error(
            "Admin Dashboard Error:",
            response?.data?.message
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch admin dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[80vh] bg-[#f8fafc] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

            <p className="mt-4 text-slate-500 font-medium">
              Loading dashboard...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =========================================================
  // NO DATA
  // =========================================================

  if (!dashboard) {
    return (
      <AdminLayout>
        <div className="min-h-[80vh] bg-[#f8fafc] flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <p className="text-slate-600 font-semibold">
              Unable to load dashboard data.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =========================================================
  // DATA
  // =========================================================

  const summary = dashboard.summary || {};

  const attendance = dashboard.attendanceSummary || {};
  const leave = dashboard.leaveRequestSummary || {};
  const questions = dashboard.questionSummary || {};
  const submissions = dashboard.submissionSummary || {};

  const recentCourses = dashboard.recentCourses || [];
  const recentBatches = dashboard.recentBatches || [];
  const recentAssignments = dashboard.recentAssignments || [];
  const upcomingExams = dashboard.upcomingExams || [];

  const recentStudents = dashboard.recentStudents || [];
  const recentTeachers = dashboard.recentTeachers || [];

  const recentNotices = dashboard.recentNotices || [];
  const recentHolidays = dashboard.recentHolidays || [];
  const recentResults = dashboard.recentResults || [];

  const todayTimetable = dashboard.todayTimetable || [];

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      let parsedDate;

      if (
        typeof date === "string" &&
        /^\d{2}-\d{2}-\d{4}$/.test(date)
      ) {
        const [day, month, year] = date.split("-");
        parsedDate = new Date(
          `${year}-${month}-${day}`
        );
      } else {
        parsedDate = new Date(date);
      }

      if (isNaN(parsedDate.getTime())) {
        return date;
      }

      return parsedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const viewPage = (path) => {
    navigate(path);
  };

  const safeValue = (value, fallback = "N/A") => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return fallback;
    }

    return value;
  };

  // =========================================================
  // MODAL CONFIG  (NEW)
  // =========================================================
  // One entry per summary card. Each defines:
  //  - title / icon / accent color for the popup header
  //  - the array of items to list (from dashboard data)
  //  - how to render each row (line1 = bold text, line2 = sub text, right = badge)
  //  - viewAllPath = where "View all" in the footer should navigate

  const modalConfig = {
    students: {
      title: "My Students",
      icon: <FaUserGraduate />,
      color: "bg-[#2161f5]",
      total: summary.totalStudents,
      items: recentStudents,
      viewAllPath: "/admin/students",
      renderItem: (s) => ({
        left: safeValue(s.studentName),
        sub: safeValue(s.courseName),
        rightTop: safeValue(s.rollNumber),
        rightBottom: safeValue(s.mobileNumber),
      }),
    },
    teachers: {
      title: "My Teachers",
      icon: <FaChalkboardTeacher />,
      color: "bg-[#00a83b]",
      total: summary.totalTeachers,
      items: recentTeachers,
      viewAllPath: "/admin/teachers",
      renderItem: (t) => ({
        left: safeValue(t.teacherName),
        sub: safeValue(t.subject),
        rightTop: safeValue(t.qualification),
        rightBottom: safeValue(t.mobileNumber),
      }),
    },
    courses: {
      title: "Courses",
      icon: <FaBook />,
      color: "bg-[#9817f5]",
      total: summary.totalCourses,
      items: recentCourses,
      viewAllPath: "/admin/courses",
      renderItem: (c) => ({
        left: safeValue(c.courseName),
        sub: safeValue(c.description, "No description"),
      }),
    },
    batches: {
      title: "Batches",
      icon: <FaLayerGroup />,
      color: "bg-[#f97316]",
      total: summary.totalBatches,
      items: recentBatches,
      viewAllPath: "/admin/batches",
      renderItem: (b) => ({
        left: safeValue(b.batchName),
        sub: `${safeValue(b.courseName)} | Section ${safeValue(b.section)}`,
        rightTop: `${b.totalStudents ?? 0} Students`,
      }),
    },
    assignments: {
      title: "Assignments",
      icon: <FaTasks />,
      color: "bg-[#e90073]",
      total: summary.totalAssignments,
      items: recentAssignments,
      viewAllPath: "/admin/assignments",
      renderItem: (a) => ({
        left: safeValue(a.title),
        sub: `${safeValue(a.batchName)} | Teacher: ${safeValue(a.teacherName)}`,
        rightTop: formatDate(a.dueDate),
      }),
    },
    exams: {
      title: "Exams",
      icon: <FaGraduationCap />,
      color: "bg-[#4d3df5]",
      total: summary.totalExams,
      items: upcomingExams,
      viewAllPath: "/admin/exams",
      renderItem: (e) => ({
        left: safeValue(e.examName),
        sub: `${safeValue(e.courseName)} - ${safeValue(e.batchName)}`,
        rightTop: formatDate(e.examDate),
      }),
    },
    results: {
      title: "Results",
      icon: <FaChartBar />,
      color: "bg-[#0798b7]",
      total: summary.totalResults,
      items: recentResults,
      viewAllPath: "/admin/results",
      renderItem: (r) => ({
        left: safeValue(r.studentName),
        sub: safeValue(r.examName),
        rightTop: safeValue(r.marksObtained, 0),
        rightBottom: safeValue(r.grade),
      }),
    },
    notices: {
      title: "Notices",
      icon: <FaBullhorn />,
      color: "bg-[#ea580c]",
      total: summary.totalNotices,
      items: recentNotices,
      viewAllPath: "/admin/notices",
      renderItem: (n) => ({
        left: safeValue(n.title),
        sub: safeValue(n.message, "No message"),
        rightTop: formatDate(n.date),
      }),
    },
    holidays: {
      title: "Holidays",
      icon: <FaUmbrellaBeach />,
      color: "bg-[#db2777]",
      total: summary.totalHolidays,
      items: recentHolidays,
      viewAllPath: "/admin/holidays",
      renderItem: (h) => ({
        left: safeValue(h.holidayName),
        sub: formatDate(h.date),
      }),
    },
    // Cards below don't have per-item lists in the dashboard payload,
    // so their popup shows the summary stats instead of a list.
    attendance: {
      title: "Attendance",
      icon: <FaCalendarCheck />,
      color: "bg-[#ff6a00]",
      total: `${attendance.attendancePercentage ?? 0}%`,
      stats: [
        { label: "Total", value: attendance.totalAttendance ?? 0 },
        { label: "Present", value: attendance.present ?? 0 },
        { label: "Absent", value: attendance.absent ?? 0 },
      ],
      viewAllPath: "/admin/attendance",
    },
    questions: {
      title: "Questions",
      icon: <FaQuestionCircle />,
      color: "bg-[#f4b400]",
      total: summary.totalQuestions,
      stats: [
        { label: "Total questions", value: questions.totalQuestions ?? 0 },
        { label: "Student answers", value: questions.totalStudentAnswers ?? 0 },
      ],
      viewAllPath: "/admin/questions",
    },
    studentAnswers: {
      title: "Student Answers",
      icon: <FaFileAlt />,
      color: "bg-[#8b5cf6]",
      total: summary.totalStudentAnswers,
      stats: [
        { label: "Total", value: summary.totalStudentAnswers ?? 0 },
      ],
      viewAllPath: "/admin/student-answers",
    },
    submissions: {
      title: "Submissions",
      icon: <FaCloudUploadAlt />,
      color: "bg-[#0891b2]",
      total: summary.totalSubmissions,
      stats: [
        { label: "Total", value: submissions.totalSubmissions ?? 0 },
        { label: "Pending", value: submissions.pendingSubmissions ?? 0 },
        { label: "Checked", value: submissions.checkedSubmissions ?? 0 },
      ],
      viewAllPath: "/admin/submissions",
    },
    grades: {
      title: "Grades",
      icon: <FaAward />,
      color: "bg-[#16a34a]",
      total: summary.totalGrades,
      stats: [{ label: "Total", value: summary.totalGrades ?? 0 }],
      viewAllPath: "/admin/grades",
    },
    leaveRequests: {
      title: "Leave Requests",
      icon: <FaUserClock />,
      color: "bg-[#7c3aed]",
      total: summary.totalLeaveRequests,
      stats: [
        { label: "Total", value: leave.totalLeaveRequests ?? 0 },
        { label: "Approved", value: leave.approved ?? 0 },
        { label: "Rejected", value: leave.rejected ?? 0 },
        { label: "Pending", value: leave.pending ?? 0 },
      ],
      viewAllPath: "/admin/leave-requests",
    },
    pendingLeaves: {
      title: "Pending Leaves",
      icon: <FaClock />,
      color: "bg-[#dc2626]",
      total: summary.pendingLeaveRequests,
      stats: [
        { label: "Pending", value: leave.pending ?? 0 },
        { label: "Total requests", value: leave.totalLeaveRequests ?? 0 },
      ],
      viewAllPath: "/admin/leave-requests",
    },
  };

  // =========================================================
  // SUMMARY CARD
  // =========================================================
  // CHANGED: now takes a "modalKey" instead of "path".
  // Clicking the card opens the popup instead of navigating.

  const SummaryCard = ({
    title,
    value,
    icon,
    bgColor,
    modalKey,
  }) => {
    return (
      <div
        onClick={() => modalKey && openModal(modalKey)}
        className={`
          relative
          overflow-hidden
          min-h-[165px]
          rounded-[22px]
          px-7
          py-6
          text-white
          shadow-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          ${modalKey ? "cursor-pointer" : ""}
          ${bgColor}
        `}
      >
        {/* Decorative Circle */}
        <div
          className="
            absolute
            -right-8
            -bottom-10
            w-36
            h-36
            rounded-full
            bg-white/10
          "
        />

        {/* Small Circle */}
        <div
          className="
            absolute
            right-8
            bottom-8
            w-8
            h-8
            rounded-full
            bg-white/5
          "
        />

        {/* Icon */}
        <div
          className="
            absolute
            right-6
            top-6
            text-white/25
            text-[38px]
          "
        >
          {icon}
        </div>

        <div className="relative z-10">
          <p className="text-[16px] font-semibold">
            {title}
          </p>

          <h2 className="text-[42px] leading-none font-bold mt-7">
            {value ?? 0}
          </h2>
        </div>
      </div>
    );
  };

  // =========================================================
  // SUMMARY MODAL  (NEW)
  // =========================================================
  // Generic popup used by every card. Renders either a list
  // (when config.items exists) or a stats grid (when config.stats
  // exists), styled like the "My Students" screenshot.

  const SummaryModal = () => {
    if (!activeModal) return null;

    const config = modalConfig[activeModal];
    if (!config) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`${config.color} px-6 py-5 flex items-center justify-between shrink-0`}>
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                {config.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight">
                  {config.title}
                </h2>
                <p className="text-xs text-white/80">
                  Total: {config.total ?? 0}
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white shrink-0"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between text-sm text-slate-500 pb-3 border-b border-slate-100 mb-3">
              <span>Total {config.title}</span>
              <span className="font-bold text-slate-800">
                {config.total ?? 0}
              </span>
            </div>

            {/* STATS-ONLY CARDS (attendance, leave, submissions, etc.) */}
            {config.stats && (
              <div className="grid grid-cols-2 gap-3">
                {config.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
                  >
                    <p className="text-[11px] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* LIST CARDS (students, teachers, courses, etc.) */}
            {config.items && (
              <>
                <h3 className="font-bold text-slate-800 mb-2">
                  All {config.title}
                </h3>

                <div className="space-y-2">
                  {config.items.map((item, i) => {
                    const row = config.renderItem(item);
                    return (
                      <div
                        key={i}
                        className="bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 text-sm truncate">
                            {row.left}
                          </p>
                          {row.sub && (
                            <p className="text-xs text-slate-500 truncate">
                              {row.sub}
                            </p>
                          )}
                        </div>

                        {(row.rightTop || row.rightBottom) && (
                          <div className="text-right shrink-0">
                            {row.rightTop && (
                              <p className="text-sm font-bold text-blue-600">
                                {row.rightTop}
                              </p>
                            )}
                            {row.rightBottom && (
                              <p className="text-xs text-slate-400">
                                {row.rightBottom}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {config.items.length === 0 && (
                    <p className="py-8 text-sm text-slate-400 text-center">
                      No {config.title.toLowerCase()} found
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between shrink-0">
            <button
              onClick={() => {
                closeModal();
                viewPage(config.viewAllPath);
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              View full page
            </button>

            <button
              onClick={closeModal}
              className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // SECTION CARD
  // =========================================================

  const SectionCard = ({
    title,
    icon,
    children,
    bgColor,
  }) => {
    return (
      <section
        className={`
          rounded-[22px]
          border
          border-slate-200
          p-4
          ${bgColor}
        `}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center">
            {icon}
          </div>

          <h2 className="text-base font-bold text-slate-800">
            {title}
          </h2>
        </div>

        {children}
      </section>
    );
  };

  // =========================================================
  // LIST CARD
  // =========================================================

  const ListCard = ({
    title,
    icon,
    onViewAll,
    onAdd,
    children,
  }) => {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              {icon}
            </div>

            <h3 className="font-bold text-sm text-slate-800">
              {title}
            </h3>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View all
              <FaArrowRight className="text-[9px]" />
            </button>
          )}
        </div>

        <div className="px-4">
          {children}
        </div>

        {onAdd && (
          <button
            onClick={onAdd}
            className="
              w-full
              border-t
              border-slate-100
              px-4
              py-2.5
              text-left
              text-[11px]
              font-semibold
              text-blue-600
              hover:bg-blue-50
              flex
              items-center
              gap-1
            "
          >
            <FaPlus className="text-[9px]" />
            Add new
          </button>
        )}
      </div>
    );
  };

  // =========================================================
  // LIST ROW
  // =========================================================

  const ListRow = ({ children, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`
          py-3
          border-b
          border-slate-100
          last:border-b-0
          flex
          items-center
          justify-between
          gap-3
          ${onClick ? "cursor-pointer hover:bg-slate-50" : ""}
          transition
        `}
      >
        {children}
      </div>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f8fafc] p-3 md:p-5">

        {/* Popup / modal for summary cards (NEW) */}
        <SummaryModal />

        {/* =====================================================
            HEADER
        ===================================================== */}
{/* 
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-slate-700">
              {dashboard.adminName || "Admin"}
            </span>
            ! Here's what's happening in your school today.
          </p>
        </div> */}

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <SummaryCard
            title="Students"
            value={summary.totalStudents}
            icon={<FaUserGraduate />}
            bgColor="bg-[#2161f5]"
            modalKey="students"
          />

          <SummaryCard
            title="Teachers"
            value={summary.totalTeachers}
            icon={<FaChalkboardTeacher />}
            bgColor="bg-[#00a83b]"
            modalKey="teachers"
          />

          <SummaryCard
            title="Courses"
            value={summary.totalCourses}
            icon={<FaBook />}
            bgColor="bg-[#9817f5]"
            modalKey="courses"
          />

          <SummaryCard
            title="Batches"
            value={summary.totalBatches}
            icon={<FaLayerGroup />}
            bgColor="bg-[#f97316]"
            modalKey="batches"
          />

          <SummaryCard
            title="Attendance"
            value={`${attendance.attendancePercentage ?? 0}%`}
            icon={<FaCalendarCheck />}
            bgColor="bg-[#ff6a00]"
            modalKey="attendance"
          />

          <SummaryCard
            title="Assignments"
            value={summary.totalAssignments}
            icon={<FaTasks />}
            bgColor="bg-[#e90073]"
            modalKey="assignments"
          />

          <SummaryCard
            title="Exams"
            value={summary.totalExams}
            icon={<FaGraduationCap />}
            bgColor="bg-[#4d3df5]"
            modalKey="exams"
          />

          <SummaryCard
            title="Results"
            value={summary.totalResults}
            icon={<FaChartBar />}
            bgColor="bg-[#0798b7]"
            modalKey="results"
          />

          <SummaryCard
            title="Questions"
            value={summary.totalQuestions}
            icon={<FaQuestionCircle />}
            bgColor="bg-[#f4b400]"
            modalKey="questions"
          />

          <SummaryCard
            title="Student Answers"
            value={summary.totalStudentAnswers}
            icon={<FaFileAlt />}
            bgColor="bg-[#8b5cf6]"
            modalKey="studentAnswers"
          />

          <SummaryCard
            title="Submissions"
            value={summary.totalSubmissions}
            icon={<FaCloudUploadAlt />}
            bgColor="bg-[#0891b2]"
            modalKey="submissions"
          />

          <SummaryCard
            title="Grades"
            value={summary.totalGrades}
            icon={<FaAward />}
            bgColor="bg-[#16a34a]"
            modalKey="grades"
          />

          <SummaryCard
            title="Notices"
            value={summary.totalNotices}
            icon={<FaBullhorn />}
            bgColor="bg-[#ea580c]"
            modalKey="notices"
          />

          <SummaryCard
            title="Holidays"
            value={summary.totalHolidays}
            icon={<FaUmbrellaBeach />}
            bgColor="bg-[#db2777]"
            modalKey="holidays"
          />

          <SummaryCard
            title="Leave Requests"
            value={summary.totalLeaveRequests}
            icon={<FaUserClock />}
            bgColor="bg-[#7c3aed]"
            modalKey="leaveRequests"
          />

          <SummaryCard
            title="Pending Leaves"
            value={summary.pendingLeaveRequests}
            icon={<FaClock />}
            bgColor="bg-[#dc2626]"
            modalKey="pendingLeaves"
          />

        </div>

        {/* =====================================================
            MANAGEMENT OVERVIEW
        ===================================================== */}

        <div className="mt-6">

          <SectionCard
            title="Management overview"
            icon={
              <FaClipboardList className="text-green-600" />
            }
            bgColor="bg-gradient-to-r from-emerald-50/70 to-green-50/50"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

              {/* Attendance */}

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

                <div className="flex justify-between items-start">

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Attendance
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {attendance.attendancePercentage ?? 0}%
                    </h2>

                    <p className="text-[11px] text-slate-500">
                      Overall attendance
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <FaCalendarCheck className="text-green-600" />
                  </div>

                </div>

                <div className="grid grid-cols-3 mt-3 pt-3 border-t border-slate-100">

                  <div>
                    <p className="text-[10px] text-slate-500">
                      Total
                    </p>

                    <p className="font-bold text-sm">
                      {attendance.totalAttendance ?? 0}
                    </p>
                  </div>

                  <div className="border-l pl-3">
                    <p className="text-[10px] text-slate-500">
                      Present
                    </p>

                    <p className="font-bold text-sm text-green-600">
                      {attendance.present ?? 0}
                    </p>
                  </div>

                  <div className="border-l pl-3">
                    <p className="text-[10px] text-slate-500">
                      Absent
                    </p>

                    <p className="font-bold text-sm text-red-600">
                      {attendance.absent ?? 0}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => openModal("attendance")}
                  className="mt-3 text-xs font-semibold text-green-600 flex items-center gap-2"
                >
                  <FaEye />
                  View details
                  <FaArrowRight />
                </button>

              </div>

              {/* Leave */}

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Leave requests
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {leave.pending ?? 0}
                    </h2>

                    <p className="text-[11px] text-slate-500">
                      Pending requests
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                    <FaUserClock className="text-orange-600" />
                  </div>

                </div>

                <div className="grid grid-cols-3 mt-3 pt-3 border-t border-slate-100">

                  <div>
                    <p className="text-[10px] text-slate-500">
                      Total
                    </p>

                    <p className="font-bold text-sm">
                      {leave.totalLeaveRequests ?? 0}
                    </p>
                  </div>

                  <div className="border-l pl-3">
                    <p className="text-[10px] text-slate-500">
                      Approved
                    </p>

                    <p className="font-bold text-sm text-green-600">
                      {leave.approved ?? 0}
                    </p>
                  </div>

                  <div className="border-l pl-3">
                    <p className="text-[10px] text-slate-500">
                      Rejected
                    </p>

                    <p className="font-bold text-sm text-red-600">
                      {leave.rejected ?? 0}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => openModal("leaveRequests")}
                  className="mt-3 text-xs font-semibold text-orange-600 flex items-center gap-2"
                >
                  <FaEye />
                  View details
                  <FaArrowRight />
                </button>

              </div>

              {/* Submissions */}

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Submissions
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {submissions.totalSubmissions ?? 0}
                    </h2>

                    <p className="text-[11px] text-slate-500">
                      Total submissions
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FaCloudUploadAlt className="text-blue-600" />
                  </div>

                </div>

                <div className="grid grid-cols-2 mt-3 pt-3 border-t border-slate-100">

                  <div>
                    <p className="text-[10px] text-slate-500">
                      Pending
                    </p>

                    <p className="font-bold text-sm text-orange-600">
                      {submissions.pendingSubmissions ?? 0}
                    </p>
                  </div>

                  <div className="border-l pl-4">
                    <p className="text-[10px] text-slate-500">
                      Checked
                    </p>

                    <p className="font-bold text-sm text-green-600">
                      {submissions.checkedSubmissions ?? 0}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => openModal("submissions")}
                  className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-2"
                >
                  <FaEye />
                  View details
                  <FaArrowRight />
                </button>

              </div>

              {/* Questions */}

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Questions
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {questions.totalQuestions ?? 0}
                    </h2>

                    <p className="text-[11px] text-slate-500">
                      Total questions
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                    <FaQuestionCircle className="text-pink-600" />
                  </div>

                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">

                  <p className="text-[10px] text-slate-500">
                    Student answers
                  </p>

                  <p className="font-bold text-sm">
                    {questions.totalStudentAnswers ?? 0}
                  </p>

                </div>

                <button
                  onClick={() => openModal("questions")}
                  className="mt-3 text-xs font-semibold text-pink-600 flex items-center gap-2"
                >
                  <FaEye />
                  View details
                  <FaArrowRight />
                </button>

              </div>

            </div>

          </SectionCard>

        </div>

        {/* =====================================================
            ACADEMIC MANAGEMENT
        ===================================================== */}

        <div className="mt-6">

          <SectionCard
            title="Academic management"
            icon={
              <FaBook className="text-purple-600" />
            }
            bgColor="bg-gradient-to-r from-purple-50/60 to-violet-50/40"
          >

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">

              {/* =================================================
                  COURSES
              ================================================= */}

              <ListCard
                title="Recent Courses"
                icon={
                  <FaBook className="text-purple-600" />
                }
                onViewAll={() => openModal("courses")}
                onAdd={() =>
                  viewPage("/admin/courses/add")
                }
              >

                {recentCourses.map((course) => (
                  <ListRow
                    key={course.courseId}
                    onClick={() =>
                      viewPage(
                        `/admin/courses/details/${course.courseId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
                        <FaBook className="text-purple-600 text-xs" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {safeValue(course.courseName)}
                        </p>

                        <p className="text-[10px] text-slate-500 line-clamp-2">
                          {safeValue(
                            course.description,
                            "No description"
                          )}
                        </p>

                      </div>

                    </div>

                  </ListRow>
                ))}

                {recentCourses.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No courses found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  BATCHES
              ================================================= */}

              <ListCard
                title="Recent Batches"
                icon={
                  <FaLayerGroup className="text-purple-600" />
                }
                onViewAll={() => openModal("batches")}
                onAdd={() =>
                  viewPage("/admin/batches/add")
                }
              >

                {recentBatches.map((batch) => (
                  <ListRow
                    key={batch.batchId}
                    onClick={() =>
                      viewPage(
                        `/admin/batches/details/${batch.batchId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
                        <FaLayerGroup className="text-purple-600 text-xs" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {safeValue(batch.batchName)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          {safeValue(batch.courseName)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          Section {safeValue(batch.section)}
                          {" | "}
                          {safeValue(batch.batchYear)}
                        </p>

                        <p className="text-[10px] text-slate-400 truncate">
                          {safeValue(batch.batchTiming)}
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 text-[9px] font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      {batch.totalStudents ?? 0} Students
                    </span>

                  </ListRow>
                ))}

                {recentBatches.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No batches found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  ASSIGNMENTS
              ================================================= */}

              <ListCard
                title="Recent Assignments"
                icon={
                  <FaTasks className="text-orange-600" />
                }
                onViewAll={() => openModal("assignments")}
                onAdd={() =>
                  viewPage("/admin/assignments/add")
                }
              >

                {recentAssignments.map((assignment) => (
                  <ListRow
                    key={assignment.assignmentId}
                    onClick={() =>
                      viewPage(
                        `/admin/assignments/details/${assignment.assignmentId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <div className="w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
                        <FaFileAlt className="text-orange-600 text-xs" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {safeValue(assignment.title)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          {safeValue(assignment.batchName)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          Teacher:{" "}
                          {safeValue(
                            assignment.teacherName
                          )}
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 text-[9px] font-semibold bg-rose-50 text-rose-600 px-2 py-1 rounded-md">
                      {formatDate(assignment.dueDate)}
                    </span>

                  </ListRow>
                ))}

                {recentAssignments.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No assignments found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  UPCOMING EXAMS
              ================================================= */}

              <ListCard
                title="Upcoming Exams"
                icon={
                  <FaGraduationCap className="text-rose-600" />
                }
                onViewAll={() => openModal("exams")}
                onAdd={() =>
                  viewPage("/admin/exams/add")
                }
              >

                {upcomingExams.map((exam) => (
                  <ListRow
                    key={exam.examId}
                    onClick={() =>
                      viewPage(
                        `/admin/exams/details/${exam.examId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <div className="w-8 h-8 rounded-md bg-rose-50 flex items-center justify-center shrink-0">
                        <FaCalendarAlt className="text-rose-600 text-xs" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {safeValue(exam.examName)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          {safeValue(exam.courseName)}
                          {" - "}
                          {safeValue(exam.batchName)}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          Teacher:{" "}
                          {safeValue(
                            exam.teacherName,
                            "Not assigned"
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {safeValue(exam.totalMarks, 0)} Marks
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 text-[9px] font-semibold bg-rose-50 text-rose-600 px-2 py-1 rounded-md">
                      {formatDate(exam.examDate)}
                    </span>

                  </ListRow>
                ))}

                {upcomingExams.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No upcoming exams
                  </p>
                )}

              </ListCard>

            </div>

          </SectionCard>

        </div>

        {/* =====================================================
            PEOPLE MANAGEMENT
        ===================================================== */}

        <div className="mt-6">

          <SectionCard
            title="People management"
            icon={
              <FaUsers className="text-blue-600" />
            }
            bgColor="bg-gradient-to-r from-blue-50/60 to-cyan-50/40"
          >

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

              {/* =================================================
                  STUDENTS
              ================================================= */}

              <ListCard
                title="Recent Students"
                icon={
                  <FaUserGraduate className="text-blue-600" />
                }
                onViewAll={() => openModal("students")}
                onAdd={() =>
                  viewPage("/admin/students/add")
                }
              >

                {recentStudents.map((student) => (
                  <ListRow
                    key={student.studentId}
                    onClick={() =>
                      viewPage(
                        `/admin/students/details/${student.studentId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <FaUserGraduate className="text-blue-600 text-sm" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-bold text-slate-800 truncate">
                          {safeValue(
                            student.studentName
                          )}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          Roll:{" "}
                          {safeValue(
                            student.rollNumber
                          )}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          {safeValue(
                            student.courseName
                          )}
                          {" | "}
                          {safeValue(
                            student.batchName
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400 truncate">
                          Semester:{" "}
                          {safeValue(student.semester)}
                          {" | "}
                          Mobile:{" "}
                          {safeValue(
                            student.mobileNumber
                          )}
                        </p>

                      </div>

                    </div>

                  </ListRow>
                ))}

                {recentStudents.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No students found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  TEACHERS
              ================================================= */}

              <ListCard
                title="Recent Teachers"
                icon={
                  <FaChalkboardTeacher className="text-blue-600" />
                }
                onViewAll={() => openModal("teachers")}
                onAdd={() =>
                  viewPage("/admin/teachers/add")
                }
              >

                {recentTeachers.map((teacher) => (
                  <ListRow
                    key={teacher.teacherId}
                    onClick={() =>
                      viewPage(
                        `/admin/teachers/details/${teacher.teacherId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <FaUserTie className="text-blue-600 text-sm" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-bold text-slate-800 truncate">
                          {safeValue(
                            teacher.teacherName
                          )}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          {safeValue(
                            teacher.subject
                          )}
                          {" | "}
                          {safeValue(
                            teacher.experience
                          )} yrs experience
                        </p>

                        <p className="text-[10px] text-slate-500 truncate">
                          Qualification:{" "}
                          {safeValue(
                            teacher.qualification
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400 truncate">
                          {safeValue(teacher.email)}
                          {" | "}
                          {safeValue(
                            teacher.mobileNumber
                          )}
                        </p>

                      </div>

                    </div>

                  </ListRow>
                ))}

                {recentTeachers.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No teachers found
                  </p>
                )}

              </ListCard>

            </div>

          </SectionCard>

        </div>

        {/* =====================================================
            SCHOOL ACTIVITY
        ===================================================== */}

        <div className="mt-6">

          <SectionCard
            title="School activity"
            icon={
              <FaBullhorn className="text-orange-600" />
            }
            bgColor="bg-gradient-to-r from-orange-50/60 to-amber-50/50"
          >

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

              {/* =================================================
                  NOTICES
              ================================================= */}

              <ListCard
                title="Recent Notices"
                icon={
                  <FaBell className="text-orange-600" />
                }
                onViewAll={() => openModal("notices")}
              >

                {recentNotices.map((notice) => (
                  <ListRow
                    key={notice.noticeId}
                    onClick={() =>
                      viewPage(
                        `/admin/notices/details/${notice.noticeId}`
                      )
                    }
                  >

                    <div className="min-w-0">

                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {safeValue(notice.title)}
                      </p>

                      <p className="text-[10px] text-slate-500 line-clamp-2">
                        {safeValue(
                          notice.message,
                          "No message"
                        )}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1">

                        <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          {safeValue(
                            notice.targetRole
                          )}
                        </span>

                        <span className="text-[9px] text-slate-400">
                          {formatDate(notice.date)}
                        </span>

                      </div>

                      {(notice.fromDate ||
                        notice.toDate) && (
                        <p className="text-[9px] text-slate-400 mt-1">
                          {formatDate(
                            notice.fromDate
                          )}
                          {" - "}
                          {formatDate(
                            notice.toDate
                          )}
                        </p>
                      )}

                    </div>

                  </ListRow>
                ))}

                {recentNotices.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No notices found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  HOLIDAYS
              ================================================= */}

              <ListCard
                title="Recent Holidays"
                icon={
                  <FaUmbrellaBeach className="text-orange-600" />
                }
                onViewAll={() => openModal("holidays")}
              >

                {recentHolidays.map((holiday) => (
                  <ListRow
                    key={holiday.holidayId}
                    onClick={() =>
                      viewPage(
                        `/admin/holidays/details/${holiday.holidayId}`
                      )
                    }
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <div className="w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
                        <FaUmbrellaBeach className="text-orange-600 text-xs" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {safeValue(
                            holiday.holidayName
                          )}
                        </p>

                        <p className="text-[10px] text-slate-500">
                          {formatDate(
                            holiday.date
                          )}
                        </p>

                      </div>

                    </div>

                  </ListRow>
                ))}

                {recentHolidays.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No holidays found
                  </p>
                )}

              </ListCard>

              {/* =================================================
                  RESULTS
              ================================================= */}

              <ListCard
                title="Recent Results"
                icon={
                  <FaGraduationCap className="text-blue-600" />
                }
                onViewAll={() => openModal("results")}
              >

                {recentResults.map((result) => (
                  <ListRow
                    key={result.resultId}
                    onClick={() =>
                      viewPage(
                        `/admin/results/details/${result.resultId}`
                      )
                    }
                  >

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {safeValue(
                          result.studentName
                        )}
                      </p>

                      <p className="text-[10px] text-slate-500 truncate">
                        {safeValue(
                          result.examName
                        )}
                      </p>

                    </div>

                    <div className="flex gap-1 shrink-0">

                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        {safeValue(
                          result.marksObtained,
                          0
                        )}
                      </span>

                      <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">
                        {safeValue(
                          result.grade
                        )}
                      </span>

                    </div>

                  </ListRow>
                ))}

                {recentResults.length === 0 && (
                  <p className="py-5 text-xs text-slate-400 text-center">
                    No results found
                  </p>
                )}

              </ListCard>

            </div>

          </SectionCard>

        </div>

        {/* =====================================================
            TODAY'S TIMETABLE
        ===================================================== */}

        <div className="mt-6">

          <SectionCard
            title="Today's timetable"
            icon={
              <FaClock className="text-indigo-600" />
            }
            bgColor="bg-gradient-to-r from-indigo-50/60 to-blue-50/50"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

              {todayTimetable.length > 0 ? (
                todayTimetable.map((item, index) => (

                  <div
                    key={index}
                    className="
                      bg-white
                      rounded-xl
                      border
                      border-slate-200
                      p-4
                      shadow-sm
                      hover:shadow-md
                      transition
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div className="min-w-0">

                        <p className="text-xs font-bold text-slate-800 truncate">
                          {safeValue(
                            item.courseName
                          )}
                        </p>

                        <p className="text-[10px] text-slate-500 mt-1 truncate">
                          {safeValue(
                            item.batchName
                          )}
                        </p>

                      </div>

                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                        <FaClock className="text-indigo-600 text-sm" />
                      </div>

                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">

                      <p className="text-[10px] text-slate-500">
                        Timing
                      </p>

                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        {safeValue(
                          item.startTime,
                          "--"
                        )}
                        {" - "}
                        {safeValue(
                          item.endTime,
                          "--"
                        )}
                      </p>

                    </div>

                    <div className="mt-2">

                      <p className="text-[10px] text-slate-500">
                        Teacher
                      </p>

                      <p className="text-xs font-semibold text-slate-800 mt-1 truncate">
                        {safeValue(
                          item.teacherName,
                          "Not assigned"
                        )}
                      </p>

                    </div>

                    <div className="mt-2">

                      <p className="text-[10px] text-slate-500">
                        Day
                      </p>

                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        {safeValue(item.day)}
                      </p>

                    </div>

                  </div>

                ))
              ) : (

                <div className="col-span-full bg-white rounded-xl border border-slate-200 p-6 text-center">

                  <FaClock className="mx-auto text-slate-300 text-2xl mb-2" />

                  <p className="text-sm text-slate-400">
                    No timetable available for today.
                  </p>

                </div>

              )}

            </div>

          </SectionCard>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

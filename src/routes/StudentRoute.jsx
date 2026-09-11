import { Routes, Route } from "react-router-dom";

// Dashboard
import StudentDashboard from "../pages/students/Studentashboard";

// Courses
import CourseList from "../pages/courses/CourseList";

// Assignments
import AssignmentList from "../pages/assignments/AssignmentList";
import AssignmentDetails from "../pages/assignments/AssignmentDetails";

// Results
import ResultList from "../pages/results/ResultList";
import ResultDetails from "../pages/results/ResultDetails";

// Attendance
import AttendanceList from "../pages/attendance/AttendanceList";
import AttendanceDetails from "../pages/attendance/AttendanceDetails";

// Timetable
import TimetableList from "../pages/timetable/TimetableList";
import TimetableDetails from "../pages/timetable/TimetableDetails";

// Holidays
import HolidayList from "../pages/holidays/HolidayList";
import HolidayDetails from "../pages/holidays/HolidayDetails";

// Notice Board
import NoticeList from "../pages/noticeboard/NoticeList";
import NoticeDetails from "../pages/noticeboard/NoticeDetails";

// Leave Requests
import LeaveRequestList from "../pages/leaverequests/LeaveRequestList";
import AddLeaveRequest from "../pages/leaverequests/AddLeaveRequest";
import LeaveRequestDetails from "../pages/leaverequests/LeaveRequestDetails";
import EditLeaveRequest from "../pages/leaverequests/EditLeaveRequest";

// Submissions
import SubmissionList from "../pages/submissions/SubmissionList";
import SubmissionDetails from "../pages/submissions/SubmissionDetails";
import AddSubmission from "../pages/submissions/AddSubmission";
import EditSubmission from "../pages/submissions/EditSubmission";

// Profile
import StudentProfile from "../pages/students/StudentProfile";
import EditStudentProfile from "../pages/students/EditStudentProfile";


function StudentRoutes() {

  return (

    <Routes>

      {/* ========================= */}
      {/* DASHBOARD */}
      {/* ========================= */}

      <Route
        path="dashboard"
        element={<StudentDashboard />}
      />


      {/* ========================= */}
      {/* COURSES */}
      {/* ========================= */}

      <Route
        path="courses"
        element={<CourseList />}
      />


      {/* ========================= */}
      {/* ASSIGNMENTS */}
      {/* ========================= */}

      <Route
        path="assignment"
        element={<AssignmentList />}
      />

      <Route
        path="assignment/details/:id"
        element={<AssignmentDetails />}
      />


      {/* ========================= */}
      {/* RESULTS */}
      {/* ========================= */}

      <Route
        path="results"
        element={<ResultList />}
      />

      <Route
        path="results/details/:id"
        element={<ResultDetails />}
      />


      {/* ========================= */}
      {/* ATTENDANCE */}
      {/* ========================= */}

      <Route
        path="attendance"
        element={<AttendanceList />}
      />

      <Route
        path="attendance/details/:id"
        element={<AttendanceDetails />}
      />


      {/* ========================= */}
      {/* TIMETABLE */}
      {/* ========================= */}

      <Route
        path="timetable"
        element={<TimetableList />}
      />

      <Route
        path="timetable/details/:id"
        element={<TimetableDetails />}
      />


      {/* ========================= */}
      {/* HOLIDAYS */}
      {/* ========================= */}

      <Route
        path="holidays"
        element={<HolidayList />}
      />

      <Route
        path="holidays/details/:id"
        element={<HolidayDetails />}
      />


      {/* ========================= */}
      {/* NOTICE BOARD */}
      {/* ========================= */}

      <Route
        path="notice-board"
        element={<NoticeList />}
      />

      <Route
        path="notice-board/details/:id"
        element={<NoticeDetails />}
      />


      {/* ========================= */}
      {/* LEAVE REQUESTS */}
      {/* ========================= */}

      <Route
        path="leave-requests"
        element={<LeaveRequestList />}
      />

      <Route
        path="leave-requests/add"
        element={<AddLeaveRequest />}
      />

      <Route
        path="leave-requests/details/:id"
        element={<LeaveRequestDetails />}
      />

      <Route
        path="leave-requests/edit/:id"
        element={<EditLeaveRequest />}
      />


      {/* ========================= */}
      {/* SUBMISSIONS */}
      {/* ========================= */}

      <Route
        path="submissions"
        element={<SubmissionList />}
      />

      <Route
        path="submissions/add"
        element={<AddSubmission />}
      />

      <Route
        path="submissions/details/:id"
        element={<SubmissionDetails />}
      />

      <Route
        path="submissions/edit/:id"
        element={<EditSubmission />}
      />


      {/* ========================= */}
      {/* STUDENT PROFILE */}
      {/* ========================= */}

      <Route
        path="profile"
        element={<StudentProfile />}
      />
      <Route path="profile/edit" element={<EditStudentProfile />} />

    </Routes>

  );

}

export default StudentRoutes;
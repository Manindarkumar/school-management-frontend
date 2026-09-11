// import {
//   FaTachometerAlt,
//   FaBook,
//   FaUserGraduate,
//   FaClipboardCheck,
//   FaChalkboardTeacher,
//   FaUserCircle,
//   FaUserPlus,
//   FaGraduationCap,
//   FaChartBar,
//   FaCalendarAlt,
//   FaBullhorn,
//   FaTasks,
//   FaFileUpload,
//   FaAward,
//   FaLayerGroup,
//   FaQuestionCircle,
//   FaFileSignature,
//   FaUmbrellaBeach,
//   FaClipboardList,
//   FaUsers,
//   FaSchool
// } from "react-icons/fa";

// export const sidebarMenus = {

//   // ================= ADMIN =================
//   ADMIN: [

//     {
//       name: "Dashboard",
//       path: "/admin-dashboard",
//       icon: <FaTachometerAlt />
//     },

//     {
//       name: "Students",
//       path: "/students",
//       icon: <FaUserGraduate />
//     },

//     {
//       name: "Teachers",
//       path: "/teachers",
//       icon: <FaChalkboardTeacher />
//     },

//     {
//       name: "Courses",
//       path: "/courses",
//       icon: <FaBook />
//     },

//     {
//       name: "Attendance",
//       path: "/attendance",
//       icon: <FaClipboardCheck />
//     },

//     {
//       name: "Exams",
//       path: "/exam",
//       icon: <FaGraduationCap />
//     },

//     {
//       name: "Results",
//       path: "/results",
//       icon: <FaChartBar />
//     },

//     {
//       name: "Timetable",
//       path: "/timetable",
//       icon: <FaCalendarAlt />
//     },

//     {
//       name: "Notice Board",
//       path: "/notice-board",
//       icon: <FaBullhorn />
//     },

//     {
//       name: "Assignments",
//       path: "/assignment",
//       icon: <FaTasks />
//     },

//     {
//       name: "Submissions",
//       path: "/submissions",
//       icon: <FaFileUpload />
//     },

//     {
//       name: "Grades",
//       path: "/grade",
//       icon: <FaAward />
//     },

//     {
//       name: "Batches",
//       path: "/batch",
//       icon: <FaLayerGroup />
//     },

//     {
//       name: "Teacher Courses",
//       path: "/teacher-courses",
//       icon: <FaClipboardList />
//     },

//     {
//       name: "Questions",
//       path: "/questions",
//       icon: <FaFileSignature />
//     },

//     {
//       name: "Student Answers",
//       path: "/student-answers",
//       icon: <FaQuestionCircle />
//     },

//     {
//       name: "Leave Requests",
//       path: "/leave-requests",
//       icon: <FaCalendarAlt />
//     },

//     {
//       name: "Holidays",
//       path: "/holidays",
//       icon: <FaUmbrellaBeach />
//     },

//     {
//       name: "Enrollments",
//       path: "/enroll",
//       icon: <FaUserPlus />
//     }

//   ],

//   // ================= TEACHER =================
//   TEACHER: [

//     {
//       name: "Dashboard",
//       path: "/teacher-dashboard",
//       icon: <FaTachometerAlt />
//     },

//     {
//       name: "My Courses",
//       path: "/courses",
//       icon: <FaBook />
//     },

//     {
//       name: "My Students",
//       path: "/students",
//       icon: <FaUsers />
//     },

//     {
//       name: "Attendance",
//       path: "/attendance",
//       icon: <FaClipboardCheck />
//     },

//     {
//       name: "Assignments",
//       path: "/assignment",
//       icon: <FaTasks />
//     },

//     {
//       name: "Questions",
//       path: "/questions",
//       icon: <FaFileSignature />
//     },

//     {
//       name: "Results",
//       path: "/results",
//       icon: <FaChartBar />
//     },

//     {
//       name: "Timetable",
//       path: "/timetable",
//       icon: <FaCalendarAlt />
//     },

//     {
//       name: "Leave Requests",
//       path: "/leave-requests",
//       icon: <FaCalendarAlt />
//     },

//     {
//       name: "Profile",
//       path: "/profile",
//       icon: <FaUserCircle />
//     }

//   ],

//   // ================= STUDENT =================
//   STUDENT: [

//     {
//       name: "Dashboard",
//       path: "/student-dashboard",
//       icon: <FaTachometerAlt />
//     },

//     {
//       name: "My Courses",
//       path: "/courses",
//       icon: <FaBook />
//     },

//     {
//       name: "Assignments",
//       path: "/assignment",
//       icon: <FaTasks />
//     },

//     {
//       name: "Results",
//       path: "/results",
//       icon: <FaChartBar />
//     },

//     {
//       name: "Attendance",
//       path: "/attendance",
//       icon: <FaClipboardCheck />
//     },

//     {
//       name: "Timetable",
//       path: "/timetable",
//       icon: <FaCalendarAlt />
//     },

//     {
//       name: "Holidays",
//       path: "/holidays",
//       icon: <FaUmbrellaBeach />
//     },

//     {
//       name: "Notice Board",
//       path: "/notice-board",
//       icon: <FaBullhorn />
//     },

//     {
//       name: "Leave Requests",
//       path: "/leave-requests",
//       icon: <FaCalendarAlt />
//     },

//     // {
//     //   name: "Profile",
//     //   path: "/student-profile",
//     //   icon: <FaUserCircle />
//     // }

//   ]

// };

import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaClipboardCheck,
  FaChalkboardTeacher,
  FaUserCircle,
  FaUserPlus,
  FaGraduationCap,
  FaChartBar,
  FaCalendarAlt,
  FaBullhorn,
  FaTasks,
  FaFileUpload,
  FaAward,
  FaLayerGroup,
  FaQuestionCircle,
  FaFileSignature,
  FaUmbrellaBeach,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

export const sidebarMenus = {
  ADMIN: [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Students", path: "/admin/students", icon: <FaUserGraduate /> },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: <FaChalkboardTeacher />,
    },
    { name: "Courses", path: "/admin/courses", icon: <FaBook /> },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: <FaClipboardCheck />,
    },
    { name: "Exams", path: "/admin/exams", icon: <FaGraduationCap /> },
    { name: "Results", path: "/admin/results", icon: <FaChartBar /> },
    { name: "Timetable", path: "/admin/timetable", icon: <FaCalendarAlt /> },
    { name: "Notice Board", path: "/admin/notice-board", icon: <FaBullhorn /> },
    { name: "Assignments", path: "/admin/assignment", icon: <FaTasks /> },
    { name: "Submissions", path: "/admin/submissions", icon: <FaFileUpload /> },
    { name: "Grades", path: "/admin/grades", icon: <FaAward /> },
    { name: "Batches", path: "/admin/batch", icon: <FaLayerGroup /> },
    { name: "TeacherCourse", path: "/admin/teacherCourse", icon: <FaLayerGroup /> },
    { name: "Questions", path: "/admin/questions", icon: <FaFileSignature /> },
    {name: "StudentAnswers", path: "/admin/student-answers", icon: <FaQuestionCircle /> },
    {
      name: "LeaveRequests", path: "/admin/leaveRequests", icon: <FaCalendarAlt />,
    },
    { name: "Holidays", path: "/admin/holidays", icon: <FaUmbrellaBeach /> },
    
  ],

  TEACHER: [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
      icon: <FaTachometerAlt />,
    },
    { name: "My Courses", path: "/teacher/courses", icon: <FaBook /> },
    { name: "My Students", path: "/teacher/students", icon: <FaUsers /> },
    {
      name: "Attendance",
      path: "/teacher/attendance",
      icon: <FaClipboardCheck />,
    },
    { name: "Assignments", path: "/teacher/assignment", icon: <FaTasks /> },
    {
      name: "Questions",
      path: "/teacher/questions",
      icon: <FaFileSignature />,
    },
    { name: "Results", path: "/teacher/results", icon: <FaChartBar /> },
    { name: "Timetable", path: "/teacher/timetable", icon: <FaCalendarAlt /> },
    {
      name: "Leave Requests",
      path: "/teacher/leave-requests",
      icon: <FaCalendarAlt />,
    },
     {
      name: "TeacherCourse",
      path: "/teacher/teachers-courses",
      icon: <FaCalendarAlt />,
    },
    // { name: "Profile", path: "/teacher/profile", icon: <FaUserCircle /> },
  ],
  STUDENT: [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <FaTachometerAlt />,
    },
    { name: "My Courses", path: "/student/courses", icon: <FaBook /> },
    { name: "Assignments", path: "/student/assignment", icon: <FaTasks /> },
    { name: "Results", path: "/student/results", icon: <FaChartBar /> },
    {
      name: "Attendance",
      path: "/student/attendance",
      icon: <FaClipboardCheck />,
    },
    { name: "Timetable", path: "/student/timetable", icon: <FaCalendarAlt /> },
    { name: "Holidays", path: "/student/holidays", icon: <FaUmbrellaBeach /> },
    {
      name: "Notice Board",
      path: "/student/notice-board",
      icon: <FaBullhorn />,
    },
    {
      name: "Leave Requests",
      path: "/student/leave-requests",
      icon: <FaCalendarAlt />,
    },
    { name: "Submissions", path: "/admin/submissions", icon: <FaFileUpload /> },

  ],
};

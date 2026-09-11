import {
  FaTachometerAlt,
  FaBook,
  FaTasks,
  FaChartBar,
  FaClipboardCheck,
  FaCalendarAlt,
  FaUmbrellaBeach,
  FaBullhorn,
  FaFileUpload,
  FaCalendarCheck,
  FaUserCircle,
} from "react-icons/fa";

export const studentSidebarMenus = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: <FaTachometerAlt />,
  },

  {
    name: "My Courses",
    path: "/student/courses",
    icon: <FaBook />,
  },

  {
    name: "Assignments",
    path: "/student/assignment",
    icon: <FaTasks />,
  },

  {
    name: "Results",
    path: "/student/results",
    icon: <FaChartBar />,
  },

  {
    name: "Attendance",
    path: "/student/attendance",
    icon: <FaClipboardCheck />,
  },

  {
    name: "Timetable",
    path: "/student/timetable",
    icon: <FaCalendarAlt />,
  },

  {
    name: "Holidays",
    path: "/student/holidays",
    icon: <FaUmbrellaBeach />,
  },

  {
    name: "Notice Board",
    path: "/student/notice-board",
    icon: <FaBullhorn />,
  },

  {
    name: "Leave Requests",
    path: "/student/leave-requests",
    icon: <FaCalendarCheck />,
  },

  {
    name: "Submissions",
    path: "/student/submissions",
    icon: <FaFileUpload />,
  },

  {
    name: "Profile",
    path: "/student/profile",
    icon: <FaUserCircle />,
  },
];
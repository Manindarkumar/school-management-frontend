import { useState } from "react";

import {
  FaTimes,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserShield,
  FaCode,
  FaDatabase,
  FaReact,
  FaJava,
  FaExclamationTriangle,
  FaGithub,
} from "react-icons/fa";

// =====================================================
// SCREENSHOTS
// =====================================================

import adminDashboard1 from "../../assets/screenshots/admin-dashboard-1.png";
import adminDashboard2 from "../../assets/screenshots/admin-dashboard-2.png";
import adminDashboard3 from "../../assets/screenshots/admin-dashboard-7.png";

import teacherDashboard1 from "../../assets/screenshots/teacher-dashboard-1.png";
import teacherProfile1 from "../../assets/screenshots/teacher-profile-1.png";
import teacherProfile2 from "../../assets/screenshots/teacher-profile-2.png";

import studentDashboard1 from "../../assets/screenshots/student-dashboard-1.png";
import studentProfile1 from "../../assets/screenshots/student-profile-1.png";
import studentProfile2 from "../../assets/screenshots/student-profile-2.png";

const screenshotsByRole = {
  Admin: [
    { image: adminDashboard1, caption: "Overview of students, teachers, courses, results and more at a glance" },
    { image: adminDashboard2, caption: "Notices, holidays, leave requests and pending approvals" },
    { image: adminDashboard3, caption: "Clicking any card opens the full list — here, all students" },
  ],
  Teacher: [
    { image: teacherDashboard1, caption: "My students, courses, attendance and assignments in one view" },
    { image: teacherProfile1, caption: "Teacher's own profile with personal and contact details" },
    { image: teacherProfile2, caption: "Uploaded documents — Aadhaar, PAN, resume and signature" },
  ],
  Student: [
    { image: studentDashboard1, caption: "Courses, attendance, assignments and results for the logged-in student" },
    { image: studentProfile1, caption: "Student's own profile — academic and guardian details" },
    { image: studentProfile2, caption: "Uploaded documents, viewable and downloadable anytime" },
  ],
};

// =====================================================
// FEATURES BY ROLE
// =====================================================

const roleFeatures = [
  {
    icon: <FaUserShield />,
    role: "Admin",
    color: "bg-blue-50 text-blue-600",
    points: [
      "Add, edit and manage student and teacher records",
      "Create courses, batches and class timetables",
      "Post notices, manage holidays and approve leave requests",
      "Review results, exams and question banks",
    ],
  },
  {
    icon: <FaChalkboardTeacher />,
    role: "Teacher",
    color: "bg-purple-50 text-purple-600",
    points: [
      "Create and grade assignments and exams",
      "Mark and update student attendance",
      "Upload results and manage their own courses",
      "View and update their own profile and documents",
    ],
  },
  {
    icon: <FaGraduationCap />,
    role: "Student",
    color: "bg-green-50 text-green-600",
    points: [
      "View courses, timetable and assignments",
      "Check attendance, results and grades",
      "See notices and school holidays",
      "View and update their own profile and documents",
    ],
  },
];

const techStack = [
  {
    icon: <FaReact />,
    label: "React + Tailwind CSS",
    desc: "Builds the screens you see and click on — the dashboards, forms and buttons.",
  },
  {
    icon: <FaJava />,
    label: "Spring Boot (Java)",
    desc: "Runs behind the scenes — handles logins, checks permissions, and processes every request.",
  },
  {
    icon: <FaDatabase />,
    label: "MySQL",
    desc: "Stores all the data safely — students, teachers, results, attendance, and more.",
  },
  {
    icon: <FaCode />,
    label: "JWT-based Login",
    desc: "Keeps accounts secure and makes sure each user only sees their own role's data.",
  },
];

function AboutProjectModal({ open, onClose }) {

  const [activeTab, setActiveTab] = useState("Admin");
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!open) return null;

  return (

    <div
      className="
        fixed inset-0 z-[100]
        bg-black/50
        flex items-center justify-center
        p-4
      "
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          shadow-2xl
          relative
        "
      >

        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            w-9 h-9
            flex items-center justify-center
            rounded-full
            bg-gray-100 hover:bg-gray-200
            text-gray-500
            transition
          "
        >
          <FaTimes />
        </button>

        <div className="p-7 md:p-9">

          {/* HEADER */}

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            School Management System (SMS)
          </h1>

          <p className="text-slate-500 mt-2 leading-relaxed">
            SMS is a full-stack web application built to bring the day-to-day
            running of a school onto one platform. Instead of admins, teachers
            and students using separate registers, spreadsheets and paper
            notices, everything — student and teacher records, attendance,
            timetables, exams, results, assignments and notices — lives in
            one place, with each person seeing only what's relevant to their
            role.
          </p>


          {/* WHY THIS PROJECT */}

          <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <h2 className="font-semibold text-slate-800 mb-2">
              What problem does it solve?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Schools often manage student records, attendance, results and
              notices manually across different tools. This project brings
              all of that into a single system with three logins — Admin,
              Teacher, and Student — each with their own dashboard, so every
              user only sees the tools and information meant for them.
            </p>
          </div>


          {/* DEMO NOTICE */}

          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3">
            <FaExclamationTriangle className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-semibold text-amber-800 mb-1">
                A quick note about the login
              </h2>
              <p className="text-sm text-amber-700 leading-relaxed">
                Every screen here is fully built and working — but login
                won't actually go through on this page right now. That's
                because the backend (the Spring Boot server that checks
                your username and password and talks to the database) only
                runs on my own computer for now — it isn't hosted on a live
                server yet, so there's nothing online for this page to
                connect to. Everything shown in this "About" section
                reflects how the app behaves and what it can do when the
                backend is running.
              </p>
            </div>
          </div>


          {/* BACKEND EXPLAINED */}

          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <h2 className="font-semibold text-slate-800 mb-2">
              What's actually happening behind this page
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When you type a username and password and press "Login," this
              page sends that information to a separate program called the
              backend. The backend checks if the details are correct, looks
              up who you are — Admin, Teacher, or Student — and sends back
              only the data and pages that person is allowed to see. That
              backend is built with Spring Boot (a Java framework) and
              stores everything in a MySQL database. Right now that backend
              only runs locally on my machine while I build and test it, so
              this hosted page can display and explain the project, but it
              can't complete a real login yet.
            </p>
          </div>


          {/* ROLE FEATURES */}

          <h2 className="font-semibold text-slate-800 mt-7 mb-3">
            What each role can do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {roleFeatures.map((r) => (

              <div
                key={r.role}
                className="border border-slate-100 rounded-2xl p-4"
              >

                <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center mb-3`}>
                  {r.icon}
                </div>

                <h3 className="font-semibold text-slate-800 mb-2">
                  {r.role}
                </h3>

                <ul className="space-y-1.5">
                  {r.points.map((p, i) => (
                    <li key={i} className="text-xs text-slate-500 leading-relaxed">
                      • {p}
                    </li>
                  ))}
                </ul>

              </div>

            ))}

          </div>


          {/* TECH STACK */}

          <h2 className="font-semibold text-slate-800 mt-7 mb-3">
            Built with
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {techStack.map((t) => (

              <div
                key={t.label}
                className="flex items-start gap-3 border border-slate-100 rounded-xl p-3.5"
              >
                <div className="text-blue-600 text-lg shrink-0 mt-0.5">
                  {t.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {t.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>

            ))}

          </div>


          {/* SCREENSHOTS */}

          <h2 className="font-semibold text-slate-800 mt-7 mb-3">
            A look inside
          </h2>

          {/* ROLE TABS */}

          <div className="flex gap-2 mb-4">
            {Object.keys(screenshotsByRole).map((role) => (
              <button
                key={role}
                onClick={() => setActiveTab(role)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    activeTab === role
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }
                `}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {screenshotsByRole[activeTab].map((shot, i) => (

              <button
                key={i}
                onClick={() => setLightboxImage(shot)}
                className="
                  text-left
                  rounded-2xl border border-slate-100
                  overflow-hidden bg-white
                  hover:border-blue-300 hover:shadow-md
                  transition
                  cursor-zoom-in
                "
              >
                <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={shot.image}
                    alt={`${activeTab} screenshot ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-snug p-2.5">
                  {shot.caption}
                </p>
              </button>

            ))}

          </div>


        </div>

        {/* FOOTER */}

        <div className="
          px-7 md:px-9
          py-4
          border-t
          border-slate-100
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-medium
              text-slate-500
              hover:text-blue-600
              transition
            "
          >
            <FaGithub />
            View source on GitHub
          </a>

          <p className="text-xs text-slate-400 sm:text-right">
            © 2026 School Management System. Built for learning and
            demonstration purposes.
          </p>

        </div>

      </div>

      {/* LIGHTBOX */}

      {lightboxImage && (
        <div
          className="
            fixed inset-0 z-[110]
            bg-black/80
            flex items-center justify-center
            p-4
          "
          onClick={() => setLightboxImage(null)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >

            <button
              onClick={() => setLightboxImage(null)}
              className="
                absolute -top-11 right-0
                w-9 h-9
                flex items-center justify-center
                rounded-full
                bg-white/10 hover:bg-white/20
                text-white
                transition
              "
            >
              <FaTimes />
            </button>

            <img
              src={lightboxImage.image}
              alt={lightboxImage.caption}
              className="w-full rounded-xl shadow-2xl"
            />

            <p className="text-center text-sm text-white/70 mt-3">
              {lightboxImage.caption}
            </p>

          </div>

        </div>
      )}

    </div>

  );
}

export default AboutProjectModal;

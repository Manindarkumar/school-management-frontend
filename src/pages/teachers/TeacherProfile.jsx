import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaVenusMars,
  FaMapMarkerAlt,
  FaIdCard,
  FaCalendar,
  FaGraduationCap,
  FaBriefcase,
  FaAddressCard,
  FaSignature,
  FaFilePdf,
  FaChalkboardTeacher,
  FaEdit,
  FaDownload,
  FaEye,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function TeacherProfile() {

  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const FILE_BASE_URL = "http://localhost:8080/api/files/";

  const getDocumentUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    return `${FILE_BASE_URL}${path}`;
  };

  useEffect(() => {

    const fetchMyProfile = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          console.error("User not found");
          setLoading(false);
          return;
        }

        const teacherId = user.id;

        if (!teacherId) {
          console.error("Teacher ID not found in logged user");
          setLoading(false);
          return;
        }

        const response = await apiService.getMyTeacherProfile(teacherId);

        if (
          response.data &&
          response.data.status === 0 &&
          response.data.data
        ) {
          setTeacher(response.data.data);
        } else {
          console.error("Profile API Error:", response.data?.message);
          setTeacher(null);
        }

      } catch (error) {
        console.error("Failed to fetch teacher profile:", error);
        setTeacher(null);
      } finally {
        setLoading(false);
      }

    };

    fetchMyProfile();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[500px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading profile...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }


  // =====================================================
  // NO DATA
  // =====================================================

  if (!teacher) {
    return (
      <AdminLayout>
        <div className="max-w-3xl mx-auto p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-500 hover:text-gray-800 font-medium"
          >
            ← Back
          </button>

          <div className="bg-white rounded-2xl border border-gray-200 p-14 text-center">
            <FaChalkboardTeacher className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              Profile not found
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Unable to load teacher profile.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }


  // =====================================================
  // DATA
  // =====================================================

  const teacherInfo = teacher?.teacherInfo || {};
  const contactInfo = teacher?.contactInfo || {};
  const professionalInfo = teacher?.professionalInfo || {};
  const documents = teacher?.documents || {};

  const profileImageUrl = getDocumentUrl(documents?.profileImage);

  const documentList = [
    { label: "Aadhaar Card", path: documents?.aadhaarCard, icon: <FaAddressCard /> },
    { label: "PAN Card", path: documents?.panCard, icon: <FaIdCard /> },
    { label: "Address Proof", path: documents?.addressProof, icon: <FaMapMarkerAlt /> },
    { label: "Resume", path: documents?.resume, icon: <FaFilePdf /> },
    { label: "Signature", path: documents?.signature, icon: <FaSignature /> },
  ];


  // =====================================================
  // SMALL REUSABLE PIECES
  // =====================================================

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 py-3">
      <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5 break-words">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {title}
      </h2>
      <div className="divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );


  // =====================================================
  // UI
  // =====================================================

  return (

    <AdminLayout>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-12">

        {/* BACK */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-gray-500 hover:text-gray-800 font-medium transition"
        >
          ← Back
        </button>


        {/* ================================================= */}
        {/* HEADER CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            {/* AVATAR */}

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={teacherInfo.fullName || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserTie className="text-3xl text-gray-300" />
              )}
            </div>


            {/* NAME + META */}

            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {teacherInfo.fullName || "N/A"}
                </h1>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {teacherInfo.status || "Active"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {professionalInfo.subject || "N/A"} Teacher
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm text-gray-500">
                <span>ID: <span className="text-gray-700 font-medium">{teacherInfo.teacherId || "N/A"}</span></span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span>{contactInfo.email || "N/A"}</span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span>{contactInfo.mobileNumber || "N/A"}</span>
              </div>

            </div>


            {/* EDIT BUTTON */}

            <button
              onClick={() => navigate("/teacher/profile/edit")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition shrink-0 self-start sm:self-center"
            >
              <FaEdit className="text-xs" />
              Edit Profile
            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* INFO GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <SectionCard title="Personal Details">
            <InfoRow icon={<FaVenusMars />} label="Gender" value={teacherInfo.gender} />
            <InfoRow icon={<FaCalendar />} label="Date of Birth" value={teacherInfo.dateOfBirth} />
            <InfoRow icon={<FaMapMarkerAlt />} label="Address" value={contactInfo.address} />
          </SectionCard>

          <SectionCard title="Contact Details">
            <InfoRow icon={<FaEnvelope />} label="Email" value={contactInfo.email} />
            <InfoRow icon={<FaPhone />} label="Mobile Number" value={contactInfo.mobileNumber} />
          </SectionCard>

          <SectionCard title="Professional Details">
            <InfoRow icon={<FaGraduationCap />} label="Qualification" value={professionalInfo.qualification} />
            <InfoRow icon={<FaBook />} label="Subject" value={professionalInfo.subject} />
            <InfoRow
              icon={<FaBriefcase />}
              label="Experience"
              value={professionalInfo.experience ? `${professionalInfo.experience} Years` : null}
            />
          </SectionCard>

        </div>


        {/* ================================================= */}
        {/* DOCUMENTS */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Documents
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {documentList.map((doc) => (

              <div
                key={doc.label}
                className="flex items-center gap-3 border border-gray-200 rounded-xl p-3.5"
              >

                <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
                  {doc.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {doc.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {doc.path ? "Uploaded" : "Not uploaded"}
                  </p>
                </div>

                {doc.path && (
                  <div className="flex items-center gap-1 shrink-0">

                    <a
                      href={getDocumentUrl(doc.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaEye className="text-sm" />
                    </a>

                    <a
                      href={`${getDocumentUrl(doc.path)}?download=true`}
                      title="Download"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaDownload className="text-sm" />
                    </a>

                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default TeacherProfile;

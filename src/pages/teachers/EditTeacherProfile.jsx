import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaVenusMars,
  FaCalendar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaBriefcase,
  FaArrowLeft,
  FaSave,
  FaChalkboardTeacher,
  FaAddressCard,
  FaIdCard,
  FaFilePdf,
  FaSignature,
  FaUpload,
  FaFileAlt,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditTeacherProfile() {

  const navigate = useNavigate();

  // =====================================================
  // FILE BASE URL
  // =====================================================

  const FILE_BASE_URL =
    "http://localhost:8080/api/files/";


  // =====================================================
  // LOADING / SAVING
  // =====================================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);


  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({

    firstName: "",
    middleName: "",
    lastName: "",

    gender: "",
    dateOfBirth: "",

    email: "",
    mobileNumber: "",
    address: "",

    qualification: "",
    subject: "",
    experience: "",

  });


  // =====================================================
  // DOCUMENT DATA
  //
  // Existing document = String path
  // New document     = File object
  // =====================================================

  const [documents, setDocuments] = useState({
  aadhaarCard: null,
  addressProof: null,
  panCard: null,
  profileImage: null,
  resume: null,
  signature: null,
});


  // =====================================================
  // GO TO TEACHER PROFILE
  // =====================================================

  const goToTeacherProfile = () => {

    console.log(
      "Going back to Teacher Profile"
    );

    navigate("/teacher/profile");

  };


  // =====================================================
  // DOCUMENT URL
  // =====================================================

  const getDocumentUrl = (path) => {

    if (!path) {
      return null;
    }

    if (
      typeof path === "string" &&
      (
        path.startsWith("http://") ||
        path.startsWith("https://")
      )
    ) {

      return path;

    }

    return `${FILE_BASE_URL}${path}`;

  };


  // =====================================================
  // FETCH TEACHER PROFILE
  // =====================================================

  useEffect(() => {

  const fetchTeacherProfile = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log("Logged Teacher User:", user);

      if (!user || !user.id) {
        console.error("Teacher user not found");
        setLoading(false);
        return;
      }

      const teacherId = user.id;

      console.log("Teacher User ID:", teacherId);

      // =================================================
      // GET TEACHER PROFILE
      // =================================================

      const response =
        await apiService.getMyTeacherProfile(teacherId);

      console.log(
        "FULL TEACHER PROFILE RESPONSE:",
        response.data
      );

      if (
        response.data &&
        response.data.status === 0 &&
        response.data.data
      ) {

        const data = response.data.data;

        console.log(
          "PROFILE DATA:",
          data
        );

        // =================================================
        // API SECTIONS
        // =================================================

        const teacherInfo =
          data.teacherInfo || {};

        const contactInfo =
          data.contactInfo || {};

        const professionalInfo =
          data.professionalInfo || {};

        const documentInfo =
          data.documents || {};


        // =================================================
        // FULL NAME
        // =================================================

        const fullName =
          teacherInfo.fullName || "";

        const nameParts =
          fullName
            .trim()
            .split(/\s+/)
            .filter(Boolean);


        let firstName = "";
        let middleName = "";
        let lastName = "";


        if (nameParts.length === 1) {

          firstName = nameParts[0];

        } else if (nameParts.length === 2) {

          firstName = nameParts[0];
          lastName = nameParts[1];

        } else {

          firstName = nameParts[0];

          lastName =
            nameParts[nameParts.length - 1];

          middleName =
            nameParts
              .slice(1, -1)
              .join(" ");

        }


        // =================================================
        // PROFESSIONAL INFORMATION
        // =================================================

        const qualification =
          professionalInfo.qualification ??
          data.qualification ??
          "";

        const subject =
          professionalInfo.subject ??
          data.subject ??
          "";

        const experience =
          professionalInfo.experience ??
          data.experience ??
          "";


        console.log(
          "Qualification:",
          qualification
        );

        console.log(
          "Subject:",
          subject
        );

        console.log(
          "Experience:",
          experience
        );


        // =================================================
        // CONTACT INFORMATION
        // =================================================

        const email =
          contactInfo.email ??
          data.email ??
          "";

        const mobileNumber =
          contactInfo.mobileNumber ??
          data.mobileNumber ??
          "";

        const address =
          contactInfo.address ??
          data.address ??
          "";


        // =================================================
        // SET FORM DATA
        // =================================================

        setFormData({

          firstName: firstName,

          middleName: middleName,

          lastName: lastName,

          gender:
            teacherInfo.gender ??
            data.gender ??
            "",

          dateOfBirth:
            teacherInfo.dateOfBirth ??
            data.dateOfBirth ??
            "",

          email: email,

          mobileNumber: mobileNumber,

          address: address,

          qualification: qualification,

          subject: subject,

          experience: experience,

        });


        // =================================================
        // SET EXISTING DOCUMENTS
        // =================================================

        setDocuments({

          profileImage:
            documentInfo.profileImage ||
            data.profileImage ||
            null,

          aadhaarCard:
            documentInfo.aadhaarCard ||
            data.aadhaarCard ||
            null,

          addressProof:
            documentInfo.addressProof ||
            data.addressProof ||
            null,

          panCard:
            documentInfo.panCard ||
            data.panCard ||
            null,

          resume:
            documentInfo.resume ||
            data.resume ||
            null,

          signature:
            documentInfo.signature ||
            data.signature ||
            null,

        });


        console.log(
          "Teacher Documents:",
          documentInfo
        );


        console.log(
          "FORM DATA SET SUCCESSFULLY"
        );

      } else {

        console.error(
          "Profile API Error:",
          response.data?.message
        );

      }

    } catch (error) {

      console.error(
        "Failed to fetch teacher profile:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  fetchTeacherProfile();

}, []);


  // =====================================================
  // HANDLE FORM CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  // =====================================================
  // HANDLE DOCUMENT CHANGE
  // =====================================================

  const handleDocumentChange = (e, documentType) => {

  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  // Maximum 10 MB
  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {

    alert(
      `${file.name} is too large. Maximum file size is 10 MB.`
    );

    e.target.value = "";

    return;
  }

  console.log(
    "NEW FILE SELECTED:",
    documentType,
    file.name,
    file.size
  );

  setDocuments((prev) => ({
    ...prev,
    [documentType]: file,
  }));

};


  // =====================================================
  // DOCUMENT PREVIEW URL
  // =====================================================

  const getPreviewUrl = (document) => {

    if (!document) {
      return null;
    }


    // New uploaded file
    if (
      typeof File !== "undefined" &&
      document instanceof File
    ) {

      return URL.createObjectURL(
        document
      );

    }


    // Existing document path
    return getDocumentUrl(
      document
    );

  };


  // =====================================================
  // DOCUMENT CARD
  // =====================================================

  const DocumentUploadCard = ({
    title,
    documentType,
    icon,
  }) => {

    const document =
      documents[documentType];


    const previewUrl =
      getPreviewUrl(document);


    const isNewFile =
      typeof File !== "undefined" &&
      document instanceof File;


    return (

      <div
        className="
          bg-gray-50
          border
          border-gray-200
          rounded-2xl
          p-4
          shadow-sm
          hover:shadow-md
          transition-all
        "
      >

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
            mb-4
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
            "
          >
            {icon}
          </div>


          <div>

            <h3
              className="
                text-sm
                font-bold
                text-gray-800
              "
            >
              {title}
            </h3>


            <p
              className="
                text-xs
                text-gray-500
                mt-0.5
              "
            >

              {isNewFile
                ? "New document selected"
                : document
                  ? "Existing document"
                  : "Not uploaded"}

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* DOCUMENT PREVIEW */}
        {/* ================================================= */}

        <div
          className="
            h-44
            bg-white
            rounded-xl
            border
            border-gray-200
            overflow-hidden
            flex
            items-center
            justify-center
            mb-4
          "
        >

          {previewUrl ? (

            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full
                h-full
                flex
                items-center
                justify-center
              "
            >

              <img
                src={previewUrl}
                alt={title}
                className="
                  w-full
                  h-full
                  object-contain
                  hover:scale-105
                  transition-transform
                  duration-300
                "
              />

            </a>

          ) : (

            <div
              className="
                text-center
                text-gray-400
              "
            >

              <div
                className="
                  text-4xl
                  flex
                  justify-center
                  mb-2
                "
              >
                {icon}
              </div>


              <p className="text-xs">
                No document uploaded
              </p>

            </div>

          )}

        </div>


        {/* ================================================= */}
        {/* CHANGE / UPLOAD */}
        {/* ================================================= */}

        <label
          className="
            w-full
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-blue-50
            text-blue-600
            hover:bg-blue-100
            font-semibold
            text-sm
            cursor-pointer
            transition
          "
        >

          <FaUpload />

          {document
            ? "Change Document"
            : "Upload Document"
          }


          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) =>
              handleDocumentChange(
                e,
                documentType
              )
            }
          />

        </label>


        {/* ================================================= */}
        {/* NEW FILE NAME */}
        {/* ================================================= */}

        {isNewFile && (

          <p
            className="
              text-xs
              text-gray-500
              mt-2
              truncate
              text-center
            "
            title={document.name}
          >
            {document.name}
          </p>

        )}

      </div>

    );

  };


  // =====================================================
  // HANDLE UPDATE
  // =====================================================

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const teacherId = user?.id;

    if (!teacherId) {
      alert("Teacher ID not found.");
      return;
    }

    // -----------------------------
    // Teacher JSON data
    // -----------------------------
    const teacherData = {
      firstName: formData.firstName || "",
      middleName: formData.middleName || "",
      lastName: formData.lastName || "",
      gender: formData.gender || "",
      dateOfBirth: formData.dateOfBirth || "",
      email: formData.email || "",
      mobileNumber: formData.mobileNumber || "",
      address: formData.address || "",
      qualification: formData.qualification || "",
      subject: formData.subject || "",
      experience: formData.experience || "",
    };

    // -----------------------------
    // Multipart FormData
    // -----------------------------
    const multipartData = new FormData();

    // IMPORTANT:
    // Backend expects "teacher" as JSON
    multipartData.append(
      "teacher",
      new Blob(
        [JSON.stringify(teacherData)],
        { type: "application/json" }
      )
    );

    // -----------------------------
    // Add ONLY newly selected files
    // -----------------------------

    if (documents.panCard instanceof File) {
      multipartData.append("panCard", documents.panCard);
    }

    if (documents.profileImage instanceof File) {
      multipartData.append("profileImage", documents.profileImage);
    }

    if (documents.signature instanceof File) {
      multipartData.append("signature", documents.signature);
    }

    if (documents.resume instanceof File) {
      multipartData.append("resume", documents.resume);
    }

    if (documents.aadhaarCard instanceof File) {
      multipartData.append("aadhaarCard", documents.aadhaarCard);
    }

    if (documents.addressProof instanceof File) {
      multipartData.append("addressProof", documents.addressProof);
    }

    // -----------------------------
    // API call
    // -----------------------------
    const response = await apiService.updateTeacherProfile(
      teacherId,
      multipartData
    );

    console.log("Update response:", response.data);

    if (response.data?.status === 0) {
      alert(
        response.data.message ||
        "Teacher profile updated successfully."
      );

      navigate("/teacher/profile");
    } else {
      alert(
        response.data?.message ||
        "Failed to update teacher profile."
      );
    }

  } catch (error) {
    console.error("Update teacher profile error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update teacher profile."
    );
  } finally {
    setSaving(false);
  }
};

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <AdminLayout>

        <div
          className="
            min-h-[500px]
            flex
            items-center
            justify-center
          "
        >

          <div className="text-center">

            <div
              className="
                w-14
                h-14
                border-4
                border-blue-100
                border-t-blue-600
                rounded-full
                animate-spin
                mx-auto
                mb-5
              "
            />


            <p
              className="
                text-gray-600
                font-medium
              "
            >
              Loading teacher profile...
            </p>

          </div>

        </div>

      </AdminLayout>

    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <AdminLayout>

      <div
        className="
          px-4
          md:px-6
          lg:px-8
          pb-10
        "
      >

        {/* ================================================= */}
        {/* BACK BUTTON */}
        {/* ================================================= */}

        <div className="mb-5">

          <button
            type="button"
            onClick={goToTeacherProfile}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-white
              border
              border-gray-200
              text-gray-600
              hover:bg-gray-50
              hover:text-gray-800
              shadow-sm
              text-sm
              font-medium
              transition
            "
          >

            <FaArrowLeft />

            Back

          </button>

        </div>


        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            p-6
            md:p-7
            mb-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              "
            >

              <FaChalkboardTeacher
                className="text-xl"
              />

            </div>


            <div>

              <h1
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-gray-800
                "
              >
                Edit Teacher Profile
              </h1>


              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Update your personal, contact and professional information.
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* ================================================= */}
          {/* PERSONAL INFORMATION */}
          {/* ================================================= */}

          <div
            className="
              p-6
              md:p-8
              border-b
              border-gray-200
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
                mb-7
              "
            >
              Personal Information
            </h2>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {/* FIRST NAME */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  First Name
                </label>


                <div className="relative">

                  <FaUser
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                    "
                  />


                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* MIDDLE NAME */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Middle Name
                </label>


                <div className="relative">

                  <FaUser
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                    "
                  />


                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Middle Name"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* LAST NAME */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Last Name
                </label>


                <div className="relative">

                  <FaUser
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                    "
                  />


                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* GENDER */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Gender
                </label>


                <div className="relative">

                  <FaVenusMars
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-pink-500
                      z-10
                    "
                  />


                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="MALE">
                      Male
                    </option>

                    <option value="FEMALE">
                      Female
                    </option>

                    <option value="OTHER">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* DATE OF BIRTH */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Date of Birth
                </label>


                <div className="relative">

                  <FaCalendar
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                      pointer-events-none
                    "
                  />


                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* CONTACT INFORMATION */}
          {/* ================================================= */}

          <div
            className="
              p-6
              md:p-8
              border-b
              border-gray-200
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
                mb-7
              "
            >
              Contact Information
            </h2>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {/* EMAIL */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Email
                </label>


                <div className="relative">

                  <FaEnvelope
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                    "
                  />


                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* MOBILE */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Mobile Number
                </label>


                <div className="relative">

                  <FaPhone
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-blue-500
                    "
                  />


                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* ADDRESS */}

              <div className="md:col-span-2">

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Address
                </label>


                <div className="relative">

                  <FaMapMarkerAlt
                    className="
                      absolute
                      left-4
                      top-5
                      text-blue-500
                    "
                  />


                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    rows="4"
                    className="
                      w-full
                      pl-11
                      pr-4
                      py-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      resize-none
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* PROFESSIONAL INFORMATION */}
          {/* ================================================= */}

          <div
            className="
              p-6
              md:p-8
              border-b
              border-gray-200
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
                mb-7
              "
            >
              Professional Information
            </h2>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
              "
            >

              {/* QUALIFICATION */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Qualification
                </label>


                <div className="relative">

                  <FaGraduationCap
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-purple-500
                    "
                  />


                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="Qualification"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* SUBJECT */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Subject
                </label>


                <div className="relative">

                  <FaBook
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-indigo-500
                    "
                  />


                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* EXPERIENCE */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Experience (Years)
                </label>


                <div className="relative">

                  <FaBriefcase
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-orange-500
                    "
                  />


                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    min="0"
                    className="
                      w-full
                      h-14
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* DOCUMENTS */}
          {/* ================================================= */}

          <div
            className="
              p-6
              md:p-8
              border-b
              border-gray-200
            "
          >

            <div className="mb-7">

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                  "
                >

                  <FaFileAlt />

                </div>


                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Documents
                  </h2>


                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Existing documents are shown below. You can replace them if required.
                  </p>

                </div>

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-5
                gap-5
              "
            >
              {/* PROFILE IMAGE */}
  <DocumentUploadCard
    title="Profile Image"
    documentType="profileImage"
    icon={<FaUser />}
  />

              <DocumentUploadCard
                title="Aadhaar Card"
                documentType="aadhaarCard"
                icon={<FaAddressCard />}
              />


              <DocumentUploadCard
                title="PAN Card"
                documentType="panCard"
                icon={<FaIdCard />}
              />


              <DocumentUploadCard
                title="Address Proof"
                documentType="addressProof"
                icon={<FaMapMarkerAlt />}
              />


              <DocumentUploadCard
                title="Resume"
                documentType="resume"
                icon={<FaFilePdf />}
              />


              <DocumentUploadCard
                title="Signature"
                documentType="signature"
                icon={<FaSignature />}
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================================= */}

          <div
            className="
              p-6
              md:p-8
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
            "
          >

            {/* CANCEL */}

            <button
              type="button"
              onClick={goToTeacherProfile}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-700
                font-semibold
                hover:bg-gray-50
                transition
              "
            >

              Cancel

            </button>


            {/* UPDATE */}

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                shadow-sm
                hover:shadow-md
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              <FaSave />

              {saving
                ? "Updating..."
                : "Update Profile"}

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

export default EditTeacherProfile;
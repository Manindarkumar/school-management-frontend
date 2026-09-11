import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaPhone,
  FaUsers,
  FaBook,
  FaFileUpload,
  FaSave,
  FaArrowLeft,
  FaFilePdf,
  FaEye,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

const FILE_BASE_URL = "http://localhost:8080/api/files/";

const getDocumentUrl = (path) => {
  if (!path) return null;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${FILE_BASE_URL}${path}`;
};

/* =========================================================
   DOCUMENT UPLOAD COMPONENT
========================================================= */

const DocumentUpload = ({
  label,
  name,
  selectedFile,
  existingFile,
  onChange,
}) => {
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    setPreviewError(false);
  }, [selectedFile, existingFile]);

  const existingFileUrl = getDocumentUrl(existingFile);

  const selectedFileUrl =
    selectedFile instanceof File
      ? URL.createObjectURL(selectedFile)
      : null;

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  const currentFile = selectedFile || existingFile;

  const getFileExtension = (file) => {
    if (!file) return "";

    if (file instanceof File) {
      return (
        file.name?.split(".").pop()?.toLowerCase() || ""
      );
    }

    return (
      file
        ?.split("?")[0]
        ?.split(".")
        .pop()
        ?.toLowerCase() || ""
    );
  };

  const extension = getFileExtension(currentFile);

  const isPdf = extension === "pdf";

  const isImage = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
  ].includes(extension);

  const previewUrl =
    selectedFileUrl || existingFileUrl;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <FaFileUpload className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {label}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {selectedFile
                ? "New document selected"
                : existingFile
                ? "Existing document"
                : "No document"}
            </p>
          </div>

        </div>

      </div>

      {/* PREVIEW */}
      <div className="p-5">

        <div className="h-[240px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">

          {/* NO FILE */}
          {!currentFile && (
            <div className="text-center">

              <FaFileUpload className="mx-auto text-3xl text-gray-300 mb-3" />

              <p className="text-sm text-gray-400">
                No document available
              </p>

            </div>
          )}

          {/* PDF */}
          {currentFile && isPdf && (
            <div className="text-center">

              <FaFilePdf className="mx-auto text-5xl text-red-500 mb-3" />

              <p className="text-sm text-gray-600 mb-4">
                PDF Document
              </p>

              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  <FaEye />
                  View Document
                </a>
              )}

            </div>
          )}

          {/* IMAGE */}
          {currentFile &&
            isImage &&
            !previewError && (
              <img
                src={previewUrl}
                alt={label}
                className="w-full h-full object-contain"
                onError={() => setPreviewError(true)}
              />
            )}

          {/* UNKNOWN FILE */}
          {currentFile &&
            !isPdf &&
            !isImage &&
            !previewError && (
              <div className="text-center">

                <FaFileUpload className="mx-auto text-5xl text-blue-400 mb-3" />

                <p className="text-sm text-gray-600">
                  Document available
                </p>

                {previewUrl && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    <FaEye />
                    View Document
                  </a>
                )}

              </div>
            )}

          {/* PREVIEW ERROR */}
          {currentFile && previewError && (
            <div className="text-center">

              <FaFileUpload className="mx-auto text-5xl text-gray-400 mb-3" />

              <p className="text-sm text-gray-500">
                Document available
              </p>

              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  <FaEye />
                  View Document
                </a>
              )}

            </div>
          )}

        </div>

        {/* CHANGE DOCUMENT */}
        <label
          htmlFor={name}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer transition"
        >
          <FaFileUpload />
          Change Document
        </label>

        <input
          id={name}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={(e) => {
            onChange(
              name,
              e.target.files?.[0] || null
            );

            // Allow selecting the same file again
            e.target.value = "";
          }}
        />

      </div>

    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    address: "",
    fatherName: "",
    motherName: "",
    guardianContact: "",
    rollNumber: "",
    semester: "",
    courseId: "",
    batchId: "",
  });

  const [documents, setDocuments] = useState({
    profileImage: null,
    aadhaarCard: null,
    panCard: null,
    addressProof: null,
    signature: null,
  });

  const [existingDocuments, setExistingDocuments] =
    useState({
      profileImage: null,
      aadhaarCard: null,
      panCard: null,
      addressProof: null,
      signature: null,
    });

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     HANDLE DOCUMENT
  ========================================================= */

  const handleDocumentChange = (name, file) => {
    setDocuments((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  /* =========================================================
     FIND COURSE
  ========================================================= */

  const findCourse = (courseList, courseName) => {
    if (!courseName) return null;

    return courseList.find(
      (course) =>
        String(course.courseName || "")
          .trim()
          .toLowerCase() ===
        String(courseName)
          .trim()
          .toLowerCase()
    );
  };

  /* =========================================================
     FIND BATCH
  ========================================================= */

  const findBatch = (
    batchList,
    courseName,
    branchName
  ) => {
    if (!courseName) return null;

    let batch = batchList.find(
      (batch) =>
        String(batch.course || "")
          .trim()
          .toLowerCase() ===
          String(courseName)
            .trim()
            .toLowerCase() &&
        String(batch.section || "")
          .trim()
          .toLowerCase() ===
          String(branchName || "")
            .trim()
            .toLowerCase()
    );

    if (!batch) {
      batch = batchList.find(
        (batch) =>
          String(batch.course || "")
            .trim()
            .toLowerCase() ===
          String(courseName)
            .trim()
            .toLowerCase()
      );
    }

    return batch || null;
  };

  /* =========================================================
     FETCH STUDENT PROFILE
  ========================================================= */

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?.id) {
        alert(
          "Student information not found. Please login again."
        );

        navigate("/student/profile");
        return;
      }

      console.log(
        "========== LOGGED IN USER =========="
      );
      console.log(user);

      const [
        courseResponse,
        batchResponse,
        studentResponse,
      ] = await Promise.all([
        apiService.fetchAllCourse(),
        apiService.getAllBatches(),
        apiService.getMyStudentProfile(user.id),
      ]);

      console.log(
        "========== COURSE RESPONSE =========="
      );
      console.log(courseResponse);

      console.log(
        "========== BATCH RESPONSE =========="
      );
      console.log(batchResponse);

      console.log(
        "========== STUDENT RESPONSE =========="
      );
      console.log(studentResponse);

      /* -----------------------------------------------------
         COURSE LIST
      ----------------------------------------------------- */

      let courseList = [];

      if (
        courseResponse?.data?.status === 0
      ) {
        courseList =
          courseResponse.data.data || [];
      }

      if (!Array.isArray(courseList)) {
        courseList = [];
      }

      setCourses(courseList);

      /* -----------------------------------------------------
         BATCH LIST
      ----------------------------------------------------- */

      let batchList = [];

      if (
        batchResponse?.data?.status === 0
      ) {
        batchList =
          batchResponse.data.data || [];
      }

      if (!Array.isArray(batchList)) {
        batchList = [];
      }

      setBatches(batchList);

      /* -----------------------------------------------------
         STUDENT PROFILE
      ----------------------------------------------------- */

      if (
        studentResponse?.data?.status !== 0 ||
        !studentResponse?.data?.data
      ) {
        alert(
          studentResponse?.data?.message ||
            "Unable to fetch student profile."
        );

        return;
      }

      const student =
        studentResponse.data.data;

      const studentInfo =
        student.studentInfo || {};

      const contactInfo =
        student.contactInfo || {};

      const guardianInfo =
        student.guardianInfo || {};

      const academicInfo =
        student.academicInfo || {};

      const documentsInfo =
        student.documents || {};

      /* -----------------------------------------------------
         CURRENT ACADEMIC DATA
      ----------------------------------------------------- */

      const currentCourseName =
        academicInfo.courseName || "";

      const currentBranch =
        academicInfo.branchName || "";

      const selectedCourse =
        findCourse(
          courseList,
          currentCourseName
        );

      const selectedBatch =
        findBatch(
          batchList,
          currentCourseName,
          currentBranch
        );

      console.log(
        "========== SELECTED COURSE =========="
      );
      console.log(selectedCourse);

      console.log(
        "========== SELECTED BATCH =========="
      );
      console.log(selectedBatch);

      /* -----------------------------------------------------
         FULL NAME
      ----------------------------------------------------- */

      const fullName =
        studentInfo.fullName || "";

      const nameParts = fullName
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
      } else if (nameParts.length > 2) {
        firstName = nameParts[0];

        lastName =
          nameParts[nameParts.length - 1];

        middleName = nameParts
          .slice(1, -1)
          .join(" ");
      }

      /* -----------------------------------------------------
         SEMESTER
      ----------------------------------------------------- */

      let semesterValue =
        academicInfo.semester || "";

      if (
        typeof semesterValue === "string"
      ) {
        const semesterNumber =
          semesterValue.match(/\d+/);

        if (semesterNumber) {
          semesterValue =
            semesterNumber[0];
        }
      }

      /* -----------------------------------------------------
         SET FORM DATA
      ----------------------------------------------------- */

      setFormData({
        firstName,
        middleName,
        lastName,

        gender:
          studentInfo.gender || "",

        dateOfBirth:
          studentInfo.dateOfBirth || "",

        mobileNumber:
          contactInfo.mobileNumber || "",

        address:
          contactInfo.address || "",

        fatherName:
          guardianInfo.fatherName || "",

        motherName:
          guardianInfo.motherName || "",

        guardianContact:
          guardianInfo.guardianContact || "",

        rollNumber:
          academicInfo.rollNumber || "",

        semester:
          semesterValue,

        courseId:
          selectedCourse?.id
            ? String(selectedCourse.id)
            : "",

        batchId:
          selectedBatch?.id
            ? String(selectedBatch.id)
            : "",
      });

      /* -----------------------------------------------------
         EXISTING DOCUMENTS
      ----------------------------------------------------- */

      setExistingDocuments({
        profileImage:
          documentsInfo.profileImage || null,

        aadhaarCard:
          documentsInfo.aadhaarCard || null,

        panCard:
          documentsInfo.panCard || null,

        addressProof:
          documentsInfo.addressProof || null,

        signature:
          documentsInfo.signature || null,
      });

      console.log(
        "========== FINAL FORM DATA =========="
      );

      console.log({
        firstName,
        middleName,
        lastName,
        gender: studentInfo.gender || "",
        dateOfBirth:
          studentInfo.dateOfBirth || "",
        mobileNumber:
          contactInfo.mobileNumber || "",
        address:
          contactInfo.address || "",
        fatherName:
          guardianInfo.fatherName || "",
        motherName:
          guardianInfo.motherName || "",
        guardianContact:
          guardianInfo.guardianContact || "",
        rollNumber:
          academicInfo.rollNumber || "",
        semester: semesterValue,
        courseId:
          selectedCourse?.id || "",
        batchId:
          selectedBatch?.id || "",
      });

    } catch (error) {
      console.error(
        "========== FETCH PROFILE ERROR =========="
      );
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong while fetching student profile."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert("Please enter first name.");
      return false;
    }

    if (!formData.lastName.trim()) {
      alert("Please enter last name.");
      return false;
    }

    if (!formData.gender) {
      alert("Please select gender.");
      return false;
    }

    if (!formData.dateOfBirth) {
      alert("Please select date of birth.");
      return false;
    }

    if (!formData.mobileNumber.trim()) {
      alert("Please enter mobile number.");
      return false;
    }

    if (
      !/^\d{10}$/.test(
        formData.mobileNumber.trim()
      )
    ) {
      alert(
        "Mobile number must contain exactly 10 digits."
      );

      return false;
    }

    if (!formData.address.trim()) {
      alert("Please enter address.");
      return false;
    }

    if (!formData.guardianContact.trim()) {
      alert(
        "Please enter guardian contact number."
      );

      return false;
    }

    if (
      !/^\d{10}$/.test(
        formData.guardianContact.trim()
      )
    ) {
      alert(
        "Guardian contact must contain exactly 10 digits."
      );

      return false;
    }

    if (!formData.courseId) {
      alert("Please select a course.");
      return false;
    }

    if (!formData.batchId) {
      alert("Please select a batch.");
      return false;
    }

    if (!formData.rollNumber.trim()) {
      alert("Please enter roll number.");
      return false;
    }

    if (!formData.semester) {
      alert("Please enter semester.");
      return false;
    }

    return true;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?.id) {
        alert(
          "User information not found. Please login again."
        );

        return;
      }

      /* -----------------------------------------------------
         SEMESTER NUMBER
         
         Example:
         "Semester 8" -> 8
         "8"          -> 8
      ----------------------------------------------------- */

      const semesterNumber = Number(
        String(formData.semester).replace(
          /\D/g,
          ""
        )
      );

      if (
        !semesterNumber ||
        semesterNumber <= 0
      ) {
        alert("Please enter a valid semester.");
        return;
      }

      /* -----------------------------------------------------
         STUDENT JSON
      ----------------------------------------------------- */

      const studentData = {
        firstName:
          formData.firstName.trim(),

        middleName:
          formData.middleName.trim(),

        lastName:
          formData.lastName.trim(),

        gender:
          formData.gender,

        dateOfBirth:
          formData.dateOfBirth,

        mobileNumber:
          formData.mobileNumber.trim(),

        address:
          formData.address.trim(),

        fatherName:
          formData.fatherName.trim(),

        motherName:
          formData.motherName.trim(),

        guardianContact:
          formData.guardianContact.trim(),

        rollNumber:
          formData.rollNumber.trim(),

        semester:
          semesterNumber,

        courseId:
          Number(formData.courseId),

        batchId:
          Number(formData.batchId),
      };

      console.log(
        "========== STUDENT JSON =========="
      );

      console.log(
        JSON.stringify(
          studentData,
          null,
          2
        )
      );

      /* -----------------------------------------------------
         FORM DATA
      ----------------------------------------------------- */

      const multipartData =
        new FormData();

      multipartData.append(
        "student",
        new Blob(
          [
            JSON.stringify(
              studentData
            ),
          ],
          {
            type: "application/json",
          }
        )
      );

      /* -----------------------------------------------------
         PROFILE IMAGE
      ----------------------------------------------------- */

      if (
        documents.profileImage instanceof
        File
      ) {
        multipartData.append(
          "profileImage",
          documents.profileImage
        );
      }

      /* -----------------------------------------------------
         AADHAAR
      ----------------------------------------------------- */

      if (
        documents.aadhaarCard instanceof
        File
      ) {
        multipartData.append(
          "aadhaarCard",
          documents.aadhaarCard
        );
      }

      /* -----------------------------------------------------
         PAN
      ----------------------------------------------------- */

      if (
        documents.panCard instanceof
        File
      ) {
        multipartData.append(
          "panCard",
          documents.panCard
        );
      }

      /* -----------------------------------------------------
         ADDRESS PROOF
      ----------------------------------------------------- */

      if (
        documents.addressProof instanceof
        File
      ) {
        multipartData.append(
          "addressProof",
          documents.addressProof
        );
      }

      /* -----------------------------------------------------
         SIGNATURE
      ----------------------------------------------------- */

      if (
        documents.signature instanceof
        File
      ) {
        multipartData.append(
          "signature",
          documents.signature
        );
      }

      /* -----------------------------------------------------
         DEBUG FORMDATA
      ----------------------------------------------------- */

      console.log(
        "========== FORMDATA =========="
      );

      for (
        const [
          key,
          value,
        ] of multipartData.entries()
      ) {
        if (value instanceof File) {
          console.log(key, {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(
            key,
            value
          );
        }
      }

      /* -----------------------------------------------------
         API CALL
      ----------------------------------------------------- */

      const response =
        await apiService.updateStudentProfile(
          user.id,
          multipartData
        );

      console.log(
        "========== UPDATE RESPONSE =========="
      );

      console.log(
        response?.data
      );

      /* -----------------------------------------------------
         SUCCESS
      ----------------------------------------------------- */

      if (
        response?.data?.status === 0
      ) {
        alert(
          response.data.message ||
            "Student profile updated successfully!"
        );

        navigate(
          "/student/profile"
        );

        return;
      }

      /* -----------------------------------------------------
         API FAILURE
      ----------------------------------------------------- */

      alert(
        response?.data?.message ||
          "Failed to update student profile."
      );

    } catch (error) {
      console.error(
        "========== UPDATE ERROR =========="
      );

      console.error(error);

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "RESPONSE:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          "Something went wrong while updating student profile."
      );

    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <AdminLayout>

        <div className="flex items-center justify-center min-h-[500px]">

          <div className="text-center">

            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-gray-500">
              Loading student profile...
            </p>

          </div>

        </div>

      </AdminLayout>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <AdminLayout>

      <div className="p-6">

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/student/profile"
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 shadow-sm text-sm font-medium transition"
          >
            <FaArrowLeft />
            Back
          </button>

        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

              <FaUser className="text-blue-600 text-2xl" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                Edit Student Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Update your personal, academic and document information
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

            <div className="px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FaUser className="text-blue-600" />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your basic personal details
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* FIRST NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={
                      formData.firstName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="First Name"
                  />

                </div>

                {/* MIDDLE NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>

                  <input
                    type="text"
                    name="middleName"
                    value={
                      formData.middleName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Middle Name"
                  />

                </div>

                {/* LAST NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={
                      formData.lastName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Last Name"
                  />

                </div>

                {/* GENDER */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={
                      formData.gender
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* DOB */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      formData.dateOfBirth
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />

                </div>

                {/* MOBILE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>

                  <div className="relative">

                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="mobileNumber"
                      value={
                        formData.mobileNumber
                      }
                      onChange={
                        handleChange
                      }
                      maxLength={10}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Mobile Number"
                    />

                  </div>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Address"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              GUARDIAN INFORMATION
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

            <div className="px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FaUsers className="text-blue-600" />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    Guardian Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update parent and guardian details
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* FATHER */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={
                      formData.fatherName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Father Name"
                  />

                </div>

                {/* MOTHER */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={
                      formData.motherName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Mother Name"
                  />

                </div>

                {/* GUARDIAN CONTACT */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guardian Contact
                  </label>

                  <input
                    type="text"
                    name="guardianContact"
                    value={
                      formData.guardianContact
                    }
                    onChange={
                      handleChange
                    }
                    maxLength={10}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Guardian Contact"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              ACADEMIC INFORMATION
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

            <div className="px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FaBook className="text-blue-600" />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    Academic Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your academic details
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* COURSE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>

                  <select
                    name="courseId"
                    value={
                      formData.courseId
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >

                    <option value="">
                      Select Course
                    </option>

                    {courses.map(
                      (course) => (
                        <option
                          key={
                            course.id
                          }
                          value={
                            course.id
                          }
                        >
                          {
                            course.courseName
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* BATCH */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch
                  </label>

                  <select
                    name="batchId"
                    value={
                      formData.batchId
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >

                    <option value="">
                      Select Batch
                    </option>

                    {batches.map(
                      (batch) => (
                        <option
                          key={
                            batch.id
                          }
                          value={
                            batch.id
                          }
                        >
                          {
                            batch.batchName
                          }
                          {batch.section
                            ? ` - ${batch.section}`
                            : ""}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* ROLL NUMBER */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>

                  <input
                    type="text"
                    name="rollNumber"
                    value={
                      formData.rollNumber
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Roll Number"
                  />

                </div>

                {/* SEMESTER */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>

                  <input
                    type="text"
                    name="semester"
                    value={
                      formData.semester
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Semester"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              DOCUMENTS
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

            <div className="px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FaFileUpload className="text-blue-600" />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    Documents
                  </h2>

                  <p className="text-sm text-gray-500">
                    Upload or change your documents
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

                {/* PROFILE IMAGE */}

                <DocumentUpload
                  label="Profile Image"
                  name="profileImage"
                  selectedFile={
                    documents.profileImage
                  }
                  existingFile={
                    existingDocuments.profileImage
                  }
                  onChange={
                    handleDocumentChange
                  }
                />

                {/* AADHAAR */}

                <DocumentUpload
                  label="Aadhaar Card"
                  name="aadhaarCard"
                  selectedFile={
                    documents.aadhaarCard
                  }
                  existingFile={
                    existingDocuments.aadhaarCard
                  }
                  onChange={
                    handleDocumentChange
                  }
                />

                {/* PAN */}

                <DocumentUpload
                  label="PAN Card"
                  name="panCard"
                  selectedFile={
                    documents.panCard
                  }
                  existingFile={
                    existingDocuments.panCard
                  }
                  onChange={
                    handleDocumentChange
                  }
                />

                {/* ADDRESS PROOF */}

                <DocumentUpload
                  label="Address Proof"
                  name="addressProof"
                  selectedFile={
                    documents.addressProof
                  }
                  existingFile={
                    existingDocuments.addressProof
                  }
                  onChange={
                    handleDocumentChange
                  }
                />

                {/* SIGNATURE */}

                <DocumentUpload
                  label="Signature"
                  name="signature"
                  selectedFile={
                    documents.signature
                  }
                  existingFile={
                    existingDocuments.signature
                  }
                  onChange={
                    handleDocumentChange
                  }
                />

              </div>

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex items-center justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/student/profile"
                )
              }
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition disabled:opacity-50"
            >
              <FaArrowLeft />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>

                  Saving...
                </>
              ) : (
                <>
                  <FaSave />

                  Save Changes
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
};

export default EditStudentProfile;
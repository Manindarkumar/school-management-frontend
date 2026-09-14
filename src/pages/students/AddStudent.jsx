import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    password: "",
    courseId: "",
    batchId: "",
    semester: "",
    fatherName: "",
    motherName: "",
    guardianContact: "",
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [documents, setDocuments] = useState({
    profileImage: null,
    aadhaarCard: null,
    panCard: null,
    addressProof: null,
    signature: null,
  });

  const [saving, setSaving] = useState(false);

  const labelStyle = "font-semibold text-lg";

  const inputStyle =
    "w-full border p-3 rounded-xl mt-2 text-lg";

  // =========================================================
  // LOAD COURSES AND BATCHES
  // =========================================================

  useEffect(() => {
    const loadCoursesAndBatches = async () => {
      try {
        const [courseResponse, batchResponse] =
          await Promise.all([
            apiService.fetchAllCourse(),
            apiService.getAllBatches(),
          ]);

        console.log(
          "Course Response:",
          courseResponse.data
        );

        console.log(
          "Batch Response:",
          batchResponse.data
        );

        // -----------------------------------------------------
        // COURSES
        // -----------------------------------------------------

        const courseData =
          courseResponse.data?.data;

        if (Array.isArray(courseData)) {
          setCourses(courseData);
        } else if (
          Array.isArray(courseResponse.data)
        ) {
          setCourses(courseResponse.data);
        } else {
          setCourses([]);
        }

        // -----------------------------------------------------
        // BATCHES
        // -----------------------------------------------------

        const batchData =
          batchResponse.data?.data;

        if (Array.isArray(batchData)) {
          setBatches(batchData);
        } else if (
          Array.isArray(batchResponse.data)
        ) {
          setBatches(batchResponse.data);
        } else {
          setBatches([]);
        }
      } catch (error) {
        console.error(
          "Failed to load courses and batches:",
          error
        );

        alert(
          "Failed to load courses and batches"
        );
      }
    };

    loadCoursesAndBatches();
  }, []);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================================
  // HANDLE FILE CHANGE
  // =========================================================

  const handleFileChange = (
    e,
    documentType
  ) => {
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
      "Selected File:",
      documentType,
      file.name,
      file.size
    );

    setDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }));
  };

  // =========================================================
  // HANDLE SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =======================================================
    // VALIDATION
    // =======================================================

    if (!student.firstName.trim()) {
      alert("Please enter First Name");
      return;
    }

    if (!student.lastName.trim()) {
      alert("Please enter Last Name");
      return;
    }

    if (!student.mobileNumber.trim()) {
      alert("Please enter Mobile Number");
      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        student.mobileNumber
      )
    ) {
      alert(
        "Mobile Number must be 10 digits"
      );
      return;
    }

    if (!student.gender) {
      alert("Please select Gender");
      return;
    }

    if (!student.dateOfBirth) {
      alert(
        "Please select Date Of Birth"
      );
      return;
    }

    if (!student.email.trim()) {
      alert("Please enter Email");
      return;
    }

    if (!student.password.trim()) {
      alert("Please enter Password");
      return;
    }

    if (!student.courseId) {
      alert("Please select Course");
      return;
    }

    if (!student.batchId) {
      alert("Please select Batch");
      return;
    }

    if (!student.semester) {
      alert("Please enter Semester");
      return;
    }

    if (!student.fatherName.trim()) {
      alert("Please enter Father Name");
      return;
    }

    if (!student.motherName.trim()) {
      alert("Please enter Mother Name");
      return;
    }

    if (!student.guardianContact.trim()) {
      alert(
        "Please enter Guardian Contact"
      );
      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        student.guardianContact
      )
    ) {
      alert(
        "Guardian Contact must be 10 digits"
      );
      return;
    }

    if (!student.address.trim()) {
      alert("Please enter Address");
      return;
    }

    // =======================================================
    // CREATE STUDENT
    // =======================================================

    try {
      setSaving(true);

      console.log(
        "Student Data:",
        student
      );

      console.log(
        "Student Documents:",
        documents
      );

      // =====================================================
      // CREATE FORMDATA
      // =====================================================

      const formData = new FormData();

      /*
       * Backend expects:
       *
       * @RequestPart("student") String studentJson
       */

      formData.append(
        "student",
        new Blob(
          [
            JSON.stringify(
              student
            ),
          ],
          {
            type: "application/json",
          }
        )
      );

      // =====================================================
      // ADD PROFILE IMAGE
      // =====================================================

      if (
        documents.profileImage
      ) {
        formData.append(
          "profileImage",
          documents.profileImage
        );
      }

      // =====================================================
      // ADD AADHAAR CARD
      // =====================================================

      if (
        documents.aadhaarCard
      ) {
        formData.append(
          "aadhaarCard",
          documents.aadhaarCard
        );
      }

      // =====================================================
      // ADD PAN CARD
      // =====================================================

      if (
        documents.panCard
      ) {
        formData.append(
          "panCard",
          documents.panCard
        );
      }

      // =====================================================
      // ADD ADDRESS PROOF
      // =====================================================

      if (
        documents.addressProof
      ) {
        formData.append(
          "addressProof",
          documents.addressProof
        );
      }

      // =====================================================
      // ADD SIGNATURE
      // =====================================================

      if (
        documents.signature
      ) {
        formData.append(
          "signature",
          documents.signature
        );
      }

      // =====================================================
      // DEBUG FORMDATA
      // =====================================================

      for (
        const [key, value]
        of formData.entries()
      ) {
        console.log(
          "FormData:",
          key,
          value
        );
      }

      // =====================================================
      // API CALL
      // =====================================================

      const response =
        await apiService.createStudent(
          formData
        );

      console.log(
        "Student Created Response:",
        response.data
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      if (
        response.data?.status === 0
      ) {
        alert(
          response.data.message ||
            "Student Added Successfully"
        );

        // Clear student fields
        setStudent({
          firstName: "",
          middleName: "",
          lastName: "",
          mobileNumber: "",
          address: "",
          gender: "",
          dateOfBirth: "",
          email: "",
          password: "",
          courseId: "",
          batchId: "",
          semester: "",
          fatherName: "",
          motherName: "",
          guardianContact: "",
        });

        // Clear documents
        setDocuments({
          profileImage: null,
          aadhaarCard: null,
          panCard: null,
          addressProof: null,
          signature: null,
        });

        // Uncomment if you want navigation
        // navigate("/admin/students");
      } else {
        alert(
          response.data?.message ||
            "Failed to add student"
        );
      }
    } catch (error) {
      console.error(
        "Create student failed:",
        error
      );

      console.error(
        "Backend error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to add student"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // FILE NAME HELPER
  // =========================================================

  const getFileName = (file) => {
    if (!file) {
      return "";
    }

    return file.name;
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <AdminLayout>

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}

      <div className="mb-6">
        <button
          onClick={() =>
            navigate(-1)
          }
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      {/* =====================================================
          PAGE TITLE
      ====================================================== */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Add Student
        </h1>

        {/* <p className="text-gray-500 mt-2">
          Create a new student profile with
          personal, academic and document
          details.
        </p> */}
      </div>

      {/* =====================================================
          FORM CARD
      ====================================================== */}

      <div className="bg-white rounded-3xl shadow-md p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* =================================================
              FIRST NAME
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              First Name
            </label>

            <input
              name="firstName"
              placeholder="Enter First Name"
              value={
                student.firstName
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              MIDDLE NAME
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Middle Name
            </label>

            <input
              name="middleName"
              placeholder="Enter Middle Name"
              value={
                student.middleName
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              LAST NAME
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Last Name
            </label>

            <input
              name="lastName"
              placeholder="Enter Last Name"
              value={
                student.lastName
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              MOBILE NUMBER
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Mobile Number
            </label>

            <input
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={
                student.mobileNumber
              }
              onChange={
                handleChange
              }
              maxLength="10"
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              GENDER
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Gender
            </label>

            <select
              name="gender"
              value={
                student.gender
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
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
            </select>
          </div>

          {/* =================================================
              DATE OF BIRTH
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Date Of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={
                student.dateOfBirth
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              EMAIL
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={
                student.email
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              PASSWORD
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={
                student.password
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              COURSE DROPDOWN
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Course
            </label>

            <select
              name="courseId"
              value={
                student.courseId
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
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
                    {course.courseName ||
                      course.name ||
                      course.courseFullName ||
                      `Course ${course.id}`}
                  </option>
                )
              )}
            </select>
          </div>

          {/* =================================================
              BATCH DROPDOWN
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Batch
            </label>

            <select
              name="batchId"
              value={
                student.batchId
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
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
                    {batch.batchName ||
                      batch.name ||
                      batch.batchFullName ||
                      `Batch ${batch.id}`}
                  </option>
                )
              )}
            </select>
          </div>

          {/* =================================================
              SEMESTER
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Semester
            </label>

            <input
              type="number"
              name="semester"
              placeholder="Enter Semester"
              value={
                student.semester
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              FATHER NAME
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Father Name
            </label>

            <input
              name="fatherName"
              placeholder="Enter Father Name"
              value={
                student.fatherName
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              MOTHER NAME
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Mother Name
            </label>

            <input
              name="motherName"
              placeholder="Enter Mother Name"
              value={
                student.motherName
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              GUARDIAN CONTACT
          ================================================== */}

          <div>
            <label
              className={labelStyle}
            >
              Guardian Contact
            </label>

            <input
              name="guardianContact"
              placeholder="Enter Guardian Contact"
              value={
                student.guardianContact
              }
              onChange={
                handleChange
              }
              maxLength="10"
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              ADDRESS
          ================================================== */}

          <div className="md:col-span-2">
            <label
              className={labelStyle}
            >
              Address
            </label>

            <textarea
              name="address"
              rows="4"
              placeholder="Enter Address"
              value={
                student.address
              }
              onChange={
                handleChange
              }
              className={
                inputStyle
              }
            />
          </div>

          {/* =================================================
              DOCUMENTS
          ================================================== */}

          <div className="md:col-span-2 mt-4">

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Student Documents
            </h2>

            <p className="text-gray-500 mb-6">
              Upload student profile and
              required documents. Maximum
              file size is 10 MB per file.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* ===========================================
                  PROFILE IMAGE
              ============================================ */}

              <div className="border rounded-2xl p-5 bg-gray-50">

                <label className="font-semibold block mb-3">
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "profileImage"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.profileImage && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {getFileName(
                      documents.profileImage
                    )}
                  </p>
                )}

              </div>

              {/* ===========================================
                  AADHAAR CARD
              ============================================ */}

              <div className="border rounded-2xl p-5 bg-gray-50">

                <label className="font-semibold block mb-3">
                  Aadhaar Card
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "aadhaarCard"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.aadhaarCard && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {getFileName(
                      documents.aadhaarCard
                    )}
                  </p>
                )}

              </div>

              {/* ===========================================
                  PAN CARD
              ============================================ */}

              <div className="border rounded-2xl p-5 bg-gray-50">

                <label className="font-semibold block mb-3">
                  PAN Card
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "panCard"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.panCard && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {getFileName(
                      documents.panCard
                    )}
                  </p>
                )}

              </div>

              {/* ===========================================
                  ADDRESS PROOF
              ============================================ */}

              <div className="border rounded-2xl p-5 bg-gray-50">

                <label className="font-semibold block mb-3">
                  Address Proof
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "addressProof"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.addressProof && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {getFileName(
                      documents.addressProof
                    )}
                  </p>
                )}

              </div>

              {/* ===========================================
                  SIGNATURE
              ============================================ */}

              <div className="border rounded-2xl p-5 bg-gray-50">

                <label className="font-semibold block mb-3">
                  Signature
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "signature"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.signature && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {getFileName(
                      documents.signature
                    )}
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              SAVE BUTTON
          ================================================== */}

          <div className="md:col-span-2 mt-4">

            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 rounded-xl text-lg text-white font-semibold ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving
                ? "Saving Student..."
                : "Save Student"}
            </button>

          </div>

        </form>
      </div>

    </AdminLayout>
  );
}

export default AddStudent;
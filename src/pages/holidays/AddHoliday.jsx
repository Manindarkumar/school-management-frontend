import { useState }
  from "react";

import { useNavigate }
  from "react-router-dom";

import AdminLayout
  from "../../layouts/AdminLayout";

import apiService
  from "../../api/apiService";


function AddHoliday() {

  const navigate = useNavigate();


  const [holiday, setHoliday] =
    useState({

      holidayName: "",
      startDate: "",
      endDate: "",
      description: "",
      holidayType: "",
      status: ""

    });


  const handleChange = (e) => {

    setHoliday({

      ...holiday,

      [e.target.name]:
        e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const payload = {

        holidayName:
          holiday.holidayName,

        startDate:
          holiday.startDate,

        endDate:
          holiday.endDate,

        description:
          holiday.description,

        holidayType:
          holiday.holidayType,

        status:
          holiday.status

      };


      console.log(
        "Holiday Payload:",
        payload
      );


      const response =
        await apiService.createHoliday(
          payload
        );


      console.log(
        "Holiday Response:",
        response.data
      );


      if (
        response.data?.status === 0
      ) {

        alert(
          response.data.message ||
          "Holiday created successfully"
        );

        //navigate("/holidays");
        setHoliday({
          holidayName: "",
          startDate: "",
          endDate: "",
          description: "",
          holidayType: "",
          status: ""
        });

      } else {

        alert(
          response.data?.message ||
          "Failed to create holiday"
        );

      }

    } catch (error) {

      console.error(
        "Create Holiday Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Something went wrong while creating holiday"
      );

    }

  };


  return (

    <AdminLayout>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>


      {/* Title */}
      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Add Holiday
      </h1>


      {/* Form */}
      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-md
      ">

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* Holiday Name */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Holiday Name
            </label>

            <input
              type="text"
              name="holidayName"
              value={holiday.holidayName}
              placeholder="Enter Holiday Name"
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* Holiday Type */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Holiday Type
            </label>

            <select
              name="holidayType"
              value={holiday.holidayType}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            >

              <option value="">
                Select Type
              </option>

              <option value="NATIONAL">
                National Holiday
              </option>

              <option value="FESTIVAL">
                Festival Holiday
              </option>

              <option value="SCHOOL">
                School Holiday
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>


          {/* Start Date */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={holiday.startDate}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* End Date */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={holiday.endDate}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* Description */}
          <div className="md:col-span-2">

            <label className="
              block
              font-semibold
              mb-2
            ">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={holiday.description}
              placeholder="Enter Description"
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* Status */}
          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Status
            </label>

            <select
              name="status"
              value={holiday.status}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            >

              <option value="">
                Select Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>


          {/* Button */}
          <div className="md:col-span-2">

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Save Holiday
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}


export default AddHoliday;
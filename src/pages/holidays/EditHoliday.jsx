import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

import apiService
from "../../api/apiService";


function EditHoliday() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [holiday, setHoliday] =
    useState({

      holidayName: "",
      startDate: "",
      endDate: "",
      description: "",
      holidayType: "",
      status: ""

    });


  const [loading, setLoading] =
    useState(true);


  // =========================
  // GET HOLIDAY BY ID
  // =========================

  useEffect(() => {

    fetchHoliday();

  }, [id]);


  const fetchHoliday = async () => {

    try {

      const response =
        await apiService.getHolidayById(id);

      console.log(
        "Holiday Response:",
        response.data
      );


      if (response.data?.status === 0) {

        const data =
          response.data.data;


        setHoliday({

          holidayName:
            data.holidayName || "",

          startDate:
            data.startDate || "",

          // Backend response uses "endtDate"
          endDate:
            data.endtDate || "",

          description:
            data.description || "",

          holidayType:
            data.holidayType || "",

          status:
            data.status || ""

        });

      }

    } catch (error) {

      console.error(
        "Error fetching holiday:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to fetch holiday"
      );

      navigate(-1);

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setHoliday({

      ...holiday,

      [e.target.name]:
        e.target.value

    });

  };


  // =========================
  // UPDATE HOLIDAY
  // =========================

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
        "Update Holiday Payload:",
        payload
      );


      const response =
        await apiService.updateHoliday(
          id,
          payload
        );


      console.log(
        "Update Holiday Response:",
        response.data
      );


      if (response.data?.status === 0) {

        alert(
          response.data.message ||
          "Holiday updated successfully"
        );

        navigate("/admin/holidays");

      } else {

        alert(
          response.data?.message ||
          "Failed to update holiday"
        );

      }

    } catch (error) {

      console.error(
        "Update Holiday Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong while updating holiday"
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <AdminLayout>

        <div className="
          p-10
          text-center
          text-gray-500
        ">
          Loading holiday...
        </div>

      </AdminLayout>

    );

  }


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
        Edit Holiday
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
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>


          {/* Type */}

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

              <option value="SUMMER_VACATION">
                Summer Vacation
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
              rows="5"
              name="description"
              value={holiday.description}
              onChange={handleChange}
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
              Update Holiday
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}


export default EditHoliday;
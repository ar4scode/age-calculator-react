import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function AgeCalculator() {
  const [calculatedYears, setCalculatedYears] = useState("--");
  const [calculatedMonths, setCalculatedMonths] = useState("--");
  const [calculatedDays, setCalculatedDays] = useState("--");

  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object({
    day: Yup.number()
      .min(1, "Day must be at least one")
      .max(31, "Day cannot be more than 31")
      .required("Day is required"),
    month: Yup.number()
      .min(1, "Month must be at least one")
      .max(12, "Month cannot be more than 12")
      .required("Month is required"),
    year: Yup.number()
      .min(1900, "Year must be at least 1900")
      .max(currentYear, `Year cannot be more than ${currentYear}`)
      .required("Year is required"),
  });

  const formik = useFormik({
    initialValues: {
      day: "",
      month: "",
      year: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const birthDate = new Date(values.year, values.month - 1, values.day);
      const currentDate = new Date();

      let years = currentDate.getFullYear() - birthDate.getFullYear();
      let months = currentDate.getMonth() - birthDate.getMonth();
      let days = currentDate.getDate() - birthDate.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setCalculatedYears(years);
      setCalculatedMonths(months);
      setCalculatedDays(days);
    },
  });

  const errorStyle = {
    color: "#f00",
    margin: ".2rem .6rem",
    fontStyle: "italic",
    fontSize: ".8rem",
  };

  return (
    <> 
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-containers">
            <label style={formik.touched.day && formik.errors.day ? { color: "#e25858" } : null} htmlFor="day">DAY</label>
            <input
              type="text"
              id="day"
              name="day"
              value={formik.values.day}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="DD"
              style={formik.touched.day && formik.errors.day ? { borderColor: "#e25858" } : null}
            />
            {formik.touched.day && formik.errors.day ? (
              <div style={errorStyle}>{formik.errors.day}</div>
            ) : null}
          </div>
          <div className="input-containers">
            <label style={formik.touched.month && formik.errors.month ? { color: "#e25858" } : null} htmlFor="month">MONTH</label>
            <input
              type="text"
              name="month"
              id="month"
              value={formik.values.month}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="MM"
              style={formik.touched.month && formik.errors.month ? { borderColor: "#e25858" } : null}
            />
            {formik.touched.month && formik.errors.month ? (
              <div style={errorStyle}>{formik.errors.month}</div>
            ) : null}
          </div>
          <div className="input-containers">
            <label style={formik.touched.year && formik.errors.year ? { color: "#e25858" } : null} htmlFor="year">YEAR</label>
            <input
              type="text"
              name="year"
              id="year"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="YYYY"
              style={formik.touched.year && formik.errors.year ? { borderColor: "#e25858" } : null}
            />
            {formik.touched.year && formik.errors.year ? (
              <div style={errorStyle}>{formik.errors.year}</div>
            ) : null}
          </div>

          <button type="submit"><FontAwesomeIcon icon={faCircleDown} /></button>
        </form>

        <div className="output-container">
          <div className="year-output">
            <h1><span>{calculatedYears}</span> Years</h1>
          </div>
          <div className="month-output">
            <h1><span>{calculatedMonths}</span> Month</h1>
          </div>
          <div className="day-output">
            <h1><span>{calculatedDays}</span> Day</h1>
          </div>
        </div>
      </div>
    </>
  );
}

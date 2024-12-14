import {useFormik} from "formik"
import * as Yup from "yup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";


export default function AgeCalculator() {

  const currentYear = new Date().getFullYear()

  const validationSchema = Yup.object({
    day: Yup.number()
      .min(1, "Day must be at least one" )
      .max(31, "Day cannot be more than 31")
      .required("Day is required"),
    month: Yup.number()
      .min(1, "Month must be at least one")
      .max(12, "Month cannot be more than 12")
      .required("Month is required"),
    year: Yup.number()
      .min(1900, "Year must be at least 1900")
      .max(currentYear, `Year cannot be more than ${currentYear}`)
      .required("Year is required")
  })

  const formik = useFormik({
    initialValues: {
      day: "",
      month: "",
      year: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })
  return(
    <> 
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="day">DAY</label>
            <input
              type="text"
              id="day"
              name="day"
              value={formik.values.day}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="DD"
            />
            {formik.touched.day && formik.errors.day ? (
              <div style={{ color: "red" }}>{formik.errors.day}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="month">MONTH</label>
            <input
              type="text"
              name="month"
              id="month"
              value={formik.values.month}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="MM"
            />
            {formik.touched.month && formik.errors.month ? (
              <div style={{ color: "red" }}>{formik.errors.month}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="year">YEAR</label>
            <input
              type="text"
              name="year"
              id="year"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="YYYY"
            />
            {formik.touched.year && formik.errors.year ? (
              <div style={{ color: "red" }}>{formik.errors.year}</div>
            ) : null}
          </div>

          <button type="submit"><FontAwesomeIcon icon={faCircleDown} /></button>
        </form>
      </div>
    </>
  )
}
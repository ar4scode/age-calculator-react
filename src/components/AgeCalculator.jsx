import {useFormik} from "formik"
import * as Yup from "yup"

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
      day: 0,
      month: 0,
      year: 0
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })
  return(
    <> 
    </>
  )
}
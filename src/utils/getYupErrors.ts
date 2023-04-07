import type { FormikErrors, FormikValues } from "formik"
import { prepareDataForValidation, yupToFormErrors } from "formik"
import type { Schema, ValidateOptions } from "yup"

/**
 * Validate and get error using yup
 *
 * @param {yup.AnySchema} schema  yup schema
 * @param {any}           value   value to validate against schema
 * @param {object}        options options
 */
export async function getYupErrors<Values extends FormikValues>(
  schema: Schema,
  values: Values,
  options: ValidateOptions = {},
): Promise<void | FormikErrors<Values>> {
  try {
    const data = prepareDataForValidation(values)
    await schema.validate(data, { abortEarly: false, context: data, ...options })
    return {}
  } catch (error) {
    return yupToFormErrors(error)
  }
}

import { FormikErrors, FormikValues, prepareDataForValidation, yupToFormErrors } from "formik"
import { BaseSchema } from "yup"
import { ValidateOptions } from "yup/lib/types"

/**
 * Validate and get error using yup
 *
 * @param {yup.AnySchema} schema  yup schema
 * @param {any}           value   value to validate against schema
 * @param {object}        options options
 */
export async function getYupErrors<Values extends FormikValues>(
  schema: BaseSchema,
  values: Values,
  options: ValidateOptions = {},
): Promise<void | FormikErrors<Values>> {
  try {
    const data = prepareDataForValidation(values)
    await schema.validate(data, { abortEarly: false, context: data, ...options })
  } catch (error) {
    return yupToFormErrors(error)
  }
  return {}
}

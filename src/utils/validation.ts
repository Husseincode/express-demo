/** @format */

import Joi from 'joi';
import { ValidationSchema } from '../enum/enum';

class Validator {
  private courseSchema = Joi.object({
    course: Joi.string().min(3).required().messages({
      'string.base': 'Course must be a string',
      'string.empty': 'Course is required',
      'string.min': 'Course must be at least 3 characters',
      'any.required': 'Course field is required',
    }),
  });

  private schemaMap = {
    [ValidationSchema.CourseSchema]: this.courseSchema,
  };

  public validateInput(data: any, schemaName: ValidationSchema) {
    const schema = this.schemaMap[schemaName];
    return schema.validate(data, { abortEarly: false });
  }
}

export { ValidationSchema };
export default Validator;

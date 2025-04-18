/** @format */

import Joi from 'joi';

const validateInput = (data: { course: string }) => {
  const schema = Joi.object({
    course: Joi.string().min(3).required().messages({
      'string.base': 'Course must be a string',
      'string.empty': 'Course is required',
      'string.min': 'Course must be at least 3 characters',
      'any.required': 'Course field is required',
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

export default validateInput;

/** @format */

enum STATUS_CODES {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  NOT_SUPPORTED = 415,
}

enum ValidationSchema {
  CourseSchema = 'courseSchema',
}

export { STATUS_CODES, ValidationSchema };

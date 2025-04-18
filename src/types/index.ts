/** @format */

import { STATUS_CODES } from '../../enum';

type StatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
type payloadProps = {
  message: string;
  status: StatusCode;
  data?: any;
  details?: any;
};

export { payloadProps, StatusCode };

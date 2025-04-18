/** @format */

import { NextFunction, Request, Response } from 'express';

function authorize(req: Request, res: Response, next: NextFunction) {
  console.log('Logging...');
  next();
}

export default authorize;

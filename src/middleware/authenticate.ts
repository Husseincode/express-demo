/** @format */

import { NextFunction, Request, Response } from 'express';

function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log('Authenticating...');
  next();
}

export default authenticate;

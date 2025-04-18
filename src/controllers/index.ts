/** @format */

import { Request, Response } from 'express';
import tempDb from '../database';
import Validator, { ValidationSchema } from '../utils/validation';
import { payloadProps } from '../types';
import { STATUS_CODES } from '../../enum';
import Logger from '../utils/logger';

const instance = new Logger();
const validatorInstance = new Validator();

/** */
export const getApp = (req: Request, res: Response) => {
  res
    .status(STATUS_CODES.SUCCESS)
    .send(
      'Hey, I am currently learning backend development using express and node'
    );
};

/**
 * @getAllCourses : Gets all the courses in the database from @tempDb
 * @param req :
 * @param res
 */
export const getAllCourses = (req: Request, res: Response) => {
  res.end(JSON.stringify(tempDb));
};

export const addNewCourse = (req: Request, res: Response) => {
  //validation
  const { error } = validatorInstance.validateInput(
    { course: req.body.course },
    ValidationSchema.CourseSchema
  );
  if (error) {
    const payload: payloadProps = {
      message: 'Validation failed',
      details: error.details.map((detail) => detail.message),
      status: STATUS_CODES.BAD_REQUEST,
    };
    res.status(STATUS_CODES.BAD_REQUEST).send(payload);
  }
  const newCourse = {
    id: tempDb.length + 1,
    course: req.body.course,
  };

  tempDb.push(newCourse);
  const payload: payloadProps = {
    message: 'New course added',
    data: newCourse,
    status: STATUS_CODES.SUCCESS,
  };
  return res.status(STATUS_CODES.SUCCESS).send(payload);
};

export const updateCourse = (req: Request, res: Response) => {
  const paramsID = parseInt(req.params.id);
  const courseExists = tempDb.find(({ id }) => id === paramsID);
  console.log(courseExists);

  if (!courseExists) {
    const payload: payloadProps = {
      message: 'Course not found',
      status: STATUS_CODES.NOT_FOUND,
    };
    return res.status(STATUS_CODES.NOT_FOUND).send(payload);
  }
  //validation
  const { error } = validatorInstance.validateInput(
    { course: req.body.course },
    ValidationSchema.CourseSchema
  );
  if (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      message: 'Validation failed',
      details: error.details.map((detail) => detail.message),
    });
  }
  courseExists.course = req.body.course;
  return res
    .status(STATUS_CODES.SUCCESS)
    .send({ message: 'success', status: STATUS_CODES.SUCCESS });
};

export const deleteCourse = (req: Request, res: Response) => {
  const paramsID = parseInt(req.params.id);
  /**
   * check if id exists in the database
   */
  const courseExists = tempDb.some(({ id }) => id === paramsID);
  if (!courseExists)
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ message: 'Course not found' });

  /**delete course */
  const index = tempDb.findIndex(({ id }) => id === paramsID);
  tempDb.splice(index, 1);
  return res
    .status(STATUS_CODES.SUCCESS)
    .send({ message: 'Course deleted', status: STATUS_CODES.SUCCESS });
};

export const getLoggerSample = (req: Request, res: Response) => {
  const message = req.body.message;
  instance.log(message, { id: 1, content: 'message has been logged' });

  instance.on('messageLogged', (args) => {
    console.log(args);
    res.send(JSON.stringify(args));
  });
};

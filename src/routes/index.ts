/** @format */

import express from 'express';
import {
  addNewCourse,
  deleteCourse,
  getAllCourses,
  getApp,
  getLoggerSample,
  updateCourse,
} from '../controllers';

const router = express.Router();

/**
 * Home Page
 */
router.get('/', getApp);

/**
 * get all data
 */

router.get('/courses', getAllCourses);

/**
 * Add new course
 */
router.post('/addNewCourse', addNewCourse);

/**
 * Update bew course
 */
router.put('/updateCourse/:id', updateCourse);

/**
 * delete course
 */
router.delete('/deleteCourse/:id', deleteCourse);

/**
 * get logger sample
 */
router.get('/loggerSample', getLoggerSample);

export default router;

import express from 'express';
import { applicationController } from '../../controllers';
import auth from '../../middlewares/auth';

const router = express.Router();

router.put(
  '/:id/expert-approved',
  auth('manageApplications'),
  applicationController.changeApplicationStatus
);

export default router;

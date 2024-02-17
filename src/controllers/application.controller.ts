import { ApplicationStatus, ApplicationType, User } from '@prisma/client';
import httpStatus from 'http-status';
import { userService } from '../services';
import applicationService from '../services/application.service';
import catchAsync from '../utils/catchAsync';

const changeApplicationStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user as User;

  const approvedApplication = await applicationService.changeApplicationStatus(
    Number(id),
    status,
    user.id
  );

  if (
    approvedApplication.type === ApplicationType.EXPERT &&
    approvedApplication.status === ApplicationStatus.APPROVED
  ) {
    const profile = {
      certImage: approvedApplication.image,
      description: approvedApplication.description
    };

    await userService.createExpertProfile(approvedApplication.userId, profile);
  }

  res.status(httpStatus.OK).send({
    application: approvedApplication
  });
});

export default {
  changeApplicationStatus
};

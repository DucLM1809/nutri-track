import { ApplicationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

const changeApplicationStatus = async (id: number, status: ApplicationStatus, userId: number) => {
  try {
    return await prisma.applications.update({
      where: {
        id
      },
      data: {
        status,
        approvedById: userId
      }
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Application not found');
  }
};

export default {
  changeApplicationStatus
};

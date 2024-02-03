import httpStatus from 'http-status';
import prisma from '../client';
import { CreateBmiRecord } from '../types/bmi';
import ApiError from '../utils/ApiError';

const createBmiRecord = async (userId: number, bmiRecord: CreateBmiRecord) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return prisma.bmiRecords.create({
    data: {
      ...bmiRecord,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
};

export default {
  createBmiRecord
};

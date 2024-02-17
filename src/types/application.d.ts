import { ApplicationStatus, ApplicationType } from '@prisma/client';

export interface CreateApplication {
  status: ApplicationStatus;
  type: ApplicationType;
  image: string;
  description: string;
}

export interface ExpertApplication {
  image: string;
  description: string;
}

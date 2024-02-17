export interface CreateUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
  dob: Date;
  description?: string;
}

export interface ExpertProfile {
  certImage: string;
  description: string;
}

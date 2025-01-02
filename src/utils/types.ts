export interface User {
  firstname: string;
  lastName: string;
  username: string;
  emailAddress: string;
  password: string;
}

export interface UserProfile {
  userId: number;
  occupation: string;
  phoneNumber: string;
  photoUrl?: string;
  dateOfBirth?: Date;
  location?: string;
  education?: {
    degree?: string;
    major?: string;
    graduationYear?: number;
    stillInSchool: boolean;
    institution: string;
    location: string;
  };
  workExperience: Array<{
    jobTitle?: string;
    company?: string;
    startDate?: Date;
    endDate?: Date;
    stillWorkingHere?: boolean;
    location?: string;
  }>;
  yearsOfExperience?: number;
  twitterLink?: string;
  githubLink?: string;
  websiteLink?: string;
}

export interface Post {
  title: string;
  content: string;
  //   userId: number | string;
  //   createdBy: number | string;
}

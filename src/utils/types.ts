import { Dispatch, SetStateAction } from "react";

export interface UserProfile {
  id?: string; // Add an optional ID field if needed.
  occupation: string; // Required string.
  phoneNumber: string; // Required string.
  profilePhoto: File; // Should match `z.instanceof(File)` from the schema.
  photoUrl: string;
  dateOfBirth?: Date; // Optional date.
  location?: string; // Optional string.
  education?: {
    degree?: string; // Optional string.
    major?: string; // Optional string.
    graduationYear?: number; // Optional integer.
    stillInSchool?: boolean; // Optional boolean.
    institution?: string; // Optional string.
    location?: string; // Optional string.
  };
  workExperience?: Array<{
    jobTitle?: string; // Optional string.
    company?: string; // Optional string.
    startDate?: Date; // Optional date.
    endDate?: Date; // Optional date.
    stillWorkingHere?: boolean; // Optional boolean.
    location?: string; // Optional string.
  } | undefined>;
  socialLinks?: {
    websiteLink?: string; // Optional string matching `url` format and starting with `https://`.
    twitterLink?: string; // Optional string matching `url` format and starting with `https://x.com/`.
    githubLink: string; // Required string matching `url` format and starting with `https://github.com/`.
  };
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  profile?: UserProfile;
}

export interface LoginCredentials {
  emailAddress: string;
  password: string;
}



export interface Post {
  title: string;
  content: string;
  //   userId: number | string;
  //   createdBy: number | string;
}

export interface ProfileCardProps {
  profile: string | null;
}

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export interface Developer extends User {
  id: string;
  profile?: UserProfile;
}

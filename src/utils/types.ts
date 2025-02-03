import { Dispatch, SetStateAction } from "react";

export interface UserProfile {
  id?: string;
  occupation: string;
  phoneNumber: string;
  profilePhoto: File;
  photoUrl: string;
  dateOfBirth?: Date;
  location?: string;
  education?: {
    degree?: string;
    major?: string;
    graduationYear?: number;
    stillInSchool?: boolean;
    institution?: string;
    location?: string;
  };
  workExperience?: Array<
    | {
        jobTitle?: string;
        company?: string;
        startDate?: Date;
        endDate?: Date;
        stillWorkingHere?: boolean;
        location?: string;
      }
    | undefined
  >;
  socialLinks?: {
    websiteLink?: string;
    twitterLink?: string;
    githubLink: string;
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
  _id?: string;
  title: string;
  content: string;
  userId: string;
  likes: number;
  createdBy: Developer;
  createdAt: Date;
}

export interface PostComment {
  _id?: string;
  postId: string;
  commentedBy: Developer;
  content: string;
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

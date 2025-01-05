import { z } from "zod";

export const loginSchema = z.object({
  emailAddress: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string(),
});

export const userSchema = z
  .object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    username: z.string().min(3).max(20),
    emailAddress: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userProfileSchema = z.object({
  occupation: z.string(),
  phoneNumber: z.string(),
  photoUrl: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
  location: z.string().optional(),
  education: z
    .object({
      degree: z.string(),
      major: z.string(),
      graduationYear: z.number().int(),
      stillInSchool: z.boolean(),
      institution: z.string(),
      location: z.string().optional(),
    })
    .optional(),
  workExperience: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string(),
      startDate: z.string().date(),
      endDate: z.string().date().optional(),
      //   achievements: z.array(z.string()),
      //   responsibilities: z.array(z.string()),
      location: z.string().optional(),
    })
  ),
  websiteLink: z.string().url().startsWith("https://").optional(),
  twitterLink: z.string().url().startsWith("https://x.com/").optional(),
  githubLink: z.string().url().startsWith("https://github.com/").optional(),
  //   hobbies: z.array(z.string()),
  //   interests: z.array(z.string()),
  //   skills: z.array(z.string()),
});

export const postSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(5).max(1000),
  //   createdBy: z.string(),
  //   comments: z.array(
  //     z.object({
  //       id: z.string(),
  //       author: z.string(),
  //       content: z.string(),
  //       createdAt: z.string().date(),
  //     })
  //   ),
});

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

const MAX_FILE_SIZE = 2 * 1000 * 1000;
const ACCEPTED_IMAGE_TYPES = ["png", "jpeg", "jpg"];

export const userProfileSchema = z
  .object({
    occupation: z.string(),
    phoneNumber: z.string(),
    photo: z.instanceof(File, {
      message: "Please Upload a Photo",
    }),
    dateOfBirth: z.string().date().optional(),
    location: z.string().optional(),
    education: z
      .object({
        degree: z.string().optional(),
        major: z.string().optional(),
        graduationYear: z.number().int().optional(),
        stillInSchool: z.boolean().optional(),
        institution: z.string().optional(),
        location: z.string().optional(),
      })
      .optional(),
    workExperience: z.array(
      z
        .object({
          jobTitle: z.string().optional(),
          company: z.string().optional(),
          startDate: z.string().date().optional(),
          endDate: z.string().date().optional(),
          //   achievements: z.array(z.string()),
          //   responsibilities: z.array(z.string()),
          location: z.string().optional(),
        })
        .optional()
    ),
    socialLinks: z
      .object({
        websiteLink: z
          .string()
          .url()
          .startsWith("https://", {
            message: "Invalid link format",
          })
          .optional(),
        twitterLink: z
          .string()
          .url()
          .startsWith("https://x.com/", {
            message: "Invalid link format",
          })
          .optional(),
        githubLink: z
          .string({
            message: "Provide a Github Link",
          })
          .url()
          .startsWith("https://github.com/", {
            message: "Invalid link format",
          }),
      })
      .optional(),
    //   hobbies: z.array(z.string()),
    //   interests: z.array(z.string()),
    //   skills: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    const photo = data.photo;

    if (photo.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photo"],
        message: "Photo size should not exceed 2MB",
      });
      return false;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(photo.type.split("/")[1])) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photo"],
        message: "Allowed types are: jpeg, jpg and png",
      });
      return false;
    }

    return true;
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

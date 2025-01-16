import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userProfileSchema } from "@/utils/zodSchema";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RequiredText from "@/components/ui/RequiredText";
import { PlusCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import useUserProfile from "./user-profile.hooks";

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

const UserProfileForm = () => {
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoUploading, setPhotoUploading] = useState<boolean>(false);
  const [photoName, setPhotoName] = useState<string>("");

  const { createUserProfile, saving } = useUserProfile();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const handlePhotoUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUploading(true);
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      setPhotoUploading(false);
      return;
    }

    const file = e.target.files[0];
    setValue("profilePhoto", file, { shouldValidate: true });
    const result = URL.createObjectURL(file);
    setPhotoName(file.name);
    setPhotoUrl(result);
    setPhotoUploading(false);
  };

  const onSubmit = (data: UserProfileFormValues) => {
    console.log(data);
    const formData = new FormData();

    // Add profile photo to form data
    formData.append("profilePhoto", data.profilePhoto);

    // Append all text fields
    formData.append("occupation", data.occupation);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("dateOfBirth", data.dateOfBirth?.toString() || "");
    formData.append("location", data.location || "");

    // Add other form data
    if (data.education) {
      formData.append("education", JSON.stringify(data.education));
    }
    if (data.socialLinks) {
      formData.append("socialLinks", JSON.stringify(data.socialLinks));
    }

    // Append work experience array
    if (data.workExperience) {
      formData.append("workExperience", JSON.stringify(data.workExperience));
    }

    createUserProfile(formData);
  };

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mx-auto mb-4">
          <div className="flex items-center justify-center">
            <img
              src="/git_connect_logo.png"
              alt="Git Connect"
              className="h-8 w-auto"
            />
          </div>
          <div className="font-bold text-[#f65a11]">Git Connect</div>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Your Profile
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Occupation */}
          <div>
            <label className="font-medium text-gray-700 flex">
              Occupation
              <RequiredText />
            </label>
            <Input
              type="text"
              {...register("occupation")}
              className="mt-1 block w-full p-2 border border-gray-200 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
            />
            {errors.occupation && (
              <p className="text-sm text-red-500">
                {errors.occupation.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium text-gray-700">
              Phone Number
              <RequiredText />
            </label>
            <Input
              type="tel"
              {...register("phoneNumber")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block font-medium text-gray-700">
              Profile Photo
              <RequiredText />
            </label>
            <Input
              type="file"
              placeholder={photoName}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12 cursor-pointer"
              onChange={(e) => handlePhotoUploaded(e)}
            />
            {errors.profilePhoto && (
              <p className="text-sm text-red-500">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>

          {/* Preview of the image */}
          {photoUploading ? (
            <div className="flex items-center justify-center">
              <span className="text-gray-500">Uploading photo...</span>
              <LoaderCircle />
            </div>
          ) : photoUrl ? (
            <div className="mt-12">
              <label className="block font-medium text-gray-700">Preview</label>
              <div className="flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt="Profile Photo"
                  className="h-36 w-36 rounded-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-gray-500">No photo uploaded</span>
            </div>
          )}

          {/* Date of Birth */}
          <div>
            <label className="block font-medium text-gray-700">
              Date of Birth
            </label>
            <Input
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <Input
              type="text"
              {...register("location")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Education */}
          <fieldset className="border border-gray-300 rounded p-4">
            <legend className="font-medium text-gray-700">Education</legend>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Degree
                </label>
                <Input
                  type="text"
                  {...register("education.degree")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Major</label>
                <Input
                  type="text"
                  {...register("education.major")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Institution
                </label>
                <Input
                  type="text"
                  {...register("education.institution")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
                />
              </div>
            </div>
          </fieldset>

          {/* Work Experience */}
          <fieldset className="border border-gray-300 rounded p-4">
            <legend className="font-medium text-gray-700">
              Work Experience
            </legend>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">
                    Job Title
                  </label>
                  <Input
                    type="text"
                    {...register(`workExperience.${index}.jobTitle`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">
                    Company
                  </label>
                  <Input
                    type="text"
                    {...register(`workExperience.${index}.company`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 underline"
                  >
                    Remove Work Experience
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() =>
                  append({
                    jobTitle: "",
                    company: "",
                    startDate: undefined,
                    location: "",
                    endDate: undefined,
                    stillWorkingHere: false,
                  })
                }
                className="flex rounded text-white bg-[#22331D] mt-2 gap-x-2 px-2 py-1"
              >
                <div>
                  <PlusCircle />
                </div>
                Add Work Experience
              </button>
            </div>
          </fieldset>

          {/* Social Links */}
          <div>
            <label className="block font-medium text-gray-700">
              GitHub Link
              <RequiredText />
            </label>
            <Input
              type="url"
              {...register("socialLinks.githubLink")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-[#568a46] focus:border-[#568a46] h-12"
            />

            {errors.socialLinks?.githubLink && (
              <p className="text-sm text-red-500">
                {errors.socialLinks.githubLink.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-50 bg-[#f65a11] text-white font-bold p-2 rounded hover:bg-gray-700"
              disabled={saving ? true : false}
            >
              {saving ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;

"use server";

import { createFileUploadSchema } from "@/schemas/file-upload.schemas";
import { cookieBasedClient, getAuthUserDetails } from "@/utils/amplify.server";
import { redirect } from "next/navigation";

export interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
}

export async function createImageRecord(
  prevState: FormState,
  formData: FormData,
) {
  const rawInput = {
    fileName: formData.get("image-uploaded"),
    fileSummary: formData.get("file-summary"),
  };
  console.dir({ rawInput }, { depth: null });
  const parsedData = createFileUploadSchema.safeParse(rawInput);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Validation failed. Please correct the errors and try again.",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const authDetails = await getAuthUserDetails();
    if (!authDetails?.authUser?.username) {
      return {
        success: false,
        message: "You must be logged in to submit the form.",
        errors: {
          general: ["Authentication required. Please log in and try again."],
        },
      };
    }
    const authorName = authDetails?.authUser?.signInDetails?.loginId!;
    const newRecord = await cookieBasedClient.models.FileUpload.create({
      author: authorName,
      userId: authDetails?.authUser?.userId,
      fileName: parsedData.data.fileName,
      fileSummary: parsedData.data.fileSummary,
    });
    console.dir({ newRecord }, { depth: null });
  } catch (err) {
    console.log("Error creating image record:", err);
    return {
      success: false,
      message:
        "An error occurred while creating the image record. Please try again.",
      errors: {
        general: ["An unexpected error occurred. Please try again later."],
      },
    };
  }

  redirect("/ai-gallery");
}

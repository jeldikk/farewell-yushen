"use server";

import { createYushenFeedbackSchema } from "@/schemas/yushen-feedback.schema";
import { cookieBasedClient, getAuthUserDetails } from "@/utils/amplify.server";
import { YUSHEN_FEEDBACK_QUESTIONS } from "@/utils/questions.utils";
import { redirect } from "next/navigation";

export interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
}

export async function createYushenFeedbackRecords(
  prevState: FormState,
  formData: FormData,
) {
  console.log("Received form data for Yushen feedback:");
  const rawInput = {
    workingWithOffshore: formData.get("working-with-offshore"),
    missingOffshoreTeam: formData.get("missing-offshore-team"),
    aboutTributeWebsite: formData.get("about-tribute-website"),
    mostMemorableMoment: formData.get("most-memorable-moment"),
    sayToOffshoreBeforeLeaving: formData.get("say-to-offshore-before-leaving"),
  };

  console.dir({ rawInput }, { depth: null });

  const parsedData = createYushenFeedbackSchema.safeParse(rawInput);
  console.log("Parsed data result:", parsedData);
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
        message: "You must be logged in to submit your feedback.",
        errors: {
          general: ["Authentication required. Please log in and try again."],
        },
      };
    }
    const existingRecords = await cookieBasedClient.models.Questionaire.list({
      filter: {
        userId: { eq: authDetails?.authUser?.userId },
      },
    });
    const existingRecordMap = existingRecords.data.reduce(
      (acc, record) => {
        acc[record.questionKey] = record;
        return acc;
      },
      {
        workingWithOffshore: null,
        missingOffshoreTeam: null,
        aboutTributeWebsite: null,
        mostMemorableMoment: null,
        sayToOffshoreBeforeLeaving: null,
      } as Record<string, any>,
    );
    const author = authDetails?.authUser?.userId;
    const authorName = authDetails?.authUser?.signInDetails?.loginId!;
    const promiseList = Object.keys(parsedData.data).map((key) => {
      if (existingRecordMap[key]) {
        return cookieBasedClient.models.Questionaire.update({
          id: existingRecordMap[key].id,
          questionKey: key,
          question:
            YUSHEN_FEEDBACK_QUESTIONS[
              key as keyof typeof YUSHEN_FEEDBACK_QUESTIONS
            ],
          answer: parsedData.data[key as keyof typeof parsedData.data],
        });
      }
      return cookieBasedClient.models.Questionaire.create({
        userId: author,
        author: authorName,
        questionKey: key,
        question:
          YUSHEN_FEEDBACK_QUESTIONS[
            key as keyof typeof YUSHEN_FEEDBACK_QUESTIONS
          ],
        answer: parsedData.data[key as keyof typeof parsedData.data],
      });
    });
    const response = await Promise.all(promiseList);
  } catch (err) {
    console.error("Error saving Yushen feedback records:", err);
    return {
      success: false,
      message:
        "An error occurred while saving your answers. Please try again later.",
      errors: {
        general: ["Failed to save data. Please try again later."],
      },
    };
  }

  redirect("/yushen-feedback");
}

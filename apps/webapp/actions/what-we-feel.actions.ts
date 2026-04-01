"use server";

import { createWhatWeFeelSchema } from "@/schemas/what-we-feel.schemas";
import {
  cookieBasedClient,
  getAuthUserDetails,
  isAuthenticated,
} from "@/utils/amplify.server";
import { QUESTIONAIRE_QUESTIONS } from "@/utils/questions.utils";

import { redirect } from "next/navigation";

export interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
}

export async function createWhatWeFeelRecords(
  prevState: FormState,
  formData: FormData,
) {
  const rawInput = {
    firstImpression: formData.get("first-impression"),
    mostMemorableMoment: formData.get("most-memorable-moment"),
    feelingOnLeavingNews: formData.get("feeling-on-leaving-news"),
    bestCompliment: formData.get("best-compliment"),
    whatWouldYouMiss: formData.get("what-would-you-miss"),
    messageToYushen: formData.get("message-to-yushen"),
  };

  const parsedData = createWhatWeFeelSchema.safeParse(rawInput);

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
        message: "You must be logged in to submit your answers.",
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
        firstImpression: null,
        mostMemorableMoment: null,
        feelingOnLeavingNews: null,
        bestCompliment: null,
        whatWouldYouMiss: null,
        messageToYushen: null,
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
            QUESTIONAIRE_QUESTIONS[key as keyof typeof QUESTIONAIRE_QUESTIONS],
          answer: parsedData.data[key as keyof typeof parsedData.data],
        });
      }
      return cookieBasedClient.models.Questionaire.create({
        userId: author,
        author: authorName,
        questionKey: key,
        question:
          QUESTIONAIRE_QUESTIONS[key as keyof typeof QUESTIONAIRE_QUESTIONS],
        answer: parsedData.data[key as keyof typeof parsedData.data],
      });
    });
    const response = await Promise.all(promiseList);

    console.dir({ response }, { depth: null });
  } catch (err) {
    console.error("Error saving What We Feel records:", err);
    return {
      success: false,
      message:
        "An error occurred while saving your answers. Please try again later.",
      errors: {
        general: ["Failed to save data. Please try again later."],
      },
    };
  }

  redirect("/admin");
}

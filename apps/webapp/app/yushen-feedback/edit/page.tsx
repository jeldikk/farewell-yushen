import YushenFeedbackForm from "@/components/yushen-feedback-form/yushen-feedback-form.component";
import { cookieBasedClient, getAuthUserDetails } from "@/utils/amplify.server";

export default async function YushenFeedbackEditPage() {
  const authDetails = await getAuthUserDetails();
  const isYushen =
    authDetails?.authUser?.signInDetails?.loginId === "yushen@thankyou.com";

  if (!isYushen) {
    return (
      <div className="flex w-full items-center justify-center">
        <h2 className="text-4xl font-bold p-4">
          You are not authorized to edit Yushen's feedback.
        </h2>
      </div>
    );
  }

  if (!authDetails.authUser) {
    return (
      <div className="flex w-full items-center justify-center">
        <h2 className="text-4xl font-bold p-4">
          Please login to edit Yushen's feedback.
        </h2>
      </div>
    );
  }

  const answerRecords = await cookieBasedClient.models.Questionaire.list({
    filter: {
      author: {
        eq: "yushen@thankyou.com",
      },
    },
  });

  const currentRecordsMap = answerRecords.data.reduce(
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
  return (
    <div className="flex w-full items-center justify-center">
      <YushenFeedbackForm currentRecords={currentRecordsMap} />
    </div>
  );
}

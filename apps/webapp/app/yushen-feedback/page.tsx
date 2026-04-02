import QuestionAnswer from "@/components/what-we-feel/question-answer.component";
import { cookieBasedClient, getAuthUserDetails } from "@/utils/amplify.server";
import Link from "next/link";

export default async function YushenFeedbackPage() {
  const authDetails = await getAuthUserDetails();

  if (!authDetails.authUser) {
    return (
      <div className="flex w-full items-center justify-center">
        <h2 className="text-4xl font-bold p-4">
          Please login to view Yushen's feedback.
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

  return (
    <div>
      {authDetails.authUser?.signInDetails?.loginId?.split("@")[0] ===
        "yushen" && (
        <div className="flex justify-end my-2">
          <Link
            href="/yushen-feedback/edit"
            className="btn btn-primary btn-lg gap-2 shadow-lg"
          >
            {answerRecords.data.length === 0
              ? "Submit Feedback"
              : "Edit Feedback"}
          </Link>
        </div>
      )}

      {answerRecords.data.length === 0 ? (
        <div className="flex w-full items-center justify-center">
          <h2 className="text-4xl font-bold p-4">
            Yushen has not submitted her feedback yet.
          </h2>
        </div>
      ) : (
        <div className="max-w-full">
          {answerRecords.data.map((record) => (
            <QuestionAnswer key={record.id} item={record} />
          ))}
        </div>
      )}
    </div>
  );
}

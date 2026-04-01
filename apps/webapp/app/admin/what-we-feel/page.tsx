import CreateFeelingsForm from "@/components/what-we-feel/what-we-feel-form.component";
import { cookieBasedClient, getAuthUserDetails } from "@/utils/amplify.server";
import { Schema } from "@/data-schema";

export default async function AdminWhatWeFeelPage() {
  const authDetails = await getAuthUserDetails();
  console.log({ authDetails }, { depth: null });
  const currentRecords = await cookieBasedClient.models.Questionaire.list({
    filter: {
      userId: { eq: authDetails?.authUser?.userId },
    },
  });
  console.dir({ currentRecords }, { depth: null });
  const currentRecordMap = currentRecords.data.reduce(
    (acc, record) => {
      console.dir({ record }, { depth: null });
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
    } as Record<string, Schema["Questionaire"]["type"] | null>,
  );

  console.dir({ currentRecordMap }, { depth: null });
  return (
    <div className="max-w-11/12 mx-auto h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        Answer the following questions to share with Yushen.
      </h1>
      <div>
        <CreateFeelingsForm currentRecords={currentRecordMap} />
      </div>
    </div>
  );
}

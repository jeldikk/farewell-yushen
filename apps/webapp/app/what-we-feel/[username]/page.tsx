import QuestionAnswer from "@/components/what-we-feel/question-answer.component";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function IndividualWhatWeFeelPage(props: Props) {
  const { params } = props;
  const { username } = await params;
  console.log({ username });
  if (
    !["ambuj", "amit", "hardik", "kathir", "kamal", "krishna"].includes(
      username,
    )
  ) {
    notFound();
  }
  let authMode: "userPool" | "iam" = "iam";
  const authenticated = await isAuthenticated();
  if (authenticated) {
    authMode = "userPool";
  }
  const answerRecords = await cookieBasedClient.models.Questionaire.list({
    filter: {
      author: { eq: `${username}@offshore.com` },
    },
    authMode,
  });

  console.dir({ answerRecords }, { depth: null });

  if (answerRecords.data.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h2 className="text-4xl font-bold p-4">
          {username} has not submitted their answers yet.
        </h2>
      </div>
    );
  }
  return (
    <div className="max-w-full">
      <h2 className="text-4xl font-bold p-4">
        Here's what {username} answered
      </h2>

      {answerRecords.data.map((record) => (
        <QuestionAnswer key={record.id} item={record} />
      ))}
    </div>
  );
}

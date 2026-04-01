import { a } from "@aws-amplify/backend";

export const questionaireSchema = a.schema({
  Questionaire: a
    .model({
      userId: a.string().required(),
      author: a.string().required().default(null),
      fileName: a.string().required(),
      fileSummary: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["update", "create", "list", "get"]),
    ]),
});

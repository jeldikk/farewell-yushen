import { a } from "@aws-amplify/backend";

export const questionaireSchema = a.schema({
  Questionaire: a
    .model({
      userId: a.string().required(),
      author: a.string().required().default(null),
      questionKey: a.string().required(),
      question: a.string().required(),
      answer: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["get", "list"]),
      allow.authenticated().to(["update", "create", "list", "get"]),
    ]),
});

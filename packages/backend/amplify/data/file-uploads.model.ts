import { a } from "@aws-amplify/backend";

export const fileUploadSchema = a.schema({
  FileUpload: a
    .model({
      userId: a.string().required(),
      author: a.string().required().default(null),
      fileName: a.string().required(),
      fileSummary: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["get", "list"]),
      allow.authenticated().to(["update", "create", "list", "get"]),
    ]),
});

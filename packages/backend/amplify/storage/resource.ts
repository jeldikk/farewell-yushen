import { defineStorage } from "@aws-amplify/backend";

export const publicBucket = defineStorage({
  name: "yushen-public",
  access: (allow) => ({
    "public/images/*": [
      allow.guest.to(["get", "list"]),
      allow.authenticated.to(["delete", "write", "read"]),
    ],
  }),
});

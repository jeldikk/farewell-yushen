import { defineStorage } from "@aws-amplify/backend";

export const publicBucket = defineStorage({
  name: "yushen-public",
  access: (allow) => ({
    "public/images/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["delete", "write", "read"]),
    ],
  }),
});

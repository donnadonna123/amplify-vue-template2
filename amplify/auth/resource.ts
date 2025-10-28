// amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true, // Keep email as the login mechanism
  },
  accountRecovery: 'EMAIL_ONLY', // or 'PHONE_AND_EMAIL',
  userAttributes: {
    birthdate: { mutable: true, required: false },
    email: { mutable: true, required: true },
    familyName: { mutable: true, required: false },
    gender: { mutable: true, required: false },
    givenName: { mutable: true, required: false },
    phoneNumber: { mutable: true, required: false },
    profilePicture: { mutable: true, required: false }, // Maps to 'picture'
    "custom:country": {
      dataType: "String",
      mutable: true,
      maxLen: 50,
      minLen: 1,
    },
    "custom:state": {
      dataType: "String",
      mutable: true,
      maxLen: 50,
      minLen: 1,
    },
  },
});
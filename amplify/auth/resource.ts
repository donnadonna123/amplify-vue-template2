// amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true, // Keep email as the login mechanism
  },
  userAttributes: {
    email: {
      required: true, // Email is required (aligned with loginWith)
    },
    phone_number: {
      required: false, // Optional attribute
    },
    given_name: {
      required: false, // Optional first name
    },
    family_name: {
      required: false, // Optional last name
    },
  },
});
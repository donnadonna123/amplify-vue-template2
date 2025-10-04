// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see {@link https://docs.amplify.aws/gen2/build-a-backend/auth/} for more details
 */
export const auth = defineAuth({
  loginWith: {
    email: true, // Enables email + password as the only sign-in method
  },
  userAttributes: {
    email: {
      required: true, // Required for sign-up
      mutable: false, // Cannot be changed after sign-up
    },
    phoneNumber: { // Use camelCase for TypeScript compatibility
      required: false, // Optional for sign-up
      mutable: true, // Can be updated later
    },
    givenName: {
      required: true, // Required for sign-up
      mutable: true, // Can be updated later
    },
    familyName: {
      required: true, // Required for sign-up
      mutable: true, // Can be updated later
    },
  },
});
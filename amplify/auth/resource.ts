// amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true, // Keep email as the login mechanism
  },
 userAttributes: {
    
    // Maps to Cognito standard attribute 'birthdate'
    birthdate: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'email'
    email: {
      mutable: true,
      required: true,
    },
    // Maps to Cognito standard attribute 'family_name'
    familyName: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'gender'
    gender: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'given_name'
    givenName: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'locale'
    locale: {
      mutable: true,
      required: false,
    },
    
    // Maps to Cognito standard attribute 'phone_number'
    phoneNumber: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'picture'
    profilePicture: {
      mutable: true,
      required: false,
    },
    
  },
});
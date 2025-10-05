<template>
  <div>
    <h1>Login Page</h1>
    <authenticator
      :sign-up-attributes="[
        'given_name',
        'family_name',
        'phone_number',
        'birthdate',
        'gender',
        'locale',
        'picture'
      ]"
      :form-fields="formFields"
    >
      <template v-slot="{ signOut }">
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

// Define the type for formFields to avoid missing type error
interface FormFieldConfig {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  order?: number;
  type?: string;
  options?: { label: string; value: string }[];
  inputProps?: Record<string, any>;
}

interface FormFieldsConfig {
  signUp?: Record<string, FormFieldConfig>;
}

// Define custom form fields for the sign-up form
const formFields: FormFieldsConfig = {
  signUp: {
    given_name: {
      label: 'First Name',
      placeholder: 'Enter your first name',
      isRequired: false,
      order: 1,
    },
    family_name: {
      label: 'Last Name',
      placeholder: 'Enter your last name',
      isRequired: false,
      order: 2,
    },
    phone_number: {
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      isRequired: false,
      order: 3,
    },
    birthdate: {
      label: 'Birthdate',
      placeholder: 'Enter your birthdate (YYYY-MM-DD)',
      isRequired: false,
      order: 4,
    },
    gender: {
      label: 'Gender',
      placeholder: 'Select your gender',
      isRequired: false,
      order: 5,
      type: 'select',
      options: [
        { label: 'Select Gender', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    locale: {
      label: 'Locale',
      placeholder: 'e.g., en-US',
      isRequired: false,
      order: 6,
    },
    picture: {
      label: 'Profile Picture URL',
      placeholder: 'Enter image URL',
      type: 'url',
      isRequired: false,
      order: 7,
    },
  },
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

.amplify-field {
  margin-bottom: 1rem;
}

.amplify-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.amplify-input,
.amplify-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
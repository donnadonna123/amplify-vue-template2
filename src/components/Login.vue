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
        'picture',
        'custom:country',
        'custom:state'
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

// Define custom TypeScript interfaces to avoid FormFields type error
interface FormFieldConfig {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  order?: number;
  type?: string;
  options?: { label: string; value: string }[];
  inputProps?: Record<string, any>;
  value?: string;
}

interface FormFieldsConfig {
  signUp?: Record<string, FormFieldConfig>;
}

// Prepopulated options for state (all US states + DC)
const stateOptions = [
  { label: 'Select State', value: '' },
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

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
      ],
    },
    'custom:country': {
      label: 'Country',
      isRequired: false,
      order: 6,
      type: 'hidden',
      value: 'USA',
    },
    'custom:state': {
      label: 'State',
      placeholder: 'Select your state',
      isRequired: false,
      order: 7,
      type: 'select',
      options: stateOptions,
    },
    picture: {
      label: 'Profile Picture URL',
      placeholder: 'Enter image URL',
      type: 'url',
      isRequired: false,
      order: 8,
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
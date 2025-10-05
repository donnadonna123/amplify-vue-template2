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
      <template v-slot:sign-up-form-fields="{ fields, updateForm }">
        <!-- Default fields (email, password, etc.) -->
        <template v-for="field in fields" :key="field.name">
          <div v-if="field.name !== 'gender' && field.name !== 'custom:country' && field.name !== 'custom:state'" class="form-field">
            <label :for="field.name">{{ field.label }}</label>
            <input
              :id="field.name"
              :type="field.type"
              :value="field.value"
              :placeholder="field.placeholder"
              :required="field.isRequired"
              @input="updateForm({ name: field.name, value: ($event.target as HTMLInputElement).value })"
            />
          </div>
        </template>
        <!-- Custom dropdowns for gender, country, state -->
        <div class="form-field">
          <label for="gender">Gender</label>
          <select id="gender" @change="updateForm({ name: 'gender', value: ($event.target as HTMLSelectElement).value })">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-field">
          <label for="custom:country">Country</label>
          <select id="custom:country" @change="updateForm({ name: 'custom:country', value: ($event.target as HTMLSelectElement).value })">
            <option value="">Select Country</option>
            <option value="USA" selected>United States</option>
          </select>
        </div>
        <div class="form-field">
          <label for="custom:state">State</label>
          <select id="custom:state" @change="updateForm({ name: 'custom:state', value: ($event.target as HTMLSelectElement).value })">
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </template>
      <template v-slot="{ user: authUser, signOut }">
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Authenticator } from '@aws-amplify/ui-vue';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
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

// Prepopulated options for gender, country, and state
const genderOptions = [
  { label: 'Select Gender', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const countryOptions = [
  { label: 'Select Country', value: '' },
  { label: 'United States', value: 'USA' },
];

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
      options: genderOptions,
      inputProps: { type: 'select' },
    },
    'custom:country': {
      label: 'Country',
      placeholder: 'Select your country',
      isRequired: false,
      order: 6,
      type: 'select',
      options: countryOptions,
      inputProps: { type: 'select', value: 'USA' },
    },
    'custom:state': {
      label: 'State',
      placeholder: 'Select your state',
      isRequired: false,
      order: 7,
      type: 'select',
      options: stateOptions,
      inputProps: { type: 'select' },
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

// Redirect to userhome after login
const router = useRouter();
const user = ref<any>(null);

onMounted(async () => {
  try {
    const currentUser = await getCurrentUser();
    user.value = currentUser;
    router.push('/userhome');
  } catch (error) {
    user.value = null;
  }
});
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

.form-field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.form-field label {
  flex: 0 0 150px;
  margin-right: 1rem;
  font-weight: bold;
}

.form-field input,
.form-field select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}
</style>
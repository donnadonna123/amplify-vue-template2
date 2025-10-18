<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form v-if="!showConfirmation" @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="email" class="required">Email<span class="required-asterisk">*</span></label>
        <input
          id="email"
          v-model="formData.username"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password" class="required">Password<span class="required-asterisk">*</span></label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-group">
        <label for="given_name">First Name</label>
        <input
          id="given_name"
          v-model="formData.given_name"
          type="text"
          placeholder="Enter your first name"
        />
      </div>
      <div class="form-group">
        <label for="family_name">Last Name</label>
        <input
          id="family_name"
          v-model="formData.family_name"
          type="text"
          placeholder="Enter your last name"
        />
      </div>
      <div class="form-group">
        <label for="phone_number">Phone Number</label>
        <input
          id="phone_number"
          v-model="formData.phone_number"
          type="tel"
          placeholder="Enter your phone number (e.g., +15555555555)"
        />
      </div>
      <div class="form-group">
        <label for="birthdate">Birthdate</label>
        <input
          id="birthdate"
          v-model="formData.birthdate"
          type="date"
          placeholder="Enter your birthdate (YYYY-MM-DD)"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="formData.gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="custom:country">Country</label>
        <select id="custom:country" v-model="formData['custom:country']">
          <option value="">Select Country</option>
          <option value="USA" selected>United States</option>
        </select>
      </div>
      <div class="form-group">
        <label for="custom:state">State</label>
        <select id="custom:state" v-model="formData['custom:state']">
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
      <div class="form-group">
        <label for="picture">Profile Picture URL</label>
        <input
          id="picture"
          v-model="formData.picture"
          type="url"
          placeholder="Enter image URL"
        />
      </div>
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </form>
    <form v-else @submit.prevent="handleConfirmSignUp">
      <div class="form-group">
        <label for="confirmationCode">Confirmation Code</label>
        <input
          id="confirmationCode"
          v-model="confirmationCode"
          type="text"
          placeholder="Enter confirmation code"
          required
        />
      </div>
      <button type="submit">Confirm</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { signUp, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';
import type { SignUpInput, SignUpOutput, ConfirmSignUpInput } from 'aws-amplify/auth';

interface FormData {
  username: string;
  password: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
  birthdate?: string;
  gender?: string;
  picture?: string;
  'custom:country'?: string;
  'custom:state'?: string;
}

export default defineComponent({
  name: 'SignUp',
  data(): {
    formData: FormData;
    confirmationCode: string;
    showConfirmation: boolean;
    message: string;
  } {
    return {
      formData: {
        username: '',
        password: '',
        given_name: '',
        family_name: '',
        phone_number: '',
        birthdate: '',
        gender: '',
        picture: '',
        'custom:country': 'USA', // Default to USA
        'custom:state': '',
      },
      confirmationCode: '',
      showConfirmation: false,
      message: '',
    };
  },
  methods: {
    async handleSignUp() {
      try {
        // Validate phone number (E.164 format)
        if (this.formData.phone_number && !/^\+\d{10,15}$/.test(this.formData.phone_number)) {
          this.message = 'Phone number must be in E.164 format (e.g., +15555555555)';
          return;
        }
        // Validate password (Cognito default: min 8 characters, including uppercase, lowercase, number, special character)
        if (
          this.formData.password.length < 8 ||
          !/[A-Z]/.test(this.formData.password) ||
          !/[a-z]/.test(this.formData.password) ||
          !/[0-9]/.test(this.formData.password) ||
          !/[^A-Za-z0-9]/.test(this.formData.password)
        ) {
          this.message =
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
          return;
        }

        const attributes: Record<string, string> = {};
        // Only include attributes with values
        if (this.formData.given_name) attributes.given_name = this.formData.given_name;
        if (this.formData.family_name) attributes.family_name = this.formData.family_name;
        if (this.formData.phone_number) attributes.phone_number = this.formData.phone_number;
        if (this.formData.birthdate) attributes.birthdate = this.formData.birthdate;
        if (this.formData.gender) attributes.gender = this.formData.gender;
        if (this.formData.picture) attributes.picture = this.formData.picture;
        if (this.formData['custom:country']) attributes['custom:country'] = this.formData['custom:country'];
        if (this.formData['custom:state']) attributes['custom:state'] = this.formData['custom:state'];

        const signUpInput: SignUpInput = {
          username: this.formData.username,
          password: this.formData.password,
          options: {
            userAttributes: attributes,
          },
        };

        const { isSignUpComplete, userId, nextStep }: SignUpOutput = await signUp(signUpInput);
        this.message = `Sign-up ${isSignUpComplete ? 'completed' : 'initiated'}`;
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          this.showConfirmation = true;
          this.message = 'Please enter the confirmation code sent to your email or phone.';
        } else if (isSignUpComplete) {
          this.$router.push('/login');
        }
        console.log('User ID:', userId);
      } catch (error: any) {
        this.message = `Sign-up error: ${error.message || 'An error occurred'}`;
        console.error('Sign-up error:', error);
      }
    },
    async handleConfirmSignUp() {
      try {
        const confirmInput: ConfirmSignUpInput = {
          username: this.formData.username,
          confirmationCode: this.confirmationCode,
        };
        const { isSignUpComplete } = await confirmSignUp(confirmInput);
        this.message = `Confirmation ${isSignUpComplete ? 'successful' : 'pending'}`;
        if (isSignUpComplete) {
          this.showConfirmation = false;
          this.$router.push('/login');
        }
      } catch (error: any) {
        this.message = `Confirmation error: ${error.message || 'An error occurred'}`;
        console.error('Confirmation error:', error);
      }
    },
  },
});
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
label.required {
  font-weight: bold;
}
.required-asterisk {
  color: red;
  margin-left: 0.2rem;
}
input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.message {
  margin-top: 10px;
  color: #333;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
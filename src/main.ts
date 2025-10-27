// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import './assets/main.css';

// Log Vue version for confirmation
import { version } from "vue";
console.log("Vue version:", version); // Should log 3.4.21

Amplify.configure(outputs);
const app = createApp(App);
app.use(router);
app.mount('#app');
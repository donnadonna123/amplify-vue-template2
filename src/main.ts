// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Amplify } from "aws-amplify";
// gen 2
import outputs from "../amplify_outputs.json";
import './assets/main.css';
import Layout from './layouts/layout.vue';

// Log Vue version for confirmation
import { version } from "vue";
console.log("Vue version:", version); // Should log 3.4.21

// configure ampplify based on info from outputs
Amplify.configure(outputs);
// mount app
const app = createApp(App);

// Register globally
app.component('Layout', Layout);

app.use(router);
app.mount('#app');
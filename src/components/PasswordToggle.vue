<template>
  <div class="password-field">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      class="password-input"
      v-bind="$attrs"
    />
    <button
      type="button"
      @click="toggleVisibility"
      class="password-toggle-btn"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
    >
      <span v-if="showPassword">🙈</span>
      <span v-else>👁️</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PasswordToggle',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Password'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    toggleVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style scoped>
.password-field {
  position: relative;
  display: block;
  width: 100%;
}

.password-input {
  width: 100%;
  padding: 12px 45px 12px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.password-toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  font-size: 16px;
}

.password-toggle-btn:hover {
  color: #374151;
}
</style>
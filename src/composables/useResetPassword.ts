// src/composables/useResetPassword.ts
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'

export async function initiateResetPassword(username: string): Promise<string> {
  try {
    const output = await resetPassword({ username })
    const { nextStep } = output

    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        return `Code sent via ${nextStep.codeDeliveryDetails?.deliveryMedium}`
      case 'DONE':
        return 'Password reset completed.'
      default:
        return 'Unexpected step.'
    }
  } catch (error: any) {
    return error.message || 'Error initiating password reset.'
  }
}

export async function confirmPasswordReset(
  username: string,
  code: string,
  newPassword: string
): Promise<string> {
  try {
    await confirmResetPassword({ username, confirmationCode: code, newPassword })
    return 'Password successfully reset.'
  } catch (error: any) {
    return error.message || 'Error confirming password reset.'
  }
}

import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'videoStorage',
  access: (allow) => ({
    'videos/public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'videos/protected/{user_id}/*': [
      allow.authenticated.to(['read', 'write']),
      allow.owner.to(['read', 'write', 'delete'])
    ],
    'videos/private/{user_id}/*': [
      allow.owner.to(['read', 'write', 'delete'])
    ]
  })
});
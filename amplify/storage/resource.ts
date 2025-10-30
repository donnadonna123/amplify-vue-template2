import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'videoStorage',
  access: (allow) => ({
     'videos/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'thumbnails/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
  })
});
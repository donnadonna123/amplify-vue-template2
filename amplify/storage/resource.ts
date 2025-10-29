import { type ClientSchema, defineStorage } from '@aws-amplify/backend';

const schema = defineStorage({
  name: 'myVideoStorage',
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
});

export default schema;

import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'videoStorage',
  access: (allow) => ({
    'videos/public/*': [allow.guest.to(['read']), allow.authenticated.to(['read', 'write'])],
    'videos/private/{identityId}/*': [allow.entity('identity').to(['read', 'write'])],
  }),
});

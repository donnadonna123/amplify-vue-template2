// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'videoStorage', // Amplify will CREATE this bucket automatically
  access: (allow) => ({
    // Public videos - anyone can read/write
    'uploads/*': [
      allow.guest.to(['read', 'write', 'delete']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    
    // User-specific private videos
    'private/{user_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    
    // Temporary uploads
    'temp/*': [
      allow.guest.to(['write', 'delete']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
});

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { uploadData } from 'aws-amplify/storage'

const file = ref<File | null>(null)
const router = useRouter()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const handleUpload = async () => {
  if (!file.value) return

  try {
    await uploadData({
      key: `uploads/${file.value.name}`,
      data: file.value,
      options: { accessLevel: 'public' },
    }).result

    console.log('Upload successful')
 
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">Upload to S3</button>
  </div>
</template>

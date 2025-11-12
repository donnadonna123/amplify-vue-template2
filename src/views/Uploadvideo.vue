<template>
  <div class="upload-container">
    <input 
      type="file" 
      @change="handleFileSelect" 
      accept="*/*"
      :disabled="uploading"
    />
    <button 
      @click="uploadFile" 
      :disabled="!selectedFile || uploading"
    >
      {{ uploading ? 'Uploading...' : 'Upload to S3' }}
    </button>
    
    <div v-if="uploadProgress > 0" class="progress">
      <p>Upload Progress: {{ uploadProgress }}%</p>
      <progress :value="uploadProgress" max="100"></progress>
    </div>
    
    <div v-if="uploadResult" class="result">
      <p>Upload successful!</p>
      <button @click="getFileUrl">Get File URL</button>
      <p v-if="fileUrl">
        <a :href="fileUrl" target="_blank">View File</a>
      </p>
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// gen 2 use below instead of old 
import { uploadData, getUrl } from 'aws-amplify/storage';


const selectedFile = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const uploadResult = ref(null);
const fileUrl = ref('');
const error = ref('');

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    error.value = '';
    uploadResult.value = null;
    fileUrl.value = '';
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  uploadProgress.value = 0;
  error.value = '';

  try {
    const xpath = `${Date.now()}-${selectedFile.value.name}`;
    console.log('pathxxxx:', xpath);
    const result = await uploadData({
      path: `${Date.now()}-${selectedFile.value.name}`,
      data: selectedFile.value,
      
      options: {
  //      bucketname: 'amplify-amplifyvuetemplat-videostoragebucketb22462-xx8fnys379fh',
  //      region: 'us-east-1',
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            uploadProgress.value = Math.round(
              (transferredBytes / totalBytes) * 100
            );
          }
        },
      },
    }).result;

    uploadResult.value = result;
    console.log('Upload successful:', result);
    
  } catch (err) {
    console.log('Bucket name:', );
    console.log('hi theres');
      
    error.value = `Upload failedxxx: ${err.message}`;
    console.error('Upload errorsss:', err);
  } finally {
    uploading.value = false;
  }
};

const getFileUrl = async () => {
  if (!uploadResult.value) return;

  try {
    const url = await getUrl({
      path: uploadResult.value.path,
      options: {
        validateObjectExistence: true,
        expiresIn: 3600 // 1 hour
      }
    });
    
    fileUrl.value = url.url.toString();
    console.log('File URL:', fileUrl.value);
  } catch (err) {
    error.value = `Failed to get URL: ${err.message}`;
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

input, button {
  margin: 10px 5px;
  padding: 10px;
}

.progress, .result, .error {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
}

.error {
  background-color: #ffe6e6;
  color: #d63031;
}

.result {
  background-color: #e6f7e6;
  color: #2d5016;
}

progress {
  width: 100%;
  height: 20px;
}
</style>
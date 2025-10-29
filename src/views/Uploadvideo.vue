<template>
  <div class="upload-video">
    <h1>Upload Video</h1>
    
    <div class="upload-area" @dragover.prevent @drop="handleDrop">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        accept="video/*"
        style="display: none"
      />
      
      <div v-if="!uploading" class="upload-prompt">
        <p>Drag & drop a video file here or click to browse</p>
        <button @click="browseFiles" class="browse-btn">
          Browse Files
        </button>
      </div>
      
      <div v-else class="upload-progress">
        <p>Uploading: {{ uploadProgress }}%</p>
        <progress :value="uploadProgress" max="100"></progress>
      </div>
      
      <div v-if="selectedFile" class="file-info">
        <p>Selected: {{ selectedFile.name }}</p>
        <p>Size: {{ formatFileSize(selectedFile.size) }}</p>
        <button @click="uploadVideo" :disabled="uploading" class="upload-btn">
          Upload Video
        </button>
      </div>
    </div>
    
    <div v-if="uploadResult" class="upload-success">
      <h3>Upload Successful!</h3>
      <p>Video key: {{ uploadResult.key }}</p>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { uploadData, getUrl } from 'aws-amplify/storage';

const router = useRouter();
const fileInput = ref<HTMLInputElement>();
const selectedFile = ref<File | null>(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const uploadResult = ref<any>(null);
const error = ref<string>('');

const browseFiles = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files) {
    selectedFile.value = event.dataTransfer.files[0];
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const uploadVideo = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  uploadProgress.value = 0;
  error.value = '';

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = selectedFile.value.name.split('.').pop();
    const fileName = `video_${timestamp}.${fileExtension}`;

    // Upload the file
    const result = await uploadData({
      key: `videos/${fileName}`,
      data: selectedFile.value,
      options: {
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            uploadProgress.value = Math.round(
              (transferredBytes / totalBytes) * 100
            );
          }
        }
      }
    });

    uploadResult.value = result;
    
    // Optional: Redirect to videos list after successful upload
    setTimeout(() => {
      router.push('/Videolist');
    }, 2000);

  } catch (err) {
    console.error('Upload error:', err);
    error.value = 'Failed to upload video. Please try again.';
  } finally {
    uploading.value = false;
  }
};
</script>

<style scoped>
.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #007bff;
}

.browse-btn, .upload-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
}

.browse-btn:hover, .upload-btn:hover {
  background: #0056b3;
}

.upload-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.upload-progress progress {
  width: 100%;
  height: 20px;
}

.upload-success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  color: #155724;
}

.error-message {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  color: #721c24;
}

.file-info {
  margin: 1rem 0;
}
</style>
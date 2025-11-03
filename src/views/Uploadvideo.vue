<template>
  <div class="video-upload-container">
    <div class="upload-area" 
         @drop="onDrop"
         @dragover="onDragOver"
         @dragleave="onDragLeave"
         :class="{ 'drag-over': isDragOver }">
      <input
        type="file"
        ref="fileInput"
        @change="onFileSelect"
        accept="video/*,.mp4,.mov,.avi,.mkv,.webm"
        style="display: none"
      />
      
      <div class="upload-content">
        <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p>Drag & drop video files here or click to browse</p>
        <button @click="triggerFileInput" class="browse-btn">
          Browse Files
        </button>
      </div>
    </div>

    <!-- Selected File Preview -->
    <div v-if="selectedFile" class="file-preview">
      <div class="file-info">
        <p><strong>File:</strong> {{ selectedFile.name }}</p>
        <p><strong>Size:</strong> {{ formatFileSize(selectedFile.size) }}</p>
        <p><strong>Type:</strong> {{ selectedFile.type }}</p>
      </div>
      <video v-if="videoUrl" :src="videoUrl" controls class="video-preview"></video>
      <div class="upload-actions">
        <button @click="uploadFile" :disabled="uploading" class="upload-btn">
          {{ uploading ? 'Uploading...' : 'Upload Video' }}
        </button>
        <button @click="clearFile" class="cancel-btn">Cancel</button>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
      </div>
      <p>{{ uploadProgress }}% uploaded</p>
    </div>

    <!-- Uploaded Files List -->
    <div v-if="uploadedFiles.length > 0" class="uploaded-files">
      <h3>Uploaded Videos</h3>
      <div v-for="file in uploadedFiles" :key="file.key" class="uploaded-file-item">
        <div class="file-details">
          <p><strong>Key:</strong> {{ file.key }}</p>
          <p><strong>Uploaded:</strong> {{ new Date(file.lastModified).toLocaleString() }}</p>
        </div>
        <div class="file-actions">
          <button @click="getVideoUrl(file.key)" class="view-btn">View</button>
          <button @click="deleteFile(file.key)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <!-- Debug Information -->
    <div v-if="debugInfo" class="debug-info">
      <h4>Debug Information:</h4>
      <pre>{{ debugInfo }}</pre>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <strong>Error:</strong> {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { uploadData, getUrl, remove, list } from '@aws-amplify/storage'

interface UploadedFile {
  key: string
  lastModified: Date
  size: number
}

const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const videoUrl = ref<string>('')
const uploading = ref(false)
const uploadProgress = ref(0)
const isDragOver = ref(false)
const error = ref('')
const uploadedFiles = ref<UploadedFile[]>([])
const debugInfo = ref<string>('')

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Handle file selection
const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    handleFileSelection(target.files[0])
  }
}

// Handle drag and drop
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const onDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    handleFileSelection(files[0])
  }
}

// Handle file selection
const handleFileSelection = (file: File) => {
  // Check if file is a video
  if (!file.type.startsWith('video/')) {
    error.value = 'Please select a video file. Selected file type: ' + file.type
    return
  }

  // Check file size (limit to 100MB)
  const maxSize = 100 * 1024 * 1024 // 100MB in bytes
  if (file.size > maxSize) {
    error.value = 'File size must be less than 100MB'
    return
  }

  selectedFile.value = file
  error.value = ''
  debugInfo.value = ''
  videoUrl.value = URL.createObjectURL(file)
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Upload file to S3
const uploadFile = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadProgress.value = 0
  error.value = ''
  debugInfo.value = 'Starting upload...'

  try {
    // Generate unique key with timestamp and random string
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = selectedFile.value.name.split('.').pop() || 'mp4'
    const key = `videos/${timestamp}-${randomString}.${fileExtension}`

    debugInfo.value = `Uploading file: ${selectedFile.value.name}\nKey: ${key}\nSize: ${selectedFile.value.size} bytes`

    const result = await uploadData({
      key: key,
      data: selectedFile.value,
      options: {
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            uploadProgress.value = Math.round((transferredBytes / totalBytes) * 100)
            debugInfo.value = `Upload progress: ${uploadProgress.value}% (${transferredBytes}/${totalBytes} bytes)`
          }
        }
      }
    }).result

    debugInfo.value = `Upload successful! Result: ${JSON.stringify(result, null, 2)}`
    console.log('File uploaded successfully:', result)
    
    // Refresh uploaded files list
    await listUploadedFiles()
    
    // Reset form
    clearFile()
    
  } catch (err: any) {
    console.error('Error uploading file:', err)
    
    // Enhanced error handling
    let errorMessage = 'Failed to upload file. Please try again.'
    
    if (err.name === 'StorageError') {
      errorMessage = `Storage error: ${err.message}`
    } else if (err.name === 'NetworkError') {
      errorMessage = 'Network error. Please check your connection.'
    } else if (err.message) {
      errorMessage = `Upload error: ${err.message}`
    }
    
    error.value = errorMessage
    debugInfo.value = `Error details: ${JSON.stringify(err, null, 2)}`
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}

// List uploaded files
const listUploadedFiles = async () => {
  try {
    debugInfo.value = 'Listing uploaded files...'
    const result = await list({
      path: 'videos/'
    })
    
    uploadedFiles.value = result.items.map(item => ({
      key: item.key,
      lastModified: item.lastModified,
      size: item.size
    }))
    
    debugInfo.value += `\nFound ${uploadedFiles.value.length} files`
  } catch (err) {
    console.error('Error listing files:', err)
    debugInfo.value += `\nError listing files: ${err}`
  }
}

// Get video URL for viewing
const getVideoUrl = async (key: string) => {
  try {
    debugInfo.value = `Getting URL for: ${key}`
    const { url } = await getUrl({ key })
    window.open(url, '_blank')
    debugInfo.value += `\nURL retrieved successfully`
  } catch (err) {
    console.error('Error getting video URL:', err)
    error.value = 'Failed to get video URL'
    debugInfo.value += `\nError getting URL: ${err}`
  }
}

// Delete file
const deleteFile = async (key: string) => {
  if (!confirm('Are you sure you want to delete this file?')) return

  try {
    debugInfo.value = `Deleting file: ${key}`
    await remove({ key })
    await listUploadedFiles() // Refresh the list
    debugInfo.value += `\nFile deleted successfully`
  } catch (err) {
    console.error('Error deleting file:', err)
    error.value = 'Failed to delete file'
    debugInfo.value += `\nError deleting file: ${err}`
  }
}

// Clear selected file
const clearFile = () => {
  selectedFile.value = null
  videoUrl.value = ''
  uploadProgress.value = 0
  error.value = ''
}

// Load uploaded files on component mount
onMounted(() => {
  listUploadedFiles()
})
</script>

<style scoped>
.video-upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area.drag-over {
  border-color: #007bff;
  background-color: #f8f9fa;
}

.upload-content {
  color: #666;
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: #ccc;
}

.browse-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.browse-btn:hover {
  background-color: #0056b3;
}

.file-preview {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.video-preview {
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
  border-radius: 4px;
}

.upload-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.upload-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-btn {
  background-color: #28a745;
  color: white;
}

.upload-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background-color: #218838;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #545b62;
}

.progress-container {
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.uploaded-files {
  margin-top: 30px;
}

.uploaded-file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.file-actions {
  display: flex;
  gap: 10px;
}

.view-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn {
  background-color: #17a2b8;
  color: white;
}

.view-btn:hover {
  background-color: #138496;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.debug-info {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}
</style>

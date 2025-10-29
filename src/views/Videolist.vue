<template>
  <div class="video-list">
    <h1>My Videos</h1>
    <button @click="$router.push('/upload')" class="upload-new-btn">
      Upload New Video
    </button>
    
    <div v-if="loading" class="loading">Loading videos...</div>
    
    <div v-else class="videos-grid">
      <div v-for="video in videos" :key="video.key" class="video-card">
        <video controls :src="video.url" class="video-player"></video>
        <div class="video-info">
          <p>{{ video.key.split('/').pop() }}</p>
          <button @click="downloadVideo(video)" class="download-btn">
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { list, getUrl, downloadData } from 'aws-amplify/storage';

interface VideoItem {
  key: string;
  url: string;
}

const videos = ref<VideoItem[]>([]);
const loading = ref(false);

const loadVideos = async () => {
  loading.value = true;
  try {
    const result = await list({
      prefix: 'videos/',
      options: {
        accessLevel: 'guest'
      }
    });
    
    const videoUrls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getUrl({
          key: item.key,
          options: {
            accessLevel: 'guest'
          }
        });
        return {
          key: item.key,
          url: url.url.toString()
        };
      })
    );
    
    videos.value = videoUrls;
  } catch (error) {
    console.error('Error loading videos:', error);
  } finally {
    loading.value = false;
  }
};

const downloadVideo = async (video: VideoItem) => {
  try {
    const result = await downloadData({
      key: video.key,
      options: {
        accessLevel: 'guest'
      }
    });
    
    const blob = await result.body;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = video.key.split('/').pop() || 'video';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
  }
};

onMounted(() => {
  loadVideos();
});
</script>

<style scoped>
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.video-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.video-info {
  padding: 1rem;
}

.upload-new-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.download-btn {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>
<script setup lang="ts">  
const props = defineProps<{
    multiple?: boolean;  
}>();
</script>
<template> 
<br><br>
    <input type="file" :multiple="multiple" />
    <label for="file-input" class="btn">
     Upload File
</label>
<input id="file-input" type="file" hidden />
</template>

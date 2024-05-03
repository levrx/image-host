<template>
  <div id="box">
    <wallpapers/>
    <div class="header">
      <a href="https://github.com/levrx" target="_blank"></a>
    </div>
    <div class="main">
      <Upload @imageUploaded="handleImageUploaded"/>
      <!-- Render uploaded images -->
      <div class="uploaded-images">
        <img v-for="(image, index) in uploadedImages" :key="index" :src="image" alt="Uploaded Image">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Wallpapers from "../components/Wallpapers.vue"
import Upload from "../components/Upload.vue"
import { reactive } from "vue";

// Reactive array to store uploaded image URLs
const uploadedImages = reactive([]);

// Function to handle image uploaded event
const handleImageUploaded = (imageUrl: string) => {
  // Push the new image URL to the array
  uploadedImages.push(imageUrl);
}
</script>

<style scoped lang="less">
#box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  box-sizing: border-box;
  padding: 30px;
  background: linear-gradient(240deg, rgba(173, 255, 47, 0.7), rgba(0, 100, 0, 0.7)); 
}

.main {
  flex: 1;
  flex-direction: column;
  padding: 30px 0;
  align-items: center;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: end;
}

.header a {
  width: 22px;
  height: 22px;
  background-image: url("/github.svg");
  background-color: transparent;
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: top;
}

.uploaded-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.uploaded-images img {
  margin: 5px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>

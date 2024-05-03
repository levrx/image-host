<template>
  <div id="box">
    <wallpapers/>
    <div class="header">
      <a href="https://github.com/levrx" target="_blank"></a>
    </div>
    <div class="main">
      <Upload/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Wallpapers from "../components/Wallpapers.vue"
import Upload from "../components/Upload.vue"
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

.footer {
  font-size: 12px;
  color: #fff;
}

.footer a {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}
</style>

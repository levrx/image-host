<template>
  <div class="upload-container">
    <el-upload
        class="upload-drag"
        :show-file-list="false"
        drag
        action="/upload"
        :accept="accept"
        :before-upload="onBeforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
    >
      <div class="upload-content">
        <div class="upload-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M422.4 704l-94.72-143.36c-15.36-23.04-46.08-30.72-71.68-15.36l-15.36 15.36-130.56 204.8c-12.8 25.6-7.68 56.32 17.92 71.68 7.68 5.12 17.92 7.68 25.6 7.68h256c28.16 0 51.2-23.04 51.2-51.2 0-7.68-2.56-15.36-5.12-23.04l-33.28-66.56z" fill="#A5C8F4"></path>
            <path d="M307.2 358.4c-43.52 0-76.8-33.28-76.8-76.8s33.28-76.8 76.8-76.8 76.8 33.28 76.8 76.8-33.28 76.8-76.8 76.8z m327.68-33.28c5.12-7.68 12.8-15.36 20.48-17.92 25.6-12.8 56.32 0 69.12 23.04L944.64 793.6c2.56 7.68 5.12 15.36 5.12 23.04 0 28.16-23.04 51.2-51.2 51.2H378.88c-10.24 0-20.48-2.56-30.72-10.24-23.04-15.36-28.16-48.64-12.8-71.68l56.32-79.36 243.2-381.44z" fill="#2589FF"></path>
          </svg>
        </div>
        <div class="upload-text">
          <span>
            You can directly take a screenshot and paste or drag it here. Only GIF, JPEG, JPG, and PNG files are allowed. The image size limit is 5MB.
          </span>
        </div>
      </div>
      <div class="upload-btn">
        <el-button class="ml-3" round type="primary">
          Upload Image
        </el-button>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { STATUS } from "./constant";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { usePaste } from "../hooks/usePaste";
import { postUpload } from "../api";
import { compressFile } from "../utils/compressFile";

const accept = ['gif','jpeg','jpg','png'].map(type => `image/${type}`).join(',');
const emit = defineEmits(["change"]);
const MAX_SIZE = 5 * 1024 * 1024;
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
});

// Set compress to always true
const compress = ref(true);

const onBeforeUpload = async (raw: any) => {
  let result = raw;
  if (raw.size > MAX_SIZE) {
    if (!compress.value) {
      ElMessage.error('Image size cannot exceed 5MB！');
      return false;
    } else {
      result = await compressFile(raw);
    }
  }
  emit("change", STATUS.UPLOADING);
  return result;
};

const onSuccess = (response: any) => {
  setTimeout(() => {
    emit("change", STATUS.DONE, response);
  }, 200);
};

const onError = () => {
  setTimeout(() => {
    emit("change", STATUS.ERROR);
  }, 200);
};

const { clipboardFile, paste } = usePaste();
const uploadPasteImg = async () => {
  const file = clipboardFile.value;
  clipboardFile.value = undefined;
  const pass = onBeforeUpload(file);
  if (!pass) return;
  const response: any = await postUpload(file).catch(() => {
    onError();
  });
  if (response.status === 200 && response.data && response.data.length > 0) {
    onSuccess(response.data);
  } else {
    onError();
  }
};

watch(paste, () => {
  if (!props.show) return;
  const { type } = clipboardFile.value;
  if (accept.includes(type)) {
    uploadPasteImg();
  } else {
    ElMessage.error('File format is incorrect！');
  }
});
</script>

<style lang="less" scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.upload-drag {
  padding: 20px;
  background-color: #f5f7fa;
  border: 2px dashed #c7cfd7;
  border-radius: 10px;
}

.upload-icon svg {
  width: 60px;
  height: 60px;
}

.upload-content {
  text-align: center;
}

.upload-text {
  margin-top: 20px;
  color: #5e6878;
}

.upload-btn {
  margin-top: 20px;
}
</style>

<template>
  <div class="custom-upload">
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
      <div class="upload-icon">
        <i class="el-icon-upload"></i>
      </div>
      <div class="text-area">
        <span>
          You can directly take a screenshot and paste or drag it here. Only gif, jpeg, jpg, and png's are allowed. The image limit is within 5M.
        </span>
      </div>
      <div class="upload-btn">
        <el-button class="ml-3" round type="primary">
          Upload Image
        </el-button>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { STATUS } from "./constant";
import { ElMessage } from "element-plus";
import { defineProps, defineEmits } from "vue";
import { usePaste } from "../hooks/usePaste";
import { postUpload } from "../api";
import { compressFile } from "../utils/compressFile";

export default {
  setup() {
    const accept = ['gif','jpeg','jpg','png'].map(type => `image/${type}`).join(',');
    const emit = defineEmits(["change"]);
    const MAX_SIZE = 5 * 1024 * 1024;
    const props = defineProps({
      show: {
        type: Boolean,
        default: true
      }
    });

    const onBeforeUpload = async (raw) => {
      let result = raw;
      if (raw.size > MAX_SIZE) {
        ElMessage.error('Image size cannot exceed 5MB！');
        return false;
      }
      emit("change", STATUS.UPLOADING);
      return result;
    };

    const onSuccess = (response) => {
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
      const response = await postUpload(file).catch(() => {
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
  }
};
</script>

<style scoped>
.custom-upload {
  text-align: center;
}

.upload-drag {
  padding: 20px;
  border: 2px dashed #bbb;
  border-radius: 8px;
  background-color: #f8f8f8;
  transition: border-color 0.3s ease;
}

.upload-drag:hover {
  border-color: #999;
}

.upload-icon {
  font-size: 48px;
  color: #999;
}

.text-area {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.upload-btn {
  margin-top: 20px;
}
</style>

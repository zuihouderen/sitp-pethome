
<template>
  <div>
    <el-upload
      :http-request="upload"
      :multiple="true"
      :show-file-list="false"
      action
      ref="upload"
      :before-upload="beforeAvatarUpload"
    >
      <el-avatar
        shape="square"
        v-if="image&&image!='null'"
        :src="image"
        class="seePicture"
        slot="trigger"
      ></el-avatar>
      <el-avatar
        shape="square"
        v-else-if="imageUrl&&imageUrl!='null'"
        :src="imageUrl"
        class="seePicture"
        slot="trigger"
      ></el-avatar>
      <el-avatar
        shape="square"
        src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/choose.png"
        class="seePicture"
        slot="trigger"
        v-else
      ></el-avatar>
    </el-upload>
  </div>
</template>

<script>
import Util from "../assets/Util";

export default {
  props: {
    imageUrl: {
      type: String
    }
  },
  name: "UploadImage",
  data() {
    return {
      image: ""
    };
  },
  methods: {
    //用自己方法覆盖默认上传行为，不需要利用默认钩子函数
    upload(file) {
      const client = Util.createAliOss();
      var fileName = "sitp" + file.file.uid;
      client
        .put(fileName, file.file)
        .then(result => {
          this.image = result.url;
          this.$emit("src", result.url);
        })
        .catch(err => {
          this.$message.error("上传图片失败!");
        });
    },
    //上传图片前检验图片格式
    beforeAvatarUpload(file) {
     return Util.beforeAvatarUpload(file);
    }
  }
};
</script>
<style>
.seePicture {
  width: 150px;
  height: 150px;
}
.seePicture img {
  width: 100%;
  height: 100%;
}
</style>

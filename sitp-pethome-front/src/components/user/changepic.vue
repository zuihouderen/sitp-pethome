<template>
  <div>
    <el-page-header @back="goBack"></el-page-header>
    <div class="pictrue-box">
      <el-row :gutter="40">
        <el-col :span="12" :xs="{span:24}" class="pictrue-left-box">
          <el-upload
            :http-request="upload"
            :multiple="true"
            :show-file-list="false"
            action
            ref="upload"
            class="upload-pictrue"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="new-pictrue" slot="trigger" />
            <i v-else class="el-icon-plus icon" slot="trigger"></i>
          </el-upload>
        </el-col>
        <el-col :span="12" :xs="{span:24}" class="pictrue-right-box">
          <div class="show-pictrue-box">
            <img :src="showImageurl" class="show-pictrue" v-if="showImageurl" />
            <img
              v-else
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              class="show-pictrue"
            />
            <span class="pictrue-span" v-if="!imageUrl">当前头像</span>
            <span class="pictrue-span" v-else>预览头像</span>
          </div>
        </el-col>
      </el-row>
      <p class="pictrue-info">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
      <div class="center">
        <el-button type="primary" @click="goUpdate">更新</el-button>
        <el-button @click="goClear">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Util from "../../assets/Util";
import store from "../../store/main";
export default {
  name: "changePic",
  data() {
    return {
      imageUrl: "",
      fileList: [],
      showImageurl: "",
      old: ""
    };
  },
  created() {
    this.getPicture();
  },
  methods: {
    ...mapMutations(["setPicture"]),
    getPicture() {
      this.axios
        .get("http://127.0.0.1:5000/user/get_myinfo")
        .then(res => {
          if (res.data.flag) {
            var results = res.data.data.rows;
            this.showImageurl = results.user_img;
            this.old = results.user_img;
          }
        });
    },
    goUpdate() {
      if (this.imageUrl) {
        console.log( store.state.user_age);
        const loading = this.$loading({
          lock: true,
          text: "头像更新中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          this.axios
            .post("http://127.0.0.1:5000/user/modify_user", {
              img: this.showImageurl,
              name: this.$store.state.user_name,
              address:this.$store.state.address,
              age:this.$store.state.user_age,
              gender:this.$store.state.user_gender
            })
            .then(res => {
              console.log(res.data);
              if (res.data.flag) {
                this.$message.success("修改头像成功！");
                this.setPicture({user_img : this.showImageurl});
                this.imageUrl = "";
                this.getPicture();
                loading.close();
              }
            });
        }, 4000);
      } else {
        this.$message.warning("请选择头像！");
      }
    },
    upload(file) {
      var client= Util.createAliOss();
      var fileName = "sitp" + file.file.uid;
      client
        .put(fileName, file.file)
        .then(result => {
          this.imageUrl = result.url;
          this.showImageurl = result.url;
        })
        .catch(err => {
          this.$message.error("上传图片失败!");
        });
    },
    beforeAvatarUpload(file) {
     return Util.beforeAvatarUpload(file);
    },
    goClear() {
      this.showImageurl = this.old;
      this.imageUrl = "";
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.pictrue-left-box {
  text-align: right;
}
.pictrue-right-box {
  text-align: left;
}
.show-pictrue {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 50px;
}
.new-pictrue {
  width: 212px;
  height: 212px;
}
.icon {
  font-size: 100px;
  width: 100px;
  padding: 50px;
  height: 100px;
}
.upload-pictrue {
  min-width: 212px;
  min-height: 212px;
  display: inline-block;
  border: 1px solid #e5e9ef;
  vertical-align: bottom;
}
.show-pictrue-box {
  min-width: 212px;
  min-height: 212px;
  vertical-align: bottom;
  display: inline-block;
  border: 1px solid #e5e9ef;
  text-align: center;
}
.pictrue-span {
  display: block;
  margin-top: 15px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
}
.pictrue-info {
  margin-top: 25px;
  margin-bottom: 40px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
  text-align: center;
}
.pictrue-box {
  margin-top: 25px;
}
</style>

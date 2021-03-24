<template>
  <div>
    <p class="title">活动</p>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="活动名称：" label-width="100px" prop="title">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model="form.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动地址：" label-width="100px" prop="title">
        <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="form.address"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动主持：" label-width="100px" prop="title">
        <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="form.host"
                disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="活动内容：" label-width="100px" prop="content">
        <el-input type="textarea" :rows="3" class="formlist" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAddActivity">提交</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
    <Dialog></Dialog>
  </div>
</template>

<script>
  import Dialog from "@common/dialog.vue";
  import {checkinput} from "@assets/validate.js";
  import UploadImage from "../../../common/UploadImage";

  export default {
  components: {
    Dialog,
    UploadImage
  },
  name: "caretable",
  data() {
    return {
      show: false,
      form: {
        title: "",
        content: "",
        address:'',
        host:'',
      },
      rules: {
        title: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "活动名称不能为空"
          }
        ],
        address: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "活动地址不能为空"
          }
        ],
        content: [{ min: 0, max: 300, message: "长度在0到300个字符" }]
      }
    };
  },
  created() {
    console.log(this.DialogParams().host)
      this.form.host=this.DialogParams().host;
      this.show = true;
  },
  methods: {
    goAddActivity() {
      console.log("添加活动");
      this.$refs["form"].validate(valid => {
        if (valid) {
            this.axios.post("http://127.0.0.1:5000/activity/create", this.form).then(res => {
              console.log(res.data)
              if (res.data.flag) {
                 this.$message.success("活动添加成功！");
                 this.closeDialog();
                 this.goClose();
                 this.close();
              }
            });
          }
         else {
          return false;
        }
      });
    },
    goClose() {
      this.closeDialog();
    },
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  margin-top: 0px;
}
.icon {
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>

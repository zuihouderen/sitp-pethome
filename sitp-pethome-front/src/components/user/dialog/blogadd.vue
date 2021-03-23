<template>
  <div>
    <p class="title">宠物日志</p>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="" label-width="100px">
        <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
      </el-form-item>
      <el-form-item label="寄养用户：" label-width="100px" prop="username">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model="form.username"
          :disabled="show"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" label-width="100px" prop="starttime">
        <el-date-picker v-model="form.starttime" type="date" class="formlist" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="寄养时长：" label-width="100px" prop="timerang">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model.number="form.timerang"
          oninput="if(value.length>10)value=value.slice(0,10)"
        ></el-input>
        <span style="margin-left:10px;">天</span>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goSave">提交</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import add_update from "./petadd_update.vue";
import { checkinput } from "@assets/validate.js";
import UploadImage from "../../../common/UploadImage";
export default {
  components: {
    Dialog,
    UploadImage
  },
  name: "caretable",
  data() {
    var checkDay = (rule, value, callback) => {
      if (
        this.moment(value).valueOf() <
        this.moment()
          .startOf("day")
          .valueOf()
      ) {
        return callback(new Error("开始时间不得早于当前"));
      }
      callback();
    };
    return {
      imageUrl:'',
      show: false,
      form: {
        starttime: "",
        username: "",
        timerang: ""
      },
      pet: { pet: true },
      rules: {
        username: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "账号不能为空"
          }
        ],
        starttime: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "开始日期不能为空"
          },
          {
            validator: checkDay,
            trigger: "blur",
            message: "开始时间不得早于当前"
          }
        ],
        timerang: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "寄养时长不能为空"
          },
          { type: "number", message: "寄养时长必须为数字值" }
        ]
      }
    };
  },
  created() {
    if (this.DialogParams().row) {
      let obs = this.DialogParams().row;
      this.form = obs;
      this.show = true;
      this.goQuery();
    }
  },
  methods: {
    goQuery() {
      this.axios
        .get("/api/pet/get", {
          params: {
            page_no: 1,
            page_size: 10,
            petid: this.form.petid
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.pet = results.message[0];
          }
        });
    },
    goSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.starttime = this.moment(this.form.starttime).format(
            "YYYY-MM-DD"
          );
          if (this.show) {
            this.axios.put("/api/caretable/update", this.form).then(res => {
              if (res.data.success) {
                this.$message.success("修改成功！");
                this.closeDialog();
              }
            });
          } else {
            if (this.pet.status) {
              this.axios
                .post("/api/pet/add", this.pet)
                .then(res => {
                  if (res.data.success) {
                    this.form.petid = res.data.petid;
                    return this.axios.post("/api/caretable/add", this.form);
                  }
                })
                .then(res => {
                  if (res.data.success) {
                    this.$message.success("成功提交寄养申请！");
                    this.closeDialog();
                  }
                });
            } else {
              this.$message.warning("请添加宠物！");
            }
          }
        } else {
          return false;
        }
      });
    },
    goAdd() {
      var pet = this.pet;
      this.Dialog.title("我要寄养")
        .width("600px")
        .currentView(add_update, { pet })
        .then(data => {
          if (data) {
            this.pet = data;
          }
        })
        .show();
    },
    goClose() {
      this.closeDialog();
    },
    getSrc(src) {
      this.form.img = src;
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

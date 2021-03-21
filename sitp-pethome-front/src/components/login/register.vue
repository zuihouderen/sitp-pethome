<template>
  <div class="box">
    <el-page-header @back="goBack" content="注册账号"></el-page-header>
    <el-row type="flex" :style="conHeight" align="middle">
      <el-col :lg="{span:12, offset:6}" :md="{span:24}">
        <el-form
          label-position="right"
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="register-form"
        >
          <h2 class="center">注册账号</h2>
          <el-form-item label="姓名：" prop="username">
            <el-input type="text" size="mini" class="formlist" v-model="form.username"></el-input>
            <el-tooltip class="item" effect="dark" content="长度不应超过7个字符且不含空格" placement="top">
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="form.password" size="mini" class="formlist"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" size="mini" class="formlist"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input type="text" v-model="form.address" size="mini" class="formlist"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="user_gender">
            <el-select size="mini" class="formlist" v-model="form.user_gender">
              <el-option value="1" label="男"></el-option>
              <el-option value="0" label="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄：" prop="user_age">
            <el-input type="text" v-model="form.user_age" size="mini" class="formlist"></el-input>
          </el-form-item>

          <el-form-item prop="code" label="验证码:">
            <el-input
              type="text"
              v-model="form.code"
              size="mini"
              class="formlist"
              style="margin-right:20px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="right">
              <span class="code" @click="generatedCode">{{showCode}}</span>
            </el-tooltip>
          </el-form-item>
          <div class="center">
            <el-button type="primary" size="mini" @click="goRegister">注册</el-button>
            <el-button size="mini" @click="goReset">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  checkinput,
  checkspace,
  checkspecil,
  checkzh,
  checkname
} from "@assets/validate.js";
import random from "@assets/random.js";
import UploadImage from "@common/UploadImage.vue";
export default {
  name: "login",
  components: {
    UploadImage
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }  else if (value > 99 || value <= 0) {
        return callback(new Error(`请输入0-99范围的值`));
      } else {
        return callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value.toLowerCase() != this.code.toLowerCase()) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      code: "",
      showCode: "",
      form: {
        username: "",
        password: "",
        checkPass: "",
        address:'',
        img:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        admin:'0',
        user_gender: "1",
        user_age:'',
        code: "",
        regday: this.moment(new Date()).format("YYYY-MM-DD")
      },
      conHeight: {
        height: ""
      },
      rules: {
        password: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        username: [
          { validator: checkinput, message: "账号不能为空" },
          { validator: checkspace, message: "账号不能包含空格" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ],
        address: [
          { validator: checkinput, message: "地址不能为空" },
          { validator: checkspace, message: "地址不能包含空格" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ],
        user_age: [
          {validator:validateAmount}
        ],

        code: [
          { validator: checkinput, message: "验证码不能为空" },
          { validator: checkCode, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight());
    this.generatedCode();
  },
  methods: {
    goRegister() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios.post("http://127.0.0.1:5000/user/register", { ...this.form }).then(res => {
            console.log(res.data);
            if (res.data.code===20000) {
              this.$message.success("注册成功！正在跳转登录页面······");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            }
          });
        } else {
          return false;
        }
      });
    },
    goReset() {
      this.$refs["form"].resetFields();
    },
    getHeight() {
      this.conHeight.height = window.innerHeight + "px";
    },
    generatedCode() {
      let code = "";
      let showCode = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62);
        code += random[index];
        showCode += random[index] + " ";
      }
      this.code = code;
      this.showCode = showCode;
    },
    goBack() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.forget-button {
  margin-bottom: 5px;
  text-align: right;
}
.box {
  background: url("https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/login.jpg");
  background-size: 100% 100%;
}
.register-form {
  background: #ffffff;
  width: 40%;
  min-width: 300px;
  max-width: 400px;
  padding: 10px 20px 20px 20px;
  border-radius: 10px;
  margin: 0 auto;
}
.code {
  background: #e6e3e3;
  width: 80px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
}
.formlist {
  max-width: 180px;
  margin-right: 5px;
}
.el-form-item {
  margin-bottom: 12px;
}
</style>

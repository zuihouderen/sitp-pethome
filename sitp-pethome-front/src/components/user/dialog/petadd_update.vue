<template>
  <div>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="照片：" label-width="100px">
        <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
      </el-form-item>
      <el-form-item label="名字：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" label-width="100px" prop="age">
        <el-input v-model="form.age" type="text" class="formlist" size="small"></el-input>
      </el-form-item>
      <el-form-item label="主人：" label-width="100px" prop="host" hidden>
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model="form.host"
        ></el-input>
      </el-form-item>
      <el-form-item label="种类：" label-width="100px" prop="type">
        <el-select size="small" class="formlist" v-model="form.type">
          <el-option value="dog" label="狗狗"></el-option>
          <el-option value="cat" label="猫咪"></el-option>
          <el-option value="pig" label="小香猪"></el-option>
          <el-option value="fish" label="鱼类"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px" prop="gender">
        <el-select size="small" class="formlist" v-model="form.gender">
          <el-option value="1" label="男"></el-option>
          <el-option value="0" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" label-width="100px" prop="description">
        <el-input type="textarea" :rows="3" class="formlist" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">保存</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkname} from "@assets/validate.js";
import UploadImage from "@common/UploadImage.vue";
export default {
  components: {
    UploadImage
  },
  data() {
    let validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }  else if (value > 20 || value <= 0) {
        return callback(new Error(`请输入0-20范围的值`));
      } else {
        return callback();
      }
    };
    return {
      form: {
        img: "",
        name: "",
        age: "",
        host: this.$store.getters.getUser.user_id,
        type: "cat",
        gender: "1",
        description: ""
      },
      imageUrl: "",
      rules: {
        name: [
          { validator: checkname, types: "名字" },
          { min: 1, max: 5, message: "长度在1到5个字符" }
        ],
        age: [
          { validator: validateAmount },
        ],
        description: [{ min: 0, max: 300, message: "长度在0到300个字符" }]
      }
    };
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        if (this.form.img == "") {
            this.$message.warning("请选择图片！");
          }else {
              this.axios.post("http://127.0.0.1:5000/pets/add_pet", this.form).then(res => {
                console.log(res.data)
                if (res.data.flag) {
                  this.$message.success("添加成功！");
                  this.closeDialog();
                  this.close();
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    getSrc(src) {
      this.form.img = src;
    },
    goClose() {
      console.log("close...")
     this.closeDialog();
    }
  }
};
</script>

<style scoped>
</style>

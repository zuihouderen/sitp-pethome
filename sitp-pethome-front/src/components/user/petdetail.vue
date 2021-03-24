<template>
<div >
    <div style="width: 25%;position: absolute">
        <div style="text-align: center">
            <span class="font-25" style="margin-left: 20px" >宠物详情</span>
        </div>

        <br/>
        <el-form
                label-position="right"
                :model="form"
                :rules="rules"
                ref="form"
        >
            <el-form-item label="" label-width="100px">
                <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
            </el-form-item>
            <el-form-item label="名字：" label-width="100px" prop="name">
                <el-input type="text" size="small" class="formlist" v-model="form.name" disabled></el-input>
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
            <el-button type="primary" size="small" @click="goUpdate">修改</el-button>
            <el-button size="small" @click="goReset">重置</el-button>
            <el-button size="small" type="danger" @click="goDel">删除</el-button>
        </div>
    </div>

    <div  class="body-right">
        <el-button type="primary" size="middle" style="margin-left: 120px;margin-bottom: 10px" @click="goAdd(form.name)">添加宠物日志</el-button>
        <el-timeline  >
            <el-timeline-item :timestamp="blogform.date" placement="top" v-for="item in 5" s>
                <el-card shadow="hover" style="background-color: rgba(137,209,238,0.07);">
                              <el-form
                                      label-position="right"
                                      :model="blogform"
                                      :rules="rules1"
                                      style="margin-left: 200px"
                                      ref="blogform"
                              >
                                  <el-form-item label="" label-width="100px">
                                      <UploadImage @src="getSrc1" :imageUrl="blogform.img"></UploadImage>
                                  </el-form-item>
                                  <el-form-item label="日志名称：" label-width="100px" prop="title">
                                      <el-input
                                              type="text"
                                              size="small"
                                              class="formlist"
                                              v-model="blogform.title"
                                      ></el-input>
                                  </el-form-item>
                                  <el-form-item label="日志描述：" label-width="100px" prop="description">
                                      <el-input type="textarea" :rows="3" class="formlist" v-model="blogform.description"></el-input>
                                  </el-form-item>
                              </el-form>
                    <div class="center" style="margin-bottom: 5px;margin-top: -5px">
                        <el-button type="primary" size="small" @click="">保存</el-button>
                        <el-button size="small" @click="">取消</el-button>
                        <el-button size="small" type="danger" @click="">删除</el-button>
                    </div>

                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
    <Dialog></Dialog>
</div>
</template>

<script>
    import Dialog from "@common/dialog.vue";
    import { checkname,checkinput} from "@assets/validate.js";
    import UploadImage from "@common/UploadImage.vue";
    import petadd_update from "./dialog/petadd_update";
    import blogadd from "./dialog/blogadd";
    export default {
        components: {
            UploadImage,
            Dialog

        },
        name: "petdetail",
        data(){
            let validateAmount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("年龄不能为空"));
                }  else if (value > 20 || value <= 0) {
                    return callback(new Error(`请输入0-20范围的值`));
                } else {
                    return callback();
                }
            };
            return{
                blogform:{
                    id:'',
                    img:'',
                    title: "",
                    description: "",
                    shared:'0',
                    owner:'',
                    date:'',
                },
                form: {
                    id:"",
                    img: "",
                    name: "",
                    age: "",
                    host: "",
                    type: "cat",
                    gender: "1",
                    description: ""
                },
                imageUrl: "",
                old:{
                    pet_age: 12,
                    pet_description: "cat 1",
                    pet_gender: 0,
                    pet_host: 4,
                    pet_id: 1,
                    pet_img: "http://sitp.oss-cn-shanghai.aliyuncs.com/sitp1616502364781",
                    pet_name: "cat1",
                    pet_type: "dog"
                },
                rules: {
                    name: [
                        { validator: checkname, types: "名字" },
                        { min: 1, max: 5, message: "长度在1到5个字符" }
                    ],
                    age: [
                        { validator: validateAmount },
                    ],
                    description: [{ min: 0, max: 300, message: "长度在0到300个字符" }]
                },
                rules1: {
                    title: [
                        {
                            validator: checkinput,
                            trigger: "blur",
                            message: "日志名字不能为空"
                        }
                    ],
                    description: [{ min: 0, max: 300, message: "长度在0到300个字符" }]
                },
                count:10,
                loading: false,

            }
        },
        created() {
            let pet_id=this.$route.params.id;
            console.log(pet_id);
            this.getPet(pet_id);

        },
        computed: {
            noMore () {
                return this.count >= 20
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods:{
            getPet(id){
                this.axios.post("http://127.0.0.1:5000/pets/get_petinfo",{
                    id:id
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.flag){
                        let result=res.data.data.data;
                        console.log(res.data.data.data);
                        this.old=result;
                        this.imageUrl=result.pet_img;
                        this.form.img=result.pet_img;
                        this.form.name=result.pet_name;
                        this.form.age=result.pet_age;
                        this.form.host=result.pet_host;
                        this.form.description=result.pet_description;
                        this.form.type=result.pet_type;
                        this.form.gender=result.pet_gender+"";
                        this.form.id=result.pet_id;
                    }
                })
            },
            goUpdate() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.img == "") {
                            this.$message.warning("请选择图片！");
                        }else {
                            this.axios.post("http://127.0.0.1:5000/pets/modify_pet", this.form).then(res => {
                                console.log(res.data);
                                if (res.data.flag) {
                                    this.old.pet_img= this.form.img;
                                    this.old.pet_name=this.form.name;
                                    this.old.pet_age= this.form.age;
                                    this.old.pet_host= this.form.host;
                                    this.old.pet_description= this.form.description;
                                    this.old.pet_type=this.form.type;
                                    this.old.pet_gender= this.form.gender;
                                    this.old.pet_id=this.form.id;
                                    this.$message.success("修改成功！");
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            goReset(){
                this.getPet(this.form.id);
            },
            goDel(){
                this.$confirm("确认删除的宠物吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    setTimeout(()=>{

                    },2000)
                });
            },
            getSrc(src) {
                this.form.img = src;
            },
            getSrc1(src) {
                this.blogform.img = src;
            },
            goAdd(owner){
                this.Dialog.title("添加宠物日志")
                    .width("600px")
                    .currentView(blogadd, {owner})
                    .then()
                    .show();
            }

        },

    }
</script>

<style scoped>
.body-right{
    width: 70%;
    margin-left: 25%;
    height: 100%;
}

</style>

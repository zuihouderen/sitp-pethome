<template>
    <div>
        <div>
            <span class="font-25">账号信息</span>
            <div class="person-boder">
                <el-row :gutter="20">
                    <el-col :span=9>
                        <div class="picture-box">
                            <el-avatar class="picture" :src="form.user_img" @error="errorHandler">

                            </el-avatar>
                            <div class="center">
                                <el-button class="look-botton" circle @click="isShowImageDialog=true">
                                    <span style="display:block;">查看</span>
                                    <span>头像</span>
                                </el-button>
                                <el-button class="change-button"  circle  @click="goUrl('./changepic')">
                                    <span style="display:block;">更改</span>
                                    <span>头像</span>
                                </el-button>
                            </div>
                            </div>
                    </el-col>
                    <el-col :span=15>
                        <el-form label-position="right" :model="form" :rules="rules" ref="form" class="form">
                            <el-form-item label="姓名：" class="form-item-padding" prop="user_name" :inline-message="true">
                                <el-input type="text" size="small" class="formlist" v-model="form.user_name" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="性别：" class="form-item-padding" prop="user_gender">
                                <el-select size="small" class="formlist" v-model="form.user_gender">
                                    <el-option value="1" label="男"></el-option>
                                    <el-option value="0" label="女"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="地址：" class="form-item-padding" prop="address" :inline-message="true">
                                <el-input type="text" size="small" class="formlist" v-model="form.address"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄：" class="form-item-padding" prop="user_age" :inline-message="true">
                                <el-input type="text" size="small" class="formlist" v-model="form.user_age"></el-input>
                            </el-form-item>
                            <div class="center">
                                <el-button type="primary" size="small" @click="goSave">保存</el-button>
                                <el-button size="small" @click="goClear">取消</el-button>
                            </div>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div>
            <span class="font-25" @click="goAddAct(form.user_name)">我的活动</span>
            <div class="person-boder">
                <el-carousel :interval="2500" type="card" height="400px" indicator-position="none">
                    <el-carousel-item v-for="(item ,index) in activities"  style="border-radius: 5px">
                        <div >
                            <el-row>
                                <el-col :span="8">
                                    <el-image
                                            src="https://sitp.oss-cn-shanghai.aliyuncs.com/sitp1616595846301"
                                            fit="cover"
                                            style="height: 400px"
                                    >
                                    </el-image>
                                </el-col>
                                <el-col :span="16" style="margin-top: 20px">
                                    <el-form
                                            :model="actform" :rules="rules1" ref="actform" label-position="right"
                                        >
                                        <el-form-item label="活动名称：" label-width="100px" prop="title">
                                            <el-input
                                                    type="text"
                                                    size="small"
                                                    class="formlist"
                                                    :value="item.activity_title"
                                                    disabled
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="创建时间：" label-width="100px" prop="date" >
                                            <el-input
                                                    type="text"
                                                    size="small"
                                                    class="formlist"
                                                    :value="item.activity_date"
                                                    disabled
                                            ></el-input>
                                        </el-form-item>

                                        <el-form-item label="活动地址：" label-width="100px" prop="address">
                                            <el-input type="text"  class="formlist"
                                                      :value="item.activity_address"
                                                      disabled
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动主持：" label-width="100px" prop="host" >
                                            <el-input type="text"  class="formlist" :value="item.activity_host" disabled></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动内容：" label-width="100px" prop="content">
                                            <el-input type="textarea" :rows="2" class="formlist"
                                                      disabled
                                                    :value="item.activity_content">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="center" v-if="item.activity_host==form.user_name">
<!--                                        <el-button type="primary" size="small" @click="">修改</el-button>-->
                                        <el-button size="small" type="danger" @click="goDelAct(item.activity_id)">删除</el-button>
                                    </div>
                                    <div class="center" v-else>
                                      <el-button size="small" type="primary" @click="goAddFollow(item.activity_host)">关注</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div>
            <el-row >
                <el-col :span="12">
                    <span class="font-25">我的关注</span>
                    <div class="person-boder">
                        <el-carousel :interval="1500" type="card" height="250px" indicator-position="none">
                            <el-carousel-item v-for="item in follows"  style="border-radius: 5px">
                                <el-image
                                        style="height: 80%;display: block"
                                       :src="item.followed_img"
                                        >
                                </el-image>
                                <div class="center">
                                    <span style="font-size: 25px">{{item.followed_name}}</span>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-col>
                <el-col :span="12">
                    <span class="font-25" @click="goAdd">我的宠物</span>
                    <div class="person-boder">
                        <el-carousel :interval="1500" type="card" height="250px" indicator-position="none">
                            <el-carousel-item v-for="item in petList"  style="border-radius: 5px">
                                <el-image
                                        style="height: 80%;display: block"
                                        :src=item.pet_img
                                        @click="goDetail(item.pet_id)">
                                </el-image>
                                <div class="center">
                                    <span class="font-25">{{item.pet_name}}</span>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-col>
            </el-row>

        </div>
        <div style="margin-top:20px;">
            <span class="font-25">账号安全</span>
            <div class="psd-box">
                <div>
                    <img src="@picture/psdicon.png" class="psd-picture" />
                </div>
                <div class="psd-info-box">
                    <span class="psd-info-title">我的密码</span>
                    <span class="psd-info">修改密码，账号更安全</span>
                    <div class="psd-change-box">
                        <img src="@picture/set.png" class="psd-change-pic" />
                        <span class="psd-change-title" @click="goPsd">更改密码></span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="isShowImageDialog">
            <img
                    :src="form.user_img"
                    style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"
            />
        </el-dialog>
        <Dialog></Dialog>
    </div>
</template>
<script>
    import {
        checkinput,
        checkspace,
        checkspecil,
        checknum
    } from "@assets/validate.js";
    import Dialog from "@common/dialog.vue";
    import psd from "./psd.vue";
    import petadd_update from "./dialog/petadd_update";
    import actadd from "./dialog/actadd";
    export default {
        components: {
            Dialog
        },
        name: "user",
        data() {
            let validateAmount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("年龄不能为空"));
                }  else if (value > 99 || value <= 0) {
                    return callback(new Error(`请输入0-99范围的值`));
                } else {
                    return callback();
                }
            };
            return {
                petList:[],
                follows:[{
                    followed_age: 23,
                    followed_gender: 1,
                    followed_id: 1,
                    followed_img: "http://sitp.oss-cn-shanghai.aliyuncs.com/sitp1616601225037",
                    followed_name: "hh",
                    follower_id: 4,
                }],
                activities:[],
                actform:{
                    data:'',
                    host:'haijun',
                    content:'这hi是一个活动',
                    title:'活动1',
                    address:'上海嘉定'
                },
                isShowImageDialog: false,
                imageUrl: "",
                form: {
                    user_name:'',
                    user_img:"",
                    user_gender: "",
                    address: "",
                    user_age:"",
                },
                old: {
                    user_name: "",
                    user_gender: "",
                    address: "",
                    user_age:"",
                },
                rules: {
                    user_name: [
                        { validator: checkinput, message: "姓名不能为空" },
                        { validator: checkspecil, message: "姓名不能包含特殊字符" },
                        { validator: checknum, message: "姓名不能包含数字" },
                        { validator: checkspace, message: "姓名不能包含空格" },
                        { min: 1, max: 10, message: "长度在1到10个字符" }
                    ],
                   address: [
                       { validator: checkinput, message: "地址不能为空" },
                    ],
                    user_age: [
                        { validator: validateAmount },
                    ]
                },
                rules1: {
                    title: [
                        {
                            validator: checkinput,
                            trigger: "blur",
                            message: "活动名字不能为空"
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
                },
            };
        },
        created() {
            this.getPerson();
            this.getPets();
            this.getFollows();
            this.getActivities();
        },
        methods: {
            getActivities(){
                this.axios
                    .get("http://127.0.0.1:5000/activity")
                    .then(res => {
                        console.log(res.data);
                        if (res.data.flag) {
                            console.log(res.data.data.rows);
                            this.activities=res.data.data.rows;
                        }
                    });
            },

            getPerson() {
                this.axios
                    .get("http://127.0.0.1:5000/user/get_myinfo")
                    .then(res => {
                        console.log(res.data)
                        if (res.data.flag) {
                            console.log(res.data.data.rows);
                            var results = res.data.data.rows;
                            /**表单初始值*/
                            this.form = results;
                            this.old.user_name = results.user_name;
                            this.old.user_gender = results.user_gender;
                            this.old.address=results.address;
                            this.old.user_age=results.user_age;
                        }
                    });
            },
            goSave() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.$confirm("确认保存修改的资料吗？", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消"
                        }).then(() => {
                            this.axios
                                .post("http://127.0.0.1:5000/user/modify_user", {
                                    name: this.form.user_name,
                                    age: this.form.user_age,
                                    gender: this.form.user_gender,
                                    address: this.form.address,
                                    img:this.form.user_img,
                                })
                                .then(res => {
                                    if (res.data.flag) {
                                        this.getPerson();
                                        this.$message.success("修改信息成功！");
                                    }
                                });
                        });
                    } else {
                        return false;
                    }
                });
            },
            goClear() {
                console.log("数据清空");
                this.form.user_name = this.old.user_name;
                this.form.user_gender = this.old.user_gender;
                this.form.address = this.old.address;
                this.form.user_age = this.old.user_age;
            },
            goPsd() {
                this.Dialog.title("修改密码")
                    .width("800px")
                    .currentView(psd, {})
                    .then(data => {
                        this.getPerson();
                    })
                    .show();
            },
            errorHandler() {
                return true;
            },
            goUrl(url) {
                this.$router.push(url);
            },
            /**进入宠物详情*/
            goDetail(id){
                this.$router.push(`./pet/${id}`);
                console.log("详情")
            },
            /**
             * 添加我的宠物
             */
            goAdd(){
                console.log("添加宠物");
                this.Dialog.title("添加宠物")
                    .width("600px")
                    .currentView(petadd_update, {})
                    .then(data => {
                        this.getPets();
                    })
                    .show();
            },
            /**
             *添加活动
             */
            goAddAct(host){
                this.Dialog.title("添加活动")
                    .width("600px")
                    .currentView(actadd, {host})
                    .then(data => {
                        this.getActivities();
                    })
                    .show();
            },
            /**
             * 获取宠物列表
             */
            getPets(){
                this.axios
                    .get("http://127.0.0.1:5000/user/get_mypets")
                    .then(res => {
                        console.log(res.data);
                        if (res.data.flag) {
                            console.log(res.data.data.rows);
                         this.petList=res.data.data.rows;
                        }
                    });
            },
            /**
             * 获取关注列表
             */
            getFollows(){
                this.axios
                    .get("http://127.0.0.1:5000/user/get_myfollow")
                    .then(res => {
                        console.log(res.data);
                        if (res.data.flag) {
                            console.log(res.data.data.rows);
                            this.follows=res.data.data.rows;
                        }
                    });
            },
            goDelAct(id){
              this.$confirm("确认取消活动吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              }).then(()=>{
                this.axios.post("http://127.0.0.1:5000/activity/delete_activity",
                    {id:id})
                    .then(res=>{
                      this.getActivities();
                      if(res.data.flag){
                        this.$message.success("删除活动成功！");
                      }else {
                        this.$message.error("删除活动失败！");
                      }
                    })
              })
            },
            goAddFollow(followed_name){
              console.log(followed_name)
              this.$confirm("确认关注用户吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              }).then(()=>{
                this.axios.post("http://127.0.0.1:5000/user/add_follow",
                    {followed_name:followed_name})
                    .then(res=>{
                      this.getActivities();
                      if(res.data.flag){
                        this.$message.success("关注用户成功成功！");
                      }else {
                        this.$message.error("关注用户失败！");
                      }
                    })
              })
            }

        }
    };
</script>

<style scoped>
    .icon {
        margin-left: 10px;
    }
    .form-item-padding {
        margin-bottom: 0;
        padding: 5px 0;
    }
    .person-boder {
        background: #ffffff;
        border: 1px solid #dddddd;
        padding: 10px 10px;
        margin: 20px 0;
        min-width: 420px;
    }
    .psd-picture {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        margin-top: 10px;
    }
    .el-avatar >>> img {
        width: 100% !important;
    }
    .psd-box {
        margin-top: 20px;
        margin-left: 20px;
        width: 350px;
        display: flex;
    }
    .psd-info-title {
        font-size: 18px;
        display: block;
        padding: 10px 0;
    }
    .psd-info {
        font-size: 14px;
        color: #898989;
        display: block;
    }
    .psd-info-box {
        flex: 1;
        margin-left: 20px;
    }
    .psd-change-pic {
        vertical-align: middle;
        border-radius: 10px;
    }
    .psd-change-title {
        color: #52d0f3;
        vertical-align: middle;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
    }
    .psd-change-box {
        padding: 10px 0;
    }
    .picture-box {
        width: 150px;
        height: 150px;
       /* border: 1px solid #e5e9ef;*/
       /* border-radius: 50%;*/
        padding: 40px;
        margin: 0 auto;
        position: relative;
    }
    .picture {
        width: 150px;
        height: 150px;
        /*border-radius: 50%;*/
    }
    .change-button {
        position: absolute;
        top: 150px;
        right: 0px;
        color: #ffffff;
        background-color: #00a1d6;
    }
    .look-botton {
        position: absolute;
        top: 150px;
        left: 0px;
        color: #00a1d6;
        border: 1px solid #00a1d6;
        background-color: #ffffff;
    }
    .form {
        width: 350px;
        margin: 0 auto;
    }
    .el-carousel__item el-image {
        color: #36694d;
        font-size: 14px;
        opacity: 0.75;
        line-height: 120px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>

<template>
<div >
    <div style="width: 25%;position: absolute">
        <span class="font-25" >宠物详情</span>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 100%;margin-top: 5px"  >
            <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                      style="display: block;width: 100%;"
                      fit="cover"
            />
            <div style="padding: 14px;text-align: center">
                <span>宠物名：{{pet.name}}</span>
                <div >
                    <el-button type="text" class="button">修改</el-button>
                    <el-button type="text" class="button" style="color: red">删除</el-button>
                </div>
            </div>
        </el-card>
    </div>

    <div  class="body-right">
        <el-timeline  >
            <el-timeline-item timestamp="2018/4/12" placement="top" v-for="item in 10" >
                <el-card :body-style="{ padding: '0px', }" shadow="hover">
                  <el-row :gutter="20">
                      <el-col span="6">
                          <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    style="display: block;width: 100%;"
                                    fit="cover"
                          />
                      </el-col>
                      <el-col span="18">
                          <el-form :label-position="left" label-width="80px" :model="petlog">
                              <el-form-item label="名称">
                                  <el-input v-model="petlog.name"></el-input>
                              </el-form-item>
                              <el-form-item label="活动区域">
                                  <el-input v-model="petlog.content"></el-input>
                              </el-form-item>
                              <el-form-item label="活动形式">
                                  <el-input v-model="petlog.type"></el-input>
                              </el-form-item>
                              <div class="center" style="margin-bottom: 5px;margin-top: -5px">
                                  <el-button type="primary" size="small" @click="goSave">保存</el-button>
                                  <el-button size="small" @click="goClear">取消</el-button>
                                  <el-button size="small" type="danger" @click="goDelete">删除</el-button>
                              </div>
                          </el-form>
                      </el-col>
                  </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</div>
</template>

<script>
    export default {
        name: "petdetail",
        data(){
            return{
                pet:{},
                pid:'',
                count:10,
                loading: false,
                petlog:{}
            }
        },
        created() {
            this.pid=this.$route.params.id
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
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
            }
        },

    }
</script>

<style scoped>
.body-right{
    width: 75%;
    margin-left: 25%;
    height: 100%;
}

</style>

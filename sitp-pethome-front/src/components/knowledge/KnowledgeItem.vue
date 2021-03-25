<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    
    <div class="me-knowledge-header">
      <a class="me-knowledge-title">{{knowledge.pet_name}}-{{type}}-{{knowledge.characters}}-{{knowledge.nation}}-{{knowledge.life}}岁</a>
    </div>

    <div class="me-artile-description">
      <b>投喂点：</b>{{knowledge.feed_points}}<br></br>
      <b>病史：</b>{{knowledge.easy_of_disease}}<br></br>
      <b>外貌：</b>{{knowledge.feature}}<br></br>
      <b>性格：</b>{{knowledge.character_feature}}<br></br>
      <b>饲养知识：</b>{{knowledge.care_knowledge}}<br></br>
      <!--
      <img
          src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/manualdog.jpg"
          class="manual-picture"
          floot:right
      >
      -->
      <div class="me-artile-update">
    <el-button slot="reference" type="info" plain size="small" class="update" @click=updateThis()>修改</el-button>
    </div>
          <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @onConfirm="cancelKnowledge()"
          >
            <el-button slot="reference" type="info" plain size="small" class="cancel">删除</el-button>
          </el-popconfirm>
    </div>

  </el-card>
</template>


<script>

  export default {
    name: 'KnowledgeItem',
    props: ['knowledge','index'],
    data() {
      var x;
      switch(this.knowledge.pet_type){
             case 1:
                 x="猫";
                 break;
            case 2:
                 x="狗";
                 break;
            case 3:
                 x="鸟";
                 break;
            case 4:
                 x="昆虫";
                 break;
            case 5:
                 x="爬行类";
                 break;
            case 6:
                 x="鱼类";
                 break;
            default:
                 x="其他";
                 break;
      }
      return {
          type:x
      }
    },
    create(){
    },
    methods: {
        cancelKnowledge(){
            let _this=this;
            this.axios
                .get("http://127.0.0.1:5000/knowledge/delete/"+_this.knowledge.pk_id)
                .then(res => {
                    if (res.data.flag) {
                        this.$router.push({path: `/knowledge`});
                }
            });
        },
        updateThis(){
            this.$router.push({path: `/updateKnowledge/${this.knowledge.pk_id}`})
        },
    }
  }
</script>

<style scoped>

  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;

  }
  
  .me-knowledge-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-knowledge-title {
    font-weight: 600;
  }

  .me-knowledge-icon {
    padding: 3px 8px;
  }

  .me-knowledge-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-artile-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  .me-knowledge-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .me-artile-update{
    float: left;
    margin-right: 20px;
  }

</style>

<template>
    <el-container>

      <el-main class="me-questions">

        <knowledge-item v-for="(knowledge,index) in knowledges" :key="knowledge.pk_id" :knowledge="knowledge" :index="index" ></knowledge-item>

      </el-main>

    </el-container>
</template>

<script>
import KnowledgeItem from './KnowledgeItem'

  export default {
    name: 'Knowledge',
    created() {
      this.getKnowledges();
    },
    updated: function () {
        this.getKnowledges();
    },
    data() {
      return{
        knowledges:[],
      }
    },
    methods: {
      load() {
        this.getKnowledges();
      },

      getKnowledges() {
        let _this=this;
        this.axios
          .get("http://127.0.0.1:5000/knowledge")
          .then(res => {
            if (res.data.flag) {
              _this.knowledges=res.data.data.rows;
            }
          });
          
      },

    },
    components: {
      'knowledge-item': KnowledgeItem
    }
  }
</script>

<style scoped>

  .el-container {
    margin-left:100px;
    width: 960px;
  }

  .el-main {
    padding: 0px;
    margin-top: 10px;
  }


  button {
    margin-left:825px;
    margin-bottom:25px;
    background-color: #008CBA; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
  }

  .publish{
    margin: 10px;
    position: relative;
    right:0px
  }
  

  .text-box {
    max-width: 1000px;
    margin: 80px auto 0;
    margin-top:0px;
  }

  .text-content {
    line-height: 60px;
    font-size: 18px;
    font-weight: normal;
    margin-left: 0px;
    padding-left:20px;
    min-height: 300px !important;
    border:5px solid #ffd461;
    background-color: #ef7b31;
    color:#2c4059;
    border-radius:25px;
    padding-right:20px;
    position: relative;
  }

  .content{
    color:#384359;
  }

  .text-title {
    line-height: 60px;
    font-size: 30px;
    font-weight:  bolder!important;
    margin-left: 0px;
    padding-left:20px;
    padding-right:20px;
    border:5px solid #ffd461;
    background-color: #ea5455;
    color:#2c4059;
    border-radius:25px;
  }

  .me-write-btn {
    margin-top: 10px;
    margin-left:-1000px;
  }
  .me-write-btn2 {
    margin-top: 10px;
    margin-left:-1050px;
  }

  .box{
    margin-left: -520px;
    width: 100%;
  }

  .question-author {
    padding-right: 18px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-question-count {
    padding-left: 14px;
    font-size: 13px;
  }

  .question-footer{
    height:20px;
    position: absolute;
    bottom:30px;
    right:20px;
  }

</style>

<template>

    <div class="text-box">
      <div class="text-title">
        <h1 class="title">{{title}}</h1>
      </div>
      <div class="text-content">
        <p >{{content}}</p>
        <div class="question-footer">
	  	    <span class="question-author">
	    	    <i class="me-icon-author"></i>&nbsp;{{question_owner}}
	        </span>

          <span class="me-pull-right me-question-count">
	    	    <i class="el-icon-time"></i>&nbsp;{{question_date}}
	        </span>

        </div>
      </div>

      <div>
        <p class="content" >&nbsp;&nbsp;评论区：</p>
        <answer-item v-for="(answer,index) in comments" :key="answer.answer_id" :answer="answer" :index="index" ></answer-item>
      </div>

      <div class="my-answer">
        <p class="content" >&nbsp;&nbsp;我的回答：</p>
        <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="myAnswer"
                      placeholder="请输入标题"
                      class="me-write-title">
        </el-input>
        <el-button slot="reference" size="mini" type="danger" class="publish" @click.native="meAnswer()">发布</el-button>
      </div>
    </div>
    
</template>

<script>
import AnswerItem from './AnswerItem'

  export default {
    name: 'viewQuestion',
    created() {
      this.getTheQuestion();
      this.getComments();
    },
    updated: function () {
        this.getComments();
    },
    data() {
      return{
        content:"",
        title:"",
        question_date:"",
        question_owner:"",
        comments:[],
        myAnswer:"",
        conment_id: this.$route.params.id
      }
    },
    methods: {
      load() {
        this.getTheQuestion();
        this.getComments();
      },
      getTheQuestion() {
        let _this=this;
        this.axios
          .get("http://127.0.0.1:5000/question/"+ _this.$route.params.id)
          .then(res => {
            if (res.data.flag) {
              _this.content=res.data.data.data.content;
              _this.title=res.data.data.data.question_title;
              _this.question_date=res.data.data.data.question_date;
              _this.question_owner=res.data.data.data.question_owner;
            }
          });
      },

      getComments() {
        let _this=this;
        this.axios
          .get("http://127.0.0.1:5000/answer/"+ _this.$route.params.id)
          .then(res => {
            if (res.data.flag) {
              _this.comments=res.data.data.rows;
            }
          });
          
      },

      meAnswer(){
        console.log("点击");
        let _this = this;
         this.axios
          .post("http://127.0.0.1:5000/answer/create",{
            content:_this.myAnswer,
            comment_id:_this.$route.params.id,
          } )
          .then(res => {
            if (res.data.flag) {
              console.log(res.data);
              alert("回答已发布。");
            }
          });
      }

    },
    components: {
      'answer-item': AnswerItem
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

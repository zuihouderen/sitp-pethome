<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    
    <div class="me-answer-header">
      <a class="me-answer-title">{{index+1}}楼</a>
    </div>

    <div class="me-artile-description">
      {{content}}
    </div>

    <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @onConfirm="cancelAnswer()"
          >
    <el-button slot="reference" type="info" plain size="small" class="cancel">删除</el-button>
    </el-popconfirm>
    
    <div class="me-answer-footer">
      <!--
	  	<span class="me-question-author">
	    	<i class="me-icon-author"></i>&nbsp;{{author}}
	    </span>
-->
      <span class="me-pull-right me-answer-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createDate}}
	    </span>

    </div>
  </el-card>
</template>


<script>

  export default {
    name: 'AnswerItem',
    props: ['answer','index'],
    data() {
      console.log(this.index);
      return {
        id: this.answer.answer_id,
        content: this.answer.content,
        //author: this.question.question_owner,
        createDate: this.answer.answer_date,
      }
    },
    create(){
         
    },
    methods: {
      cancelAnswer(){
            let _this=this;
            console.log(_this.answer.answer_id);
            this.axios
                .get("http://127.0.0.1:5000/answer/delete/"+_this.answer.answer_id)
                .then(res => {
                  console.log(res.data);
                    if (res.data.flag) {
                }
            });
        }
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
  
  .me-answer-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-answer-title {
    font-weight: 600;
  }

  .me-answer-icon {
    padding: 3px 8px;
  }

  .me-answer-count {
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

  .me-answer-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

</style>

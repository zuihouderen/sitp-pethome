<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div @click="view(id)">
    <div class="me-question-header">
      <a class="me-question-title">{{title}}</a>
    </div>

    <div class="me-artile-description">
      {{summary}}
    </div>
    </div>
    <div class="me-artile-update">
    <el-button slot="reference" type="info" plain size="small" class="update" @click=updateThis()>修改</el-button>
    </div>
    <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @onConfirm="cancelQuestion()"
          >
    <el-button slot="reference" type="info" plain size="small" class="cancel">删除</el-button>
    </el-popconfirm>

    <div class="me-question-footer">
	  	<span class="me-question-author">
	    	<i class="me-icon-author"></i>&nbsp;{{author}}
	    </span>

      <span class="me-pull-right me-question-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createDate}}
	    </span>

    
    </div>
  </el-card>
</template>


<script>

  export default {
    name: 'QuestionItem',
    props: ['question'],
    create(){

    },
    data() {
      return {
        id: this.question.question_id,
        title: this.question.question_title,
        summary: this.question.content.slice(0,30).concat(this.question.content.length>30 ? "...":""),
        author: this.question.question_owner,
        createDate: this.question.question_date
      }
    },
    methods: {
      view(id) {
        this.$router.push({path: `/QA/${id}`})
      },
      updateThis(){
        this.$router.push({path: `/updateQuestion/${this.id}`})
      },
      cancelQuestion(){
            let _this=this;
            console.log(_this.question.question_id);
            this.axios
                .get("http://127.0.0.1:5000/question/delete/"+_this.question.question_id)
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
  
  .me-question-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-question-title {
    font-weight: 600;
  }

  .me-question-icon {
    padding: 3px 8px;
  }

  .me-question-count {
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

  .me-question-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .me-artile-update{
    float: left;
    margin-right: 20px;
  }

</style>

<template>
    <el-container>
      
      <div>
        <div class="b">
          <span> 修改问题</span>
        </div>
      </div>

      <div class="box">
       <el-container class="me-area me-write-box">
        <el-main class="me-write-main">
          <div class="me-write-title">
            
            <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="titles"
                      placeholder="请输入标题"
                      class="me-write-title">
            </el-input>

          </div>
          <div class="me-write-content">
            <el-input resize="none"
                      type="textarea"
                      autosize
                      v-model="contents"
                      placeholder="请输入内容"
                      class="me-write-content">
                      {{former_content}}
              </el-input>
          </div>    
        </el-main>
       </el-container>
      </div>
      
      <div class="me-write-btn">
          <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定取消吗？"
                @onConfirm="turnToQA()"
          >
            <el-button slot="reference" type="info" plain size="small" class="cancel">取消</el-button>
          </el-popconfirm>
      </div>
      <div class="me-write-btn2">
          <el-popconfirm
                confirm-button-text='是的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定发布吗？"
                @onConfirm="publishQuestion()"
          >
            <el-button slot="reference" type="success" plain size="small"  class="publish">发布</el-button>
          </el-popconfirm>
      </div>   
    </el-container>
</template>

<script>

  export default {
    name: 'updateQuestion',
    created() {
        this.getQuestion();
        //console.log(this.former_title);
    },
    data() {
      return{
        contents:"",
        titles:"",
        former_content:"",
        former_title:"",
      }
    },
    methods: {
        load(){
            this.getQuestion();
        },
       turnToQA() {
        this.$router.push({path: `/QA`})
       },
       getQuestion() {
        let _this=this;
        this.axios
          .get("http://127.0.0.1:5000/question/"+ _this.$route.params.id)
          .then(res => {
            if (res.data.flag) {
              _this.titles=res.data.data.data.question_title;
              _this.contents=res.data.data.data.content;
              console.log(this.title);
            }
          });
       },
       publishQuestion(){
         let _this = this;
         console.log(_this.$store.getters.getUser.user_name);
         this.axios
          .post("http://127.0.0.1:5000/question/update",{
            id:_this.$route.params.id,
            title:_this.titles,
            owner:_this.$store.getters.getUser.user_name,
            content:_this.contents
          } )
          .then(res => {
            if (res.data.flag) {
              console.log(res.data);
              alert("问题已修改。");
              this.$router.push({path: `/QA`});
            }
          });
          console.log(this.titles);
       }

    },
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

  span{
    background-image: linear-gradient(135deg, deeppink, dodgerblue);
    font-size: 50px;
    font-weight: bold;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    -moz-box-decoration-break: clone;
    color: transparent;
    position:relative;
  }
  span::selection{
    color:deeppink;
    background-color: #0ff;
  }
 
  .b{
    width: 100%;
    margin-left: 400px;
  }
  .publish{

  }

  .me-write-box {
    max-width: 1000px;
    margin: 80px auto 0;
  }

  .me-write-content {
    line-height: 60px;
    font-size: 18px;
    font-weight: normal;
    margin-left: 0px;
    min-height: 650px !important;
  }

  .me-write-content textarea {
    font-size: 32px;
    font-weight: normal;
    border: none;
  }

  .me-write-title {
    line-height: 60px;
    font-size: 30px;
    font-weight:  bolder!important;
    margin-left: 0px;
  }

  .me-write-titile textarea {
    font-size: 30px;
    font-weight:  bolder!important;
    border: none;
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

</style>

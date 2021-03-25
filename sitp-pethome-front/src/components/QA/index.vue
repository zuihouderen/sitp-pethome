<template>
    <el-container>

      <el-main class="me-questions">
        
        <question-scroll-page></question-scroll-page>

      </el-main>

    </el-container>
</template>

<script>
  import QuestionScrollPage from './QuestionScrollPage'

  export default {
    name: 'Index',
    created() {
    },
    data() {
      return{}
    },
    methods: {

    },
    components: {
      QuestionScrollPage,
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
    line-height: 16px;
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

</style>

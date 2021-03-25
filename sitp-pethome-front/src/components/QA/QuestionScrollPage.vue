<template>
 
<div>
    
    <question-item v-for="question in questions" :key="question.question_id" :question="question" ></question-item>
</div>

</template>

<script>
  import QuestionItem from './QuestionItem'

export default {
    name: "QuestionScrollPage",
    
    created() {
      this.getQuestions()
    },
    updated:function(){
        this.getQuestions()
    },
    data() {
      return {
        questions: []
      }
    },
    methods: {
      load() {
        this.getQuestions()
      },
      view(id) {
        this.$router.push({path: `/QA/${id}`})
      },
      getQuestions() {
        this.axios
          .get("http://127.0.0.1:5000/question/" )
          .then(res => {
            if (res.data.flag) {
              this.questions=res.data.data.rows;
            }
          });
      },
      
    },
    components: {
      'question-item': QuestionItem
    }

  }
  
</script>

<style scoped>
  
</style>

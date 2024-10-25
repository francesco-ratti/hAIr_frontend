<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';


const props = defineProps({
 
});
</script>

<template>
  <div style="margin:1%;">
    <table border="1" v-if="questionList.length">
      <thead>
        <tr>
          <th>Order</th>
          <th>Locale</th>
          <th>Eval. metric</th>
          <th>Question</th>
          <th>Follow up</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(question, questionIndex) in questionList" :key="question.id">
              <tr>
                <td>{{ question.number }}</td>
                <td>{{ question.locale }}</td>
                <td>{{ question.evaluationMetricCSV }}</td>
                <td>{{ question.question }}</td>
                <td>{{ question.additionalQuestionsNumber }}</td>
              </tr>
        </template>
      </tbody>
    </table>
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [] // Changed to an array to hold multiple questions
    };
  },
  methods: {
    async fetchquestionData() {
      try {
        // Fetch question data from API (replace with your actual API URL)
        const response = await axios.get('http://localhost:8080/question/all', {
        headers: { Authorization: `Bearer your_hardcoded_token` }
      });
        this.questionList = response.data; // Set the questions data
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    },
  },
  created() {
    this.fetchquestionData(); // Fetch the question data when the component is created
  }
};
</script>


<style scoped>


table {
  width: 97%;
  border-collapse: collapse; /* Ensure no double borders */
  border: 2px solid #000;    /* Adjust thickness and color */
  border-radius: 15px;       /* Rounded corners */
  overflow: hidden;          /* Ensure content doesn't overflow rounded corners */
}

td, th {
  border: 1px solid #ddd;    /* Inner cell borders, not rounded */
  padding: 10px;             /* Cell padding for better readability */
  text-align: left;          /* Adjust text alignment as needed */
}
</style>
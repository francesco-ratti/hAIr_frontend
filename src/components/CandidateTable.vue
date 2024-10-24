<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
 
});
</script>

<template>
  <div style="margin:1%;">
    <table border="1" v-if="userList.length">
      <thead>
        <tr>
          <!--th>User ID</th-->
          <th>Candidate</th>
          <!--th>Phone Number</th>
          <th>External ID</th>
          <th>Locale</th>
          <!--th>Call ID</th-->
          <th>Call Date</th>
          <th>Completed</th>
          <!--th>Question ID</th-->
          <th>Conversation</th>
          <th>Metric</th>
          <th>Score</th>
          <th>Pos. Tone</th>
          <th>Neut. Tone</th>
          <th>Neg. Tone</th>
          <!--th>Tone</th-->
        </tr>
      </thead>

      <tbody>
  <template v-for="(user, userIndex) in userList" :key="user.id">
    <!-- Check if the user has any calls -->
    <template v-if="user.callList.length === 0">
      <tr>
        <td :rowspan="1">{{ user.name }} {{ user.surname }} <br/> EID: {{ user.externalId }} <br/> {{ user.phoneNumber }} <br/> {{ user.locale }}</td>
        <td colspan="8">No calls available. Please wait while the system calls the candidate.</td> <!-- Placeholder for no calls -->
      </tr>
    </template>

    <template v-for="(call, callIndex) in user.callList" :key="call.id">
      <!-- Check if the call has any scores -->
      <template v-if="call.scores.length === 0">
        <tr>
          <template v-if="callIndex === 0">
            <td :rowspan="1">{{ user.name }} {{ user.surname }} <br/> EID: {{ user.externalId }} <br/> {{ user.phoneNumber }} <br/> {{ user.locale }}</td>
          </template>
          <td :rowspan="1">{{ new Date(call.date).toLocaleString() }}</td>
          <td :rowspan="1">
          <template v-if="call.completed">Yes</template>
          <template v-else>No<br/>
            <a href="#" @click.prevent="newCall(user.id)" style="color: #008000;">
              call again
            </a>
          </template>
        </td>
          <td colspan="6">No scores available. The conversation was incomplete.</td> <!-- Placeholder for no scores -->
        </tr>
      </template>

      <template v-for="(score, scoreIndex) in call.scores" :key="score.id">
        <tr>
          <!-- User Information (only print once, span all score rows for all calls) -->
          <template v-if="callIndex === 0 && scoreIndex === 0">
            <td :rowspan="totalScores(user)">{{ user.name }} {{ user.surname }} <br/> EID: {{ user.externalId }} <br/> {{ user.phoneNumber }} <br/> {{ user.locale }}</td>
          </template>

          <!-- Call Information (only print once, span all score rows for the call) -->
          <template v-if="scoreIndex === 0">
            <td :rowspan="call.scores.length">{{ new Date(call.date).toLocaleString() }}</td>
            
            <td :rowspan="call.scores.length"><template v-if="call.completed">Yes</template>
          <template v-else>No<br/>
            <a href="#" @click.prevent="newCall(user.id)" style="color: #008000;">
              call again
            </a>
          </template></td>
          </template>

          <!-- Scores -->
          <td>

            <template v-if="score.isExpanded ">
            {{ score.newQuestion }}
            </template>
            <template v-else>
            {{ score.predefinedQuestion.question }}
            </template>

            <a href="#" @click.prevent="toggleQuestionExpansion(call, score)" style="color: #008000;">
              {{ score.isExpanded ? '...collapse...' : '...expand...' }}
            </a>
          </td>
          <td>{{ score.predefinedQuestion.evaluationMetricCSV }}</td>
          <td>{{ score.metrics }}</td>
          <td>{{ score.positive }}</td>
          <td>{{ score.neutral }}</td>
          <td>{{ score.negative }}</td>
        </tr>
      </template>
    </template>
  </template>
</tbody>


    </table>
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
import axios from 'axios';

function parseAndMergeResponse(response) {
    // Check if the response is valid and contains data
    if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
    }

    // Initialize an empty string to store the merged output
    let mergedString = "";

    // Iterate over the response array
    response.data.forEach((item, index) => {
        // Determine the prefix based on the index
        const prefix = index % 2 === 0 ? 'BOT: ' : 'CAND: ';
        mergedString += `${prefix}${item} `;
    });

    return mergedString;
}

const config = {
        headers: { Authorization: `Bearer your_hardcoded_token` }
      };

export default {
  data() {
    return {
      userList: [] // Changed to an array to hold multiple users
    };
  },
  methods: {
    async fetchUserData() {
      try {
        // Fetch user data from API (replace with your actual API URL)
        const response = await axios.get('http://ratti.dynv6.net/candidate/all', config);
        this.userList = response.data; // Set the users data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async newCall(userid) {
      try {
        // Fetch user data from API (replace with your actual API URL)
        const response = await axios.post(`http://ratti.dynv6.net/phonecall/callcandidate/${userid}`, config);
      } catch (error) {
        console.error('Error making new call:', error);
      }
    },
    async toggleQuestionExpansion(call, score) {
      // If it's expanded, collapse it
      if (score.isExpanded) {
        score.isExpanded = false;
      } else {
        // If not expanded, fetch the new content if not already fetched
        if (!score.newQuestion) {
          try {
            const response = await axios.get(`http://ratti.dynv6.net/question/conversation/${call.id}/${score.predefinedQuestion.id}`, config);
            score.newQuestion = parseAndMergeResponse(response);
            score.isExpanded = true;
          } catch (error) {
            console.error("Error fetching the conversation:", error);
          }
        }
      }
    },
    /*
    async fetchConversation(callId, scoreId) {
      try {
        // Simulate an API call, replace with the actual API URL
        const response = await axios.get(`https://api.example.com/new-question/${callId}/${scoreId}`);
        const newQuestion = response.data.question;

        // Find the relevant call and score, then update the question
        const user = this.userList.find(u => u.callList.some(c => c.id === callId));
        const call = user.callList.find(c => c.id === callId);
        const score = call.scores.find(s => s.id === scoreId);
        score.predefinedQuestion.question = newQuestion;
      } catch (error) {
        console.error('Error fetching new question:', error);
      }
    },*/
    totalScores(user) {
      return user.callList.reduce((total, call) => total + call.scores.length, 0);
    }
  },
  created() {
    this.fetchUserData(); // Fetch the user data when the component is created
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
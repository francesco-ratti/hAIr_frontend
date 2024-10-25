<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
 
});
</script>
<template>
  <div class="container">
      <form class="question-form" @submit.prevent="submitForm">
        <table>
          <tr>
            <td><label for="externalId">External id:</label></td>
            <td>
              <input
                type="number"
                id="externalId"
                v-model="formData.externalId"
                required
                class="form-control"
              />
            </td>
          </tr>

          <tr>
            <td><label for="name">Name:</label></td>
            <td>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td><label for="surname">Surname:</label></td>
            <td>
              <input
                type="text"
                id="surname"
                v-model="formData.surname"
                required
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td><label for="phonenumber">Phone number:</label></td>
            <td>
              <input
                type="text"
                id="surname"
                v-model="formData.phonenumber"
                required
                class="form-control"
              />
            </td>
          </tr>

          <tr>
            <td><label for="locale">Locale:</label></td>
            <td>
              <select id="locale" v-model="formData.locale" required class="form-control">
                <option value="IT_IT">Italian (IT_IT)</option>
                <option value="EN_EN">English (EN_EN)</option>
              </select>
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <button type="submit" class="btn btn-primary">Insert candidate</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

const config = {
        headers: { 
          'Content-Type': 'application/json', // Set the content type
          'Authorization': `Bearer your_hardcoded_token` }
      };
export default {
  data() {
    return {
      formData: {
        number: '',
        locale: 'IT_IT', // Default value
        evaluationMetricsCSV: '',
        question: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:8080/candidate/new', JSON.stringify(this.formData), config);
        this.$emit('refresh-table')
      }
      catch (error) {
        console.error('Error making POST request:', error);      
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 20%;
  padding-right: 20%;

}

.question-form {
  width:100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse; /* Ensures no space between table cells */
}

td {
  padding: 4px;
  vertical-align: top;
  border: none; /* Removes any table cell borders */
}

td:first-child {
  text-align: left;
  padding-right: 20px;
}

textarea, input, select {
  width: 100%;
}

.form-control {
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  margin-top: 4px;
  width: 100%;
}
</style>

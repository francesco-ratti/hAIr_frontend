<script setup>
import QuestionsTable from '@/components/QuestionsTable.vue';
import NewQuestionForm from '@/components/NewQuestionForm.vue';


</script>

<template>
    <NewQuestionForm @refresh-table="handleRefresh"/>
    <QuestionsTable :key="childKey" />
</template>

<script>
export default {
  components: {
    NewQuestionForm,
    QuestionsTable
  },
  data() {
    return {
      childKey: 0, // Initial key value
    };
  },
  methods: {
    handleRefresh() {
      this.childKey += 1; //for an unknown reason, calling the child method using $refs does not work. re-render the component.      
    }
  }
}
</script>
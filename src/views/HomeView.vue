<script setup>
import CandidateTable from '@/components/CandidateTable.vue';
import NewCandidateForm from '@/components/NewCandidateForm.vue';

</script>

<template>
    <NewCandidateForm @refresh-table="handleRefresh"/>
    <CandidateTable :key="childKey" />
</template>

<script>
export default {
  components: {
    NewCandidateForm,
    CandidateTable
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
<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/dossiers"
        class="text-violet-500 hover:text-violet-600 flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Torna alla lista dei dossiers
      </RouterLink>
    </div>
  </section>
</template>

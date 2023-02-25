<template>
  <div>
    <MainSection title="Home" :loading="loading"> Content </MainSection>
  </div>
</template>

<script lang="ts" setup>
  const loading = ref(false);
</script>

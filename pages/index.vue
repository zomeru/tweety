<template>
  <div>
    <MainSection title="Home" :loading="loading"> {{ user }} </MainSection>
  </div>
</template>

<script lang="ts" setup>
  const { useAuthUser } = useAuth();

  const loading = ref(false);
  const user = useAuthUser();
</script>

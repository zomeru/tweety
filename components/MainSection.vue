<template>
  <div>
    <div
      class="stick top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80"
    >
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        {{ props.title }}
      </h2>
    </div>
    <div v-if="loading">
      <span>...loading</span>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface MainSectionProps {
    title: string;
    loading: boolean;
  }

  const props = defineProps<MainSectionProps>();
</script>

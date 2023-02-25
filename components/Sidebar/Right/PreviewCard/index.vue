<template>
  <div
    class="m-2 border rounded-2xl tweety-border-color bg-gray-50 dark:bg-dim-700 overflow-hidden"
  >
    <h1
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white tweety-border-color"
    >
      {{ props.title }}
    </h1>
    <slot />
    <div
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 default-transition"
    >
      Show more
    </div>
  </div>
</template>

<script setup lang="ts">
  interface PreviewCardProps {
    title: string;
  }

  const props = defineProps<PreviewCardProps>();
</script>

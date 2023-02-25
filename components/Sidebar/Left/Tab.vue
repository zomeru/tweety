<template>
  <NuxtLink
    to="#"
    class="flex items-center p-3 w-min hover:bg-gray-200 text-black default-transition rounded-full dark:hover:bg-dim-200 dark:text-white"
  >
    <div class="w-6 h-6 text-dark">
      <slot name="icon" />
    </div>
    <div class="hidden ml-4 text-xl lg:block" :class="textClasses">
      <slot name="name" />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
  interface TabProps {
    active: boolean;
  }

  const props = defineProps<TabProps>();

  const textClasses = computed(() =>
    props.active ? 'font-semibold' : 'font-normal'
  );
</script>

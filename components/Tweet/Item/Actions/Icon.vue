<template>
  <div
    @click.stop.prevent="emits('onClick')"
    class="flex items-center text-gray-400 cursor-pointer group"
  >
    <div
      :class="`p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 rounded-full default-transition dark:group-hover:bg-opacity-20`"
    >
      <!-- <ChatIcon class="w-5 h-5" /> -->
      <slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
    </div>
    <span :class="`ml-1 group-hover:text-${props.color}-400`">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
  interface IconProps {
    color: string;
    size: number;
  }

  interface IconEmits {
    (e: 'onClick'): void;
  }

  const emits = defineEmits<IconEmits>();

  const props = withDefaults(defineProps<IconProps>(), {
    size: 5,
  });
</script>

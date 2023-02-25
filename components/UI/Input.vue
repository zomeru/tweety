<template>
  <div>
    <label
      :for="props.label?.toLocaleLowerCase()"
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        :type="props.type || 'text'"
        :value="props.modelValue"
        :id="props.label?.toLocaleLowerCase()"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="placeholder"
        @input="event => emits('update:modelValue', handleInputChange(event))"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { InputHTMLAttributes } from 'vue';

  interface InputProps {
    modelValue: string;
    label?: string;
    placeholder?: string;
    type?: InputHTMLAttributes['type'];
  }

  const props = defineProps<InputProps>();
  const emits = defineEmits(['update:modelValue']);

  const handleInputChange = (event: Event) => {
    return (event.target as HTMLInputElement).value;
  };
</script>

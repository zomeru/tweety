<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      v-for="action in actions"
      :color="action.color"
      :key="action.name"
      :size="size"
      @onClick="action.onClick ? action.onClick() : null"
    >
      <template v-slot:icon="{ classes }">
        <component :is="action.Icon" :class="classes" />
      </template>

      <template v-slot:default v-if="showStats"> {{ action.count }}</template>
    </TweetItemActionsIcon>
  </div>
</template>

<script lang="ts" setup>
  import {
    ChatIcon,
    RefreshIcon,
    HeartIcon,
    UploadIcon,
  } from '@heroicons/vue/outline';
  import { TweetResponse } from '~~/types/tweets';

  interface ActionProps {
    tweet: TweetResponse;
    compact?: boolean;
  }

  interface ActionEmits {
    (e: 'onCommentClick'): void;
  }

  const showStats = computed(() => props.compact);
  const size = computed(() => (props.compact ? 5 : 8));

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  const props = withDefaults(defineProps<ActionProps>(), {
    compact: false,
  });
  const emits = defineEmits<ActionEmits>();

  const actions = computed(() => [
    {
      name: 'Comment',
      Icon: ChatIcon,
      count: props.tweet.repliesCount,
      color: 'blue',
      onClick: () => emits('onCommentClick'),
    },
    {
      name: 'Retweet',
      Icon: RefreshIcon,
      count: generateRandomNumber(),
      color: 'green',
    },
    {
      name: 'Like',
      Icon: HeartIcon,
      count: generateRandomNumber(),
      color: 'red',
    },
    {
      name: 'Share',
      Icon: UploadIcon,
      count: generateRandomNumber(),
      color: 'blue',
    },
  ]);
</script>

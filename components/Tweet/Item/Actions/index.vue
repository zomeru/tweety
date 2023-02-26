<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      v-for="action in actions"
      :color="action.color"
      :key="action.name"
    >
      <template v-slot:icon="{ classes }">
        <component :is="action.Icon" :class="classes" />
      </template>

      <template v-slot:default> {{ action.count }} </template>
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
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  const props = defineProps<ActionProps>();

  const actions = computed(() => [
    {
      name: 'Comment',
      Icon: ChatIcon,
      count: generateRandomNumber(),
      color: 'blue',
    },
    {
      name: 'Retweet',
      Icon: RefreshIcon,
      count: props.tweet.repliesCount,
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

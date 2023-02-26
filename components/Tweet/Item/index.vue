<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div class="ml-16">
      <p class="flex-shrink font-medium w-auto text-gray-800 dark:text-white">
        {{ props.tweet.text }}
      </p>

      <div
        v-for="image in props.tweet.mediaFiles"
        :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl tweety-border-color"
      >
        <img :src="image.url" alt="" class="w-full rounded-2xl" />
      </div>

      <div class="mt-2">
        <TweetItemActions :tweet="tweet" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  interface TweetItemProps {
    tweet: TweetResponse;
  }

  const props = defineProps<TweetItemProps>();
</script>

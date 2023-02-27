<template>
  <div>
    <div v-if="isFeedEmpty">
      <p class="text-center text-xl text-gray-500 mt-10">No tweets</p>
    </div>

    <div
      v-else
      class="pb-4 border-b tweety-border-color hover:bg-gray-100 dark:hover:bg-dim-300 default-transition cursor-pointer"
      v-for="tweet in props.tweets"
      :key="tweet.id"
      @click.native="redirect(tweet)"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  interface ListFeedProps {
    tweets: TweetResponse[];
  }

  const props = defineProps<ListFeedProps>();

  const isFeedEmpty = computed(() => props.tweets.length === 0);

  function redirect(tweet: TweetResponse) {
    navigateTo(`/status/${tweet.id}`);
  }
</script>

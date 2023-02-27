<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div :class="tweetBodyWrapper">
      <NuxtLink :to="`/status/${props.tweet.id}`">
        <p
          class="flex-shrink font-medium w-auto text-gray-800 dark:text-white"
          :class="textSize"
        >
          {{ props.tweet.text }}
        </p>

        <div
          v-for="image in props.tweet.mediaFiles"
          :key="image.id"
          class="flex my-3 mr-2 border-2 rounded-2xl tweety-border-color"
        >
          <img :src="image.url" alt="" class="w-full rounded-2xl" />
        </div>
      </NuxtLink>

      <div class="mt-2" v-if="!props.hideActions">
        <TweetItemActions
          :tweet="tweet"
          :compact="props.compact"
          @onCommentClick="handleCommentClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  interface TweetItemProps {
    tweet: TweetResponse;
    compact: boolean;
    hideActions: boolean;
  }

  const props = withDefaults(defineProps<TweetItemProps>(), {
    compact: false,
    hideActions: false,
  });

  const emitter = useEmitter();

  const tweetBodyWrapper = computed(() => (props.compact ? 'ml-16' : 'ml-2'));
  const textSize = computed(() => (props.compact ? 'text-base' : 'text-xl'));

  function handleCommentClick() {
    emitter.$emit('replyTweet', props.tweet);
  }
</script>

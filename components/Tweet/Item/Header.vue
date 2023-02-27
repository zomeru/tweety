<template>
  <div class="flex p-4">
    <div>
      <img
        class="rounded-full w-10 h-10"
        :src="author?.profileImage || ''"
        alt=""
      />
    </div>

    <div class="ml-3">
      <span class="font-medium text-gray-800 dark:text-white">{{
        author?.name
      }}</span>

      <span class="ml-3 text-sm font-medium text-gray-400">
        <NuxtLink to="#">@{{ author?.username }}</NuxtLink>
        . {{ props.tweet.postedAt }}
      </span>

      <p v-if="props.tweet.replyTo">
        <span class="text-gray-500"> Replying to </span>

        <span @click="goToReplyToTweet" class="text-blue-400 cursor-pointer">
          @{{ props.tweet.replyTo?.author?.username }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  interface ItemHeaderProps {
    tweet: TweetResponse;
  }

  const router = useRouter();

  const props = defineProps<ItemHeaderProps>();
  const author = props.tweet.author;
  const replyToTweetUrl = computed(
    () => `/status/${props.tweet.replyTo?.id || ''}`
  );

  const goToReplyToTweet = () => {
    if (props.tweet.replyTo) {
      router.push(replyToTweetUrl.value);
    }
  };
</script>

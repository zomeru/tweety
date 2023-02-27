<template>
  <div>
    <TweetItem :tweet="props.tweet" />
    <TweetForm
      :user="props.user"
      placeholder="Tweet your reply"
      :replyTo="props.tweet"
    />
    <TweetListFeed v-if="replies.length" :tweets="replies" />
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';
  import { UserResponseType } from '~~/types/user';

  interface DetailsProps {
    tweet: TweetResponse;
    user: UserResponseType;
  }

  const props = defineProps<DetailsProps>();

  const replies = computed(
    () => (props.tweet.replies as TweetResponse[]) || []
  );
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetItem
        :tweet="props.replyTo"
        v-if="props.replyTo && props.showReply"
        hideActions
      />
      <TweetFormInput
        :user="props.user"
        @onSubmit="handleFormSubmit"
        :placeholder="props.placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetInput } from '~~/composables/useTweets';
  import { TweetResponse } from '~~/types/tweets';
  import { UserResponseType } from '~~/types/user';

  interface TweetFormProps {
    user: UserResponseType;
    placeholder?: string;
    replyTo?: TweetResponse['replyTo'];
    showReply?: boolean;
  }

  interface TweetFormEmits {
    (e: 'onSuccess'): void;
  }

  const { postTweet } = useTweets();

  const loading = ref(false);

  const props = withDefaults(defineProps<TweetFormProps>(), {
    showReply: false,
  });
  const emits = defineEmits<TweetFormEmits>();

  async function handleFormSubmit(data: TweetInput) {
    try {
      loading.value = true;
      await postTweet({
        ...data,
        replyTo: props.replyTo?.id,
      }).then(res => {
        emits('onSuccess');
        navigateTo(`/status/${res.tweet.id}`);
        return res;
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      loading.value = false;
    }
  }
</script>

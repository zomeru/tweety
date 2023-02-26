<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetInput } from '~~/composables/useTweets';
  import { UserResponseType } from '~~/types/user';

  interface TweetFormProps {
    user: UserResponseType;
  }

  const { postTweet } = useTweets();

  const loading = ref(false);

  const props = defineProps<TweetFormProps>();

  async function handleFormSubmit(data: TweetInput) {
    try {
      loading.value = true;
      const response = await postTweet(data);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    } finally {
      loading.value = false;
    }
  }
</script>

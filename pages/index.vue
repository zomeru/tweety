<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home | Tweety</Title>
      </Head>

      <div class="border-b tweety-border-color">
        <TweetForm :user="user" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  const { useAuthUser } = useAuth();
  const { getTweets } = useTweets();

  const loading = ref(false);
  const user = useAuthUser();
  const homeTweets = ref<TweetResponse[]>([]);

  onBeforeMount(async () => {
    loading.value = true;

    try {
      const { tweets } = await getTweets();
      homeTweets.value = tweets || [];
    } catch (error) {
      console.log('error', error);
    } finally {
      loading.value = false;
    }
  });
</script>

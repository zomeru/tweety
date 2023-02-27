<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search | Tweety</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';
  import { useRoute } from 'vue-router';

  const { getTweets } = useTweets();

  const route = useRoute();

  const loading = ref(false);
  const searchTweets = ref<TweetResponse[]>([]);
  const searchQuery = route.query.query;

  async function _getTweets() {
    loading.value = true;

    try {
      const { tweets } = await getTweets({
        query: searchQuery,
      });
      searchTweets.value = tweets || [];
    } catch (error) {
      console.log('error', error);
    } finally {
      loading.value = false;
    }
  }

  watch(() => route.fullPath, _getTweets);

  onBeforeMount(_getTweets);
</script>

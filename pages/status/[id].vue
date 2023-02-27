<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Home | Tweety</Title>
      </Head>
      <TweetDetails
        :key="id"
        v-if="currentTweet"
        :user="user"
        :tweet="currentTweet"
      />
    </MainSection>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from '~~/types/tweets';

  const loading = ref(false);
  const currentTweet = ref<TweetResponse | null>(null);
  const { getTweetById } = useTweets();
  const { useAuthUser } = useAuth();
  const user = useAuthUser();
  const route = useRoute();
  // const id = computed(() => route.params.id as string);
  const id = route.params.id as string;

  watch(() => route.fullPath, getTweet);

  // console.log('id', id.value);
  console.log('params', route);

  async function getTweet() {
    try {
      loading.value = true;
      const { tweet } = await getTweetById(id);
      currentTweet.value = tweet;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(getTweet);
</script>

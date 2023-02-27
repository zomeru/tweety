<template>
  <div :class="{ dark: theme === 'dark' }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="userLoading" />

      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs:col-span-1 lg:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                :user="user"
                @onTweet="openPostTweetModal"
                @onLogout="handleUserLogout"
              />
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 lg:col-span-6">
            <RouterView></RouterView>
          </main>

          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block lg:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <!-- Auth Page -->
      <AuthPage v-else />

      <UIModal :isOpen="postTweetModalStatus" @onClose="closePostTweetModal">
        <TweetForm
          :user="user"
          @onSuccess="closePostTweetModal"
          :replyTo="replyTweet"
          showReply
        />
      </UIModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TweetResponse } from './types/tweets';

  const {
    closePostTweetModal,
    openPostTweetModal,
    usePostTweetModalStatus,
    useReplyTweet,
  } = useTweets();
  const { useAuthUser, initAuth, useUserLoading, logout } = useAuth();
  const { useCurrentTheme, getTheme, setTheme } = useThemeMode();

  const theme = useCurrentTheme();

  const postTweetModalStatus = usePostTweetModalStatus();
  const user = useAuthUser();
  const userLoading = useUserLoading();
  const replyTweet = useReplyTweet();

  const emitter = useEmitter();
  emitter.$on('replyTweet', tweet => {
    openPostTweetModal(tweet as TweetResponse);
  });

  emitter.$on('toggleTheme', () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  });

  function handleUserLogout() {
    logout();
  }

  onBeforeMount(() => {
    getTheme();
    initAuth();
  });

  // onMounted(getTheme);
</script>

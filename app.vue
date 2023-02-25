<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="!loadingUser">
        <!-- App -->
        <div v-if="user" class="min-h-full">
          <div
            class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
          >
            <!-- Left sidebar -->
            <div class="hidden md:block xs:col-span-1 xl:col-span-2">
              <div class="sticky top-0">
                <SidebarLeft />
              </div>
            </div>

            <!-- Main content -->
            <main class="col-span-12 bg-red-50 md:col-span-8 xl:cols-pan-6">
              <RouterView></RouterView>
            </main>

            <!-- Right sidebar -->
            <div
              class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3"
            >
              <div class="sticky top-0">
                <SidebarRight />
              </div>
            </div>
          </div>
        </div>
        <!-- Auth Page -->
        <AuthPage v-else />
      </div>
      <div v-else>
        <div class="flex items-center justify-center h-screen">...Loading</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import './styles/main.css';
  const darkMode = ref(false);

  const { useAuthUser, initAuth, loadingUser } = useAuth();
  const user = useAuthUser();
  console.log('user', user.value);

  onBeforeMount(() => {
    initAuth();
  });
</script>

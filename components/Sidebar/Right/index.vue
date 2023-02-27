<template>
  <div class="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <SearchIcon @click="handleSearch" />
        </div>
      </div>
      <input
        type="text"
        class="flex items-center w-full pl-12 text-sm font-normal dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline0none focus:border-blue-200 h-9 text-black"
        placeholder="Search..."
        v-model="search"
      />
    </div>

    <!-- Preview Card : What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem
        v-for="item in whatsHapenning"
        :key="item.title"
      >
        <h2 class="font-bold text-gray-800 text-md dark:text-white">
          {{ item.title }}
        </h2>
        <p class="text-xs text-gray-400">{{ item.count }} Tweets</p>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card: Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="item in whoToFollow" :key="item.name">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="item.image"
              :alt="item.name"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ item.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ item.username }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2" v-for="link in footerLinks">
          <a
            :href="link.href"
            @click.prevent="link.handler ? link.handler() : null"
            class="hover:underline"
            >{{ link.name }}</a
          >
        </li>
        <li class="inline-block mx-2">@ 2023 Tweety, Inc.</li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { SearchIcon } from '@heroicons/vue/outline';

  const { useCurrentTheme } = useThemeMode();
  const currentTheme = useCurrentTheme();

  const emitter = useEmitter();
  const handleToggleDarkMode = () => {
    emitter.$emit('toggleTheme');
  };

  const footerLinks = computed(() => [
    {
      name: currentTheme.value === 'dark' ? 'Light Mode' : 'Dark Mode',
      href: '#',
      handler: handleToggleDarkMode,
    },
    {
      name: 'Privacy Policy',
      href: '#',
    },
    {
      name: 'Cookie Policy',
      href: '#',
    },
    {
      name: 'Accessibility',
      href: '#',
    },
    {
      name: 'Ads info',
      href: '#',
    },
    {
      name: 'More',
      href: '#',
    },
  ]);

  const search = ref('');

  const handleSearch = () => {
    useRouter().push({
      name: 'search',
      params: {
        query: search.value,
      },
    });
  };

  const whatsHapenning = ref([
    {
      title: 'SpaceX',
      count: '1.1M',
    },
    {
      title: '#zomeru',
      count: '100.3K',
    },
    {
      title: '#codingisfun',
      count: '50.2K',
    },
  ]);

  const whoToFollow = ref([
    {
      name: 'Zomer Gregorio',
      username: '@zomeru',
      image: 'https://avatars.githubusercontent.com/u/19688908?v=4',
    },
    {
      name: 'Zomer Gregorio',
      username: '@zomeru',
      image: 'https://avatars.githubusercontent.com/u/19688908?v=4',
    },
    {
      name: 'Zomer Gregorio',
      username: '@zomeru',
      image: 'https://avatars.githubusercontent.com/u/19688908?v=4',
    },
  ]);
</script>

<template>
  <div class="flex flex-col">
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
  </div>
</template>

<script lang="ts" setup>
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

<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20 default-transition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-7">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab
        v-for="item in sidebarItems"
        :active="item.active"
        :key="item.name"
      >
        <template v-slot:icon>
          <!-- <item.Icon /> -->
          <component :is="item.Icon" />
        </template>
        <template v-slot:name> {{ item.name }} </template>
      </SidebarLeftTab>

      <div class="hidden lg:block">
        <UIButton liquid size="lg">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>

      <div class="block lg:hidden">
        <UIButton>
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PencilIcon } from '@heroicons/vue/outline';
  import { sidebarItems } from '~~/constants';
</script>

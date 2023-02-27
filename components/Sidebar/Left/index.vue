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
        <UIButton liquid size="lg" @onClick="emits('onTweet')">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>

      <div class="block lg:hidden">
        <UIButton @onClick="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800 default-transition"
      @click="emits('onLogout')"
    >
      <div class="flex flex-row">
        <img
          :src="(props.user.profileImage as string)"
          alt=""
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-col hidden ml-2 lg:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ props.user.name }}
          </h1>
          <p class="text-sm text-gray-400">@{{ props.user.username }}</p>
        </div>
      </div>

      <div class="hidden ml-auto lg:block">
        <div class="w-6 h-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PencilIcon, ChevronDownIcon } from '@heroicons/vue/outline';
  import { sidebarItems } from '~~/constants';
  import { UserResponseType } from '~~/types/user';

  interface SidebarLeftProps {
    user: UserResponseType;
  }

  interface SidebarLeftEmits {
    (e: 'onTweet'): void;
    (e: 'onLogout'): void;
  }
  const props = defineProps<SidebarLeftProps>();
  const emits = defineEmits<SidebarLeftEmits>();
</script>

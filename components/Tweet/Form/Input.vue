<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img
          :src="props.user?.profileImage || ''"
          :alt="props.user?.name || ''"
          class="inline-block w-10 h-10 rounded-full"
        />
      </div>
      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0 overflow-hidden"
          :placeholder="props.placeholder || `What's happening?`"
          style="resize: none"
        />
      </div>
    </div>

    <!-- File selector -->
    <div class="p-4 pl-16">
      <img
        :src="inputImageUrl"
        v-if="inputImageUrl"
        alt="Selected File"
        class="rounded-2xl border tweety-border-color"
      />

      <input
        hidden
        type="file"
        id="file"
        ref="imageInput"
        accept="image/png, image/jpeg"
        @change="handleFileChange"
      />
      <input
        hidden
        type="file"
        id="file"
        ref="gifInput"
        accept="image/gif"
        @change="handleFileChange"
      />
    </div>

    <!-- Icons -->
    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div
          v-for="icon in icons"
          :key="icon.name"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
          @click="icon.handler"
        >
          <component :is="icon.component"></component>
        </div>
      </div>

      <div>
        <UIButton
          size="sm"
          :disabled="tweetBtnDisabled"
          @onClick="handleFormSubmit"
        >
          <span class="font-bold"> Tweet </span>
        </UIButton>
        <!-- <button @click="handleFormSubmit">Tweet</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { UserResponseType } from '~~/types/user';
  import IconImage from '~~/components/Icon/Image.vue';
  import IconGif from '~~/components/Icon/Gif.vue';
  import IconChart from '~~/components/Icon/Chart.vue';
  import IconEmoji from '~~/components/Icon/Emoji.vue';
  import IconCalendar from '~~/components/Icon/Calendar.vue';
  import { TweetInput } from '~~/composables/useTweets';

  const icons = [
    {
      name: 'IconImage',
      component: IconImage,
      handler: handleImageClick,
    },
    {
      name: 'IconGif',
      component: IconGif,
      handler: handleGifClick,
    },
    {
      name: 'IconChart',
      component: IconChart,
    },
    {
      name: 'IconEmoji',
      component: IconEmoji,
    },
    {
      name: 'IconCalendar',
      component: IconCalendar,
    },
  ];

  interface FormInputProps {
    user: UserResponseType;
    placeholder?: string;
  }

  interface FormInputEmits {
    (e: 'onSubmit', data: TweetInput): void;
  }

  const props = defineProps<FormInputProps>();
  const emits = defineEmits<FormInputEmits>();

  const text = ref('');
  const inputImageUrl = ref<string | null>(null);
  const selectedFile = ref<File | null>(null);

  const imageInput = ref<HTMLInputElement | null>(null);
  const gifInput = ref<HTMLInputElement | null>(null);

  const tweetBtnDisabled = computed(() => text.value.length === 0);

  function handleFormSubmit() {
    const _mediaFiles = selectedFile.value ? [selectedFile.value] : [];
    emits('onSubmit', { text: text.value, mediaFiles: _mediaFiles });
  }

  function handleImageClick() {
    imageInput.value?.click();
  }

  function handleGifClick() {
    gifInput.value?.click();
  }

  function handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      selectedFile.value = file;

      const reader = new FileReader();

      reader.onload = event => {
        inputImageUrl.value = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
</script>

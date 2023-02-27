<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UIInput
        label="Username"
        placeholder="Username or email"
        v-model="credentials.username"
      />
      <UIInput
        label="Password"
        placeholder="Username or email"
        type="password"
        v-model="credentials.password"
      />

      <UIButton liquid :disabled="isAuthButtonDisabled" @onClick="handleLogin">
        Login</UIButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { login } = useAuth();

  const credentials = reactive({
    username: '',
    password: '',
    loading: false,
  });

  async function handleLogin() {
    credentials.loading = true;

    try {
      await login({
        usernameOrEmail: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      console.log('error form', error);
    } finally {
      credentials.loading = false;
    }
  }

  const isAuthButtonDisabled = computed(() => {
    return (
      credentials.loading || !credentials.username || !credentials.password
    );
  });
</script>

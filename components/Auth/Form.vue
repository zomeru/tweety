<template>
  <div>
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
      <h2>{{ credentials.username }}</h2>
      <div>
        <button @click="handleLogin" :disabled="credentials.loading">
          Log in
        </button>
      </div>
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
      login({
        usernameOrEmail: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      console.log('error form', error);
    } finally {
      credentials.loading = false;
    }
  }
</script>

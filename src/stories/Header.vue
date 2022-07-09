<!-- eslint-disable prettier/prettier -->
<template>
  <header>
    <div class="wrapper">
      <div id="logo">
        <img src="../assets/logo (2).png" alt="logo"/>
        <img src="../assets/texto (2) ampliado.png" alt="nomeEmpresa" id="nomeEmpresa">
      </div>
      <div>
        <span class="welcome" v-if="user"
          >Welcome, <b>{{ user.name }}</b
          >!</span
        >
        <my-button
          size="large"
          @onClick="onLogout"
          label="Log out"
          v-if="user"
        />
        <my-button
          size="small"
          @onClick="onLogin"
          label="Log in"
          v-if="!user"
        />
        <my-button
          primary
          size="small"
          @onClick="onCreateAccount"
          label="Sign up"
          v-if="!user"
        />
      </div>
    </div>
  </header>
</template>

<script>
import "./header.css";
import MyButton from "./Button.vue";

export default {
  name: "my-header",

  components: { MyButton },

  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    onLogin() {
      this.$emit("onLogin");
    },
    onLogout() {
      this.$emit("onLogout");
    },
    onCreateAccount() {
      this.$emit("onCreateAccount");
    },
  },
};
</script>

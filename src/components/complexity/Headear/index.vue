<!-- eslint-disable prettier/prettier -->
<template>
  <header>
    <div class="wrapper">
      <div id="logo">
        <img src="../../../assets/logo.png" alt="logo" id="logo-image"/>
        <img
          src="../../../assets/logo-name.png"
          alt="nomeEmpresa"
          id="nomeEmpresa"
        />
      </div>
      <div>
        <span class="welcome"
          >Welcome, <b>{{ usuario }}</b
          >!</span
        >
        <my-button
          primary
          size="medium"
          @onClick="onLogout"
          label="Log out"
          color="#ffffff"
        />
      </div>
    </div>
  </header>
</template>

<script>
import "./styles.css";
import MyButton from "../../comuns/Button.vue";
import Cookies from "js-cookie";
export default {
  name: "my-header",

  components: { MyButton },

  props: {
  },
  data() {
    return {
      usuario: Cookies.get("user_name"),
    };
  },
  methods: {
    onLogout() {
      this.$emit("onLogout");
    },
  },
  mounted() {
  },
};
</script>

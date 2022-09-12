<template>
  <v-app>
    <v-main>
      <MyHeader v-if="showHeader" @onLogout="onLogout" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from "./components/complexity/Headear/index.vue";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  name: "App",

  components: {
    MyHeader,
  },
  computed: {
    showHeader () {
      return this.$route.name !== 'Home' && this.$route.name !== 'Login'
    }
  },
  data: () => ({
    //
  }),
  methods: {
    async onLogout() {
      await Cookies.set("token", null);
      await Cookies.set("refreshToken", null);
      await Cookies.set("user_name", null);
      await Cookies.set("user_metas", null);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

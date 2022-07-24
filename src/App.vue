<template>
  <v-app>
    <v-main>
      <MyHeader v-if="showHeader" @onLogout="onLogout" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from "./components/complexity/Header.vue";
import Cookies from "js-cookie";
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
    },
  },
};
</script>

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index.js";
import VueResource from "vue-resource";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);


Vue.use(VueResource);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

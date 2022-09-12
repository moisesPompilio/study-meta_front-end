
<template>
  <article>
    <section id="login-section">
      <form @submit.prevent="submit()">
        <v-card>
          <v-tabs>
            <v-tabs-slider color="#FF914D"></v-tabs-slider>
            <v-tab @click="create = false" color="#38B6FF">Login</v-tab>
            <v-tab @click="create = true" color="#38B6FF">Create</v-tab>
          </v-tabs>
        </v-card>
        <v-card id="login">
          <v-row id="logo-completa">
            <img
              id="logo-completa-img"
              src="../../../assets/logo-completa.png"
              alt="logoCompleta"
            />
          </v-row>
          <v-row>
            <input
              id="email"
              class="input-login"
              v-model="form.email"
              placeholder="Email"
              type="email"
              outlined
              required
              dense
            />
          </v-row>
          <v-row v-if="create">
            <input
              id="name"
              class="input-login"
              v-model="form.name"
              placeholder="Name"
              outlined
              required
              dense
            />
          </v-row>
          <v-row>
            <input
              id="passowrd"
              class="input-login"
              required
              v-model="form.senha"
              placeholder="Passowrd"
              type="password"
            />
          </v-row>
          <v-row v-if="create">
            <input
              id="confimedPassowrd"
              class="input-login"
              required
              v-model="form.confirmacaoSenha"
              placeholder="Confimed Passowrd"
              type="password"
            />
          </v-row>
         <v-btn type="submit" id="enviar-login" > Entrar</v-btn> 
        </v-card>
      </form>
    </section>
  </article>
</template>

<script>
import "./Login.css";
import Axios from "axios";
import MyButton from "../../../components/comuns/Button.vue";
//import { api, baseApiUrl } from "../../../config/axios";
import api from "../../../config/axios";
import MyHeader from "../../../components/complexity/Headear/index.vue";
import Cookies from "js-cookie";

export default {
  name: "my-page",

  components: { MyHeader, MyButton },

  data() {
    return {
      form: {
        email: "",
        senha: "",
      },
      create: false,
    };
  },

  methods: {
    submit() {
      let body = this.form;
      if (!this.create) {
        Axios.post("http://localhost:3000/auth/login", body)
          .then(async (res) => {
            await Cookies.set("token", res.data.token.token);
            await Cookies.set("refreshToken", res.data.token.refreshToken);
            await Cookies.set("user_name", res.data.name);
            console.log(res.data);
            this.$router.push({ name: "Metas" });
          })
          .catch(async (error) => {
            let message = await error.response.data.msg;
            console.log(message);
            this.$alert(message, "Error", "error", {
             confirmButtonText: "Got it!"
            });
          });
      } else {
        Axios.post("http://localhost:3000/usuario", body)
          .then(async (res) => {
            this.$alert(`Created the user is success`, "Success", "success", {
              confirmButtonText: "Got it!",
            });
            this.create = await false;
            this.submit();
          })
          .catch(async (error) => {
            let message = await error.response.data.msg;
            console.log(message);
            this.$alert(message, "Error", "error", {
             confirmButtonText: "Got it!"
            });
          });
      }
    },
  },
  mounted() {
    //console.log(api.get("materia"));
  },
};
</script>

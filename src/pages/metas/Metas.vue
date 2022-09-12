<template>
  <main>
    <v-parallax id="background" width="100%" height="100%" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <article>

        <v-card id="menu">
          <v-row id="title">
            <h1>ESTABLISHEDS-META</h1>
          </v-row>
          <v-row id="filter">
            <v-col sm="4">
              <v-text-field placeholder="Filter by Tilte" v-model="filterTiltulo" />
            </v-col>
            <v-col sm="4" id="col-add">
              <MyButton id="button-add" primary size="medium" @onClick="edit = true, editIten = {}" label="ADD META"
                color="#ffffff" />
            </v-col>
            <v-col sm="4">
              <v-text-field dense placeholder="Filter by decription" v-model="filterDescricao" />
            </v-col>
          </v-row>
        </v-card>
        <div id="metas" v-for="meta of metasFiltro" :key="meta.id">
          <v-card class="meta-iten">
            <v-row>
              <h2>{{ meta.titulo }}</h2>
            </v-row>
            <v-row>
              <p>{{ meta.descricao }}</p>
            </v-row>
            <v-row>
              <h3>Study hours: {{ formatTime(meta.horasEstudo) }}h</h3>
            </v-row>
            <v-row class="buttons-meta">
              <v-col cols="12" sm="6" md="3">
                <MyButton class="button" primary size="medium" @onClick="study(meta.id)" label="Study"
                  color="#ffffff" />
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <MyButton class="button" size="medium" @onClick="editar(meta)" label="To edit" color="#38B6FF" />
              </v-col>
            </v-row>
          </v-card>
        </div>
      </article>
      <MyEdit :itens="editIten" v-if="edit" @closeEdit="edit = false" @deleteIten="deleteMeta($event)"
        @saveEdit="saveEdit($event)" @editar="editar" />
    </v-parallax>
  </main>
</template>

<script>
import "./Metas.css";
import MyButton from "@/components/comuns/Button.vue";
import MyEdit from "@/components/complexity/EditModules/index.vue";
import axios from "../../config/axios"
import Cookies from "js-cookie";
export default {
  name: "subjects",
  components: { MyButton, MyEdit },
  setup() { },
  computed: {
    metasFiltro() {
      if (this.filterTiltulo != "") {
        this.filterDescricao = "";
        let exp = new RegExp(this.filterTiltulo.trim(), "i");
        return this.metasItens.filter((foto) => exp.test(foto.titulo));
      } else if (this.filterDescricao != "") {
        this.filterTiltulo = "";
        let exp = new RegExp(this.filterDescricao.trim(), "i");
        return this.metasItens.filter((foto) => exp.test(foto.descricao));
      } else {
        return this.metasItens;
      }
    },
  },
  data(
  ) {
    return {
      more: false,
      edit: false,
      editIten: {},
      propsEdit: {},
      metasItens: [],
      filterTiltulo: "",
      filterDescricao: "",
    };
  },
  methods: {
    async editar(iten) {
      this.edit = true;
      if (iten == {}) {
        this.editIten = {
          titulo: "",
          descricao: "",
        }
      } else {
        this.editIten = iten;
      }
    },
    async saveEdit(iten) {
      let salvar = await iten;
      let body = salvar.edit;
      if (salvar.save) {
        await axios.api.post("materia", body).then(async res => {
          console.log(res);
          this.refresh();
          this.edit = false;
          this.editIten = {};
        }).catch(async error => {
          let message = await error.response.data;
          this.error(message);
        })
      } else {
        await axios.api.put("materia/" + salvar.edit.id, body).then(async res => {
          console.log(res);
          this.refresh();
          this.edit = false;
          this.editIten = {};
        }).catch(async error => {
          let message = await error.response.data;
          this.error(message);
        })
      }
    },
    async deleteMeta(materia) {
      console.log(materia);
      await axios.api.delete("materia/" + materia.id).then(async res => {
        console.log(res);
        this.refresh();
        this.edit = false;
        this.editIten = {};
      }).catch(async error => {
        let message = await error.response.data;
        this.error(message);
      })
    },
    async refresh() {
      await axios.api.get("materia").then(async res => {
        this.metasItens = await res.data;
      }).catch(async error => {
        let message = await error.response.data;
        this.error(message);
      });
    },
    study(metas) {
      Cookies.set("user_metas", metas);
      this.$router.push({ name: "Notations" });
    },
    formatTime(time) {
      time = time * 1000;
      let seconds = Math.floor(time / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = seconds >= 60 ? minutes + 1 : minutes;
      minutes = minutes % 60;

      return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
    async error(message) {
      this.$alert(message, "Error", "error", {
        confirmButtonText: "Got it!"
      });
    },
  },
  async mounted() {
    await axios.api.get("materia").then(async res => {
      this.metasItens = await res.data;
    }).catch(async error => {
      let message = await error.response.data;
      this.error(message);
    });
  }
};
</script>
<template>
  <main>
    <article>
      <section>
        <div id="menu">
          <v-row>
            <h1>ESTABLISHEDS-META</h1>
          </v-row>
          <v-row id="filter">
            <v-col sm="4">
              <v-text-field placeholder="Filter by name" />
            </v-col>
            <v-col sm="4" id="col-add">
              <MyButton
              id="button-add"
                  primary
                  size="medium"
                  @onClick="onLogout"
                  label="ADD META"
                  color="#ffffff"
                />
            </v-col>
            <v-col sm="4">
              <v-text-field placeholder="Filter by decription" />
            </v-col>
          </v-row>
        </div>
        <div id="metas" v-for="meta of metasItens" :key="meta.id">
          <v-card class="meta-iten">
            <v-row>
              <h2>{{ meta.asunto }}</h2>
            </v-row>
            <v-row>
              <p>{{ meta.descricao }}</p>
            </v-row>
            <v-row>
              <h3>Study hours: {{ meta.horasEstudo }}h</h3>
            </v-row>
            <v-row class="buttons-meta">
              <v-col sm="4">
                <MyButton
                  primary
                  size="medium"
                  @onClick="onLogout"
                  label="Study"
                  color="#ffffff"
                />
              </v-col>
              <v-col sm="4">
                <MyButton
                  size="medium"
                  @onClick="onLogout"
                  label="To edit"
                  color="#38B6FF"
                />
              </v-col>
            </v-row>
          </v-card>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import "./Subjects.css";
import MyButton from "@/components/comuns/Button.vue";
import Cookies from "js-cookie";
export default {
  name: "subjects",
  components: { MyButton },
  setup() {},
  data() {
    return {
      metasItens: [
        {
          id: "1",
          horasEstudo: 10.5,
          asunto: "Asunto",
          descricao:
            "It is often said and rarely true that a particular novel defies classification or even description. Such however seems truth-fully to be the case with Vladimir Nabokov* s LOLITA. It has been called everything from “a strong, a disturbing book” (The Manchester Guardian) and “a distinguished novel” (Graham Greene)",
        },
        {
          id: "2",
          horasEstudo: 10.5,
          asunto: "Asunto",
          descricao:
            "It is often said and rarely true that a particular novel defies classification or even description. Such however seems truth-fully to be the case with Vladimir Nabokov* s LOLITA. It has been called everything from “a strong, a disturbing book” (The Manchester Guardian) and “a distinguished novel” (Graham Greene)",
        },
        {
          id: "3",
          horasEstudo: 10.5,
          asunto: "Asunto",
          descricao:
            "It is often said and rarely true that a particular novel defies classification or even description. Such however seems truth-fully to be the case with Vladimir Nabokov* s LOLITA. It has been called everything from “a strong, a disturbing book” (The Manchester Guardian) and “a distinguished novel” (Graham Greene) It is often said and rarely true that a particular novel defies classification or even description. Such however seems truth-fully to be the case with Vladimir Nabokov* s LOLITA. It has been called everything from “a strong, a disturbing book” (The Manchester Guardian) and “a distinguished novel” (Graham Greene)",
        },
        {
          id: "4",
          horasEstudo: 10.5,
          asunto: "Asunto",
          descricao:
            " Such however seems truth-fully to be the case with Vladimir Nabokov* s LOLITA. It has been called everything from “a strong, a disturbing book” (The Manchester Guardian) and “a distinguished novel” (Graham Greene)",
        },
      ],
    };
  },
};
</script>
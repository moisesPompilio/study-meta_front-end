<template>
    <main>
        <v-parallax width="100%" height="100%" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
            <article>

                <v-card id="menu">
                    <v-row id="row-menu">
                        <v-col id="title" sm="3">
                            <v-row>
                                <v-icon id="return-icon" large color="blue darken-2" @click="pushMetas()">
                                    mdi-arrow-left-bold-box-outline
                                </v-icon>
                                <h1>
                                    NOTATIONS-{{ meta.titulo }}
                                </h1>
                            </v-row>
                        </v-col>
                        <v-col sm="3">
                            <h2>Study hours: {{ formatTime(meta.horasEstudo) }}h <v-icon @click="editPuchClock = true"
                                    color="orange darken-2">
                                    mdi-pencil</v-icon>
                            </h2>
                        </v-col>
                        <v-col sm="4" id="puch-clock">
                            <h3>{{ converterDate(toPuchClock.data, toPuchClock.saida) }}
                            </h3>
                        </v-col>
                        <v-col sm="2" id="btn-Study">
                            <MyButton primary size="large" color="#ffffff" label="Study" @onClick="addPuchClock()" />
                        </v-col>
                    </v-row>
                    <v-row v-if="toPuchClock.data != null" id="filter">
                        <v-col sm="4">
                            <v-text-field placeholder="Filter by title" v-model="filterTiltulo" />
                        </v-col>
                        <v-col sm="4" id="col-add">
                            <MyButton id="button-add" primary size="medium" @onClick="edit = true, editIten = {}"
                                label="ADD NOTATIONS" color="#ffffff" />
                        </v-col>
                        <v-col sm="4">
                            <v-text-field dense placeholder="Filter by decription" v-model="filterDescricao" />
                        </v-col>
                    </v-row>
                </v-card>
                <div id="notations" v-for="notation of notationsFiltro" :key="notation.id">
                    <v-card class="notations-iten">
                        <v-row>
                            <h2>{{ notation.titulo }}</h2>
                        </v-row>
                        <v-row>
                            <p>{{ notation.descricao }}</p>
                        </v-row>
                        <v-row align="center" justify="center" class="buttons-notations">
                            <v-col cols="12" sm="6" md="3">
                                <MyButton v-if="toPuchClock.data != null" class="button" size="medium"
                                    @onClick="editar(notation)" label="To edit" color="#38B6FF" />
                            </v-col>
                        </v-row>
                    </v-card>
                </div>
            </article>
            <MyEdit :itens="editIten" v-if="edit" @deleteIten="deleteNotation($event)" @closeEdit="edit = false"
                @saveEdit="saveEdit($event)" @editar="editar" />
            <EditPuchClock v-if="editPuchClock" :itens="toPuchClocks" @closeEdit="editPuchClock = false"
                @deletePuchClock="deletePuchClock($event)" @saveEdit="saveEditPuchClock($event)" />

        </v-parallax>
    </main>
</template>

<script>
import moment from "moment";
import "./Notations.css";
import MyButton from "@/components/comuns/Button.vue";
import MyEdit from "@/components/complexity/EditModules/index.vue";
import EditPuchClock from "@/components/complexity/EditPuchClock"
import axios from "../../config/axios"
import Cookies from "js-cookie";
export default {
    name: "notations",
    components: { MyButton, MyEdit, EditPuchClock },
    setup() { },
    computed: {
        notationsFiltro() {
            if (this.filterTiltulo != "") {
                this.filterDescricao = "";
                let exp = new RegExp(this.filterTiltulo.trim(), "i");
                return this.notationsItens.filter((foto) => exp.test(foto.titulo));
            } else if (this.filterDescricao != "") {
                this.filterTiltulo = "";
                let exp = new RegExp(this.filterDescricao.trim(), "i");
                return this.notationsItens.filter((foto) => exp.test(foto.descricao));
            } else {
                return this.notationsItens;
            }
        },
    },
    data(
    ) {
        return {
            meta: {},
            metas_id: Cookies.get("user_metas"),
            more: false,
            edit: false,
            editIten: {},
            propsEdit: {},
            notationsItens: [],
            filterTiltulo: "",
            filterDescricao: "",
            toPuchClocks: [],
            toPuchClock: [],
            editPuchClock: false,
        };
    },
    methods: {
        converterDate(data, textCodition) {
            if (data != null) {
                var momentDate = moment(data);
                textCodition = textCodition != 1 ? "Entrance" : "Exit"
                return `Last record: ${momentDate.format("YYYY-MM-DD hh:mm:ss A")}, ${textCodition}`;
            } else {
                return null;
            }

        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },

        formatTime(time) {
            if (time) {
                time = time * 1000;
                let seconds = Math.floor(time / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);

                seconds = seconds % 60;
                minutes = seconds >= 60 ? minutes + 1 : minutes;
                minutes = minutes % 60;

                return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
            } else {
                return "00:00:00";
            }

        },
        pushMetas() {
            this.$router.push({ name: "Metas" })
        },
        addPuchClock() {
            axios.api.post("ponto/?materia_id=" + this.metas_id).then(async res => {
                console.log(res.data)
                this.refreshPunchClock();
            }).catch(async error => {
                let message = await error.response.data;
                await this.error(message)
            });
        },
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
                await axios.api.post("observacoes/?materia_id=" + this.metas_id, body).then(async res => {
                    console.log(res);
                    this.refresh();
                    this.edit = false;
                    this.editIten = {};
                }).catch(async error => {
                    let message = await error.response.data;
                    await this.error(message)
                })
            } else {
                await axios.api.put("observacoes/" + salvar.edit.id, body).then(async res => {
                    console.log(res);
                    this.refresh();
                    this.edit = false;
                    this.editIten = {};
                }).catch(async error => {
                    let message = await error.response.data;
                    await this.error(message)
                })
            }
        },
        async deleteNotation(notation) {
            console.log(notation);
            await axios.api.delete("observacoes/" + notation.id).then(async () => {
                await this.refresh();
                this.edit = false;
                this.editIten = {};
            }).catch(async error => {
                let message = await error.response.data;
                this.error(message);
            })
        },
        async deletePuchClock(toPuchClock) {
            console.log(toPuchClock);
            await axios.api.delete("ponto/" + toPuchClock.id).then(async () => {
                await this.refreshPunchClock();
                this.refresh();
            }).catch(async error => {
                let message = await error.response.data;
                this.error(message);
            })
        },
        async saveEditPuchClock(toPuchClock) {
            let body = toPuchClock;
            console.log(toPuchClock);
            await axios.api.put("ponto/" + toPuchClock.id, body).then(async res => {
                console.log(res);
                this.refreshPunchClock();
                this.refresh();
            }).catch(async error => {
                let message = await error.response.data;
                await this.error(message)
            })
        },
        async refresh() {
            await axios.api.get("observacoes/?materia_id=" + this.metas_id).then(async res => {
                this.notationsItens = await res.data;
            }).catch(async error => {
                let message = await error.response.data;
                await this.error(message)
            });
        },
        async refreshPunchClock() {
            await axios.api.get("ponto/?materia_id=" + this.metas_id).then(async res => {
                console.log(res.data)
                this.toPuchClocks = await res.data.reverse();
                this.toPuchClock = this.toPuchClocks[0];
                if (this.toPuchClock.saida == 1) {
                    await axios.api.get("materia/" + this.metas_id).then(async res => {
                        this.meta = await res.data
                        this.meta.titulo = this.meta.titulo.toString().toUpperCase();
                    }).catch(async error => {
                        let message = await error.response.data;
                        await this.error(message)
                    });
                }
            }).catch(async error => {
                let message = await error.response.data;
                await this.error(message)
            });
        },
        error(message) {
            if (message.includes("Forbidden")) {
                this.$router.push({ name: "Login" })
            }
            this.$alert(message, "Error", "error", {
                confirmButtonText: "Got it!"
            });
        },
    },
    async mounted() {
        await axios.api.get("materia/" + this.metas_id).then(async res => {
            this.meta = await res.data;
            console.log(res.data);
            console.log(res);
            this.meta.titulo = this.meta.titulo.toString().toUpperCase();
        }).catch(async error => {
            let message = await error.response.data;
            await this.error(message)
        });
        await axios.api.get("observacoes/?materia_id=" + this.metas_id).then(async res => {
            this.notationsItens = await res.data;
        }).catch(async error => {
            let message = await error.response.data;
            await this.error(message)
        });
        await axios.api.get("ponto/?materia_id=" + this.metas_id).then(async res => {
            console.log(res.data)
            this.toPuchClocks = await res.data.reverse();
            this.toPuchClock = this.toPuchClocks[0];
        }).catch(async error => {
            let message = await error.response.data;
            await this.error(message)
        });
    }
};
</script>
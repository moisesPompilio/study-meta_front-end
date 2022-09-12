<template>
    <div>
        <div id="overlay-edit" @click="closeEdit()">
        </div>
        <v-card id="menu-editPuchClock">
            <v-card-title>
                Puch Clocks
                <v-spacer></v-spacer>
                <v-text-field v-model="searchPuchClocks" append-icon="mdi-magnify" label="Search date" single-line
                    hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table height="60vh" :headers="headers" :items="itens" :search="searchPuchClocks" item-key="id"
                :items-per-page="8">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                            {{ converterDate(item.data) }}
                        </td>
                        <td>{{ converterBooleanToString(item.saida) }}</td>
                        <td>
                            <v-icon @click="lineEdit = item.id" color="orange darken-2">
                                mdi-pencil
                            </v-icon>
                        </td>
                        <td>
                            <v-icon color="red" @click="deletePuchClock(item)">mdi-delete</v-icon>
                        </td>
                    </tr>
                    <tr v-if="lineEdit == item.id">
                        <td>
                            <v-text-field v-model="valueEdit" type="datetime-local" />
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <MyButton id="save-edit" primary size="small" @onClick="saveEditPuchClock(item)"
                                label="SAVE" color="#ffffff" />
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
import moment from "moment";
import "./styles.css"
import MyButton from "../../comuns/Button.vue";
import Cookies from "js-cookie";
import axios from "@/config/axios";
export default {
    name: "edit-puchClock",

    components: { MyButton },

    props: {
        itens: {
            type: Array,
        }
    },
    computed: {
    },
    data() {
        return {
            searchPuchClocks: "",
            toPuchClocks: "",
            headers: [
                {
                    text: 'Date', value: 'data',
                },
                { text: 'Type', value: 'saida' },
                { text: 'Edit', value: '' },
                { text: 'Delete', value: '' },
            ],
            lineEdit: 0,
            valueEdit: null,
        };
    },
    methods: {
        converterDate(data) {
            if (data != null) {
                var momentDate = moment(data);
                return `${momentDate.format("YYYY-MM-DD hh:mm:ss A")}`;
            } else {
                return null;
            }

        },
        converterBooleanToString(textCodition) {
            return textCodition != 1 ? "Entrance" : "Exit"
        },
        async saveEditPuchClock(toPuchClock) {
            if (this.valueEdit != null) {
                toPuchClock.data = await this.valueEdit;
                await this.$emit("saveEditPuchClock", toPuchClock);
                this.valueEdit = null;
            } else {
                this.$alert("The date field is not filled", "Error", "error", {
                    confirmButtonText: "Got it!"
                });
            }

        },
        closeEdit() {
            this.$confirm("Changes were not saved.", "Do you want to go out anyway?", "question", {
                reverseButtons: true
            })
                .then((r) => {
                    if (r) {
                        this.$emit("closeEdit");
                    }
                })
                .catch(() => {
                    console.log("OK not selected.");
                });
        },
        deletePuchClock(toPuchClock) {
            this.$confirm("You will delete this item.", "Do you want to go out anyway?", "question", {
                reverseButtons: true
            })
                .then((r) => {
                    if (r) {
                        this.$emit("deletePuchClock", toPuchClock);
                    }
                })
                .catch(() => {
                    console.log("OK not selected.");
                });
        }
    },
    mounted() {
    },
};
</script>
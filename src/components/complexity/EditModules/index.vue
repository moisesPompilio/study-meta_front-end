
<template>
    <div>
        <div id="overlay-edit">
        </div>
        <v-card id="menu-edit">
            <v-row>
                <v-text-field id="title" placeholder="Filter by name" v-model="titulo" class="input-edit" />
            </v-row>
            <v-row>
                <v-textarea class="input-edit" v-model="description" placeholder="Description"></v-textarea>
            </v-row>
            <v-row class="buttons-edit">
                <MyButton class="button" primary size="medium" label="Save" @onClick="save()" color="#ffffff" />
                <MyButton v-if="this.itens.id" class="button" size="medium" label="DELETE" @onClick="deleteIten()" color="red" />
                <MyButton class="button" size="medium" @onClick="closeEdit()" label="Cancel" color="#38B6FF" />

            </v-row>
        </v-card>
    </div>
</template>
<script>
import "./styles.css"
import MyButton from "../../comuns/Button.vue";
import Cookies from "js-cookie";
export default {
    name: "my-edit",

    components: { MyButton },

    props: {
        itens: {
            type: Object,
        }
    },
    data() {
        return {
            titulo: "",
            description: "",
            edit: this.itens,
        };
    },
    methods: {
        async save() {
            this.edit.titulo = this.titulo;
            this.edit.descricao = this.description;
            this.edit = await {
                save: !this.itens.id ? true : false,
                edit: this.edit,
            }
            console.log(this.edit);
            this.$emit("saveEdit", this.edit);
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
        deleteIten() {
            this.$confirm("You will delete this item.", "Do you want to go out anyway?", "question", {
                reverseButtons: true
            })
                .then((r) => {
                    if (r) {
                        this.$emit("deleteIten", this.itens);
                    }
                })
                .catch(() => {
                    console.log("OK not selected.");
                });
        }
    },
    mounted() {
        this.titulo = this.itens.titulo;
        this.description = this.itens.descricao;
    },
};
</script>

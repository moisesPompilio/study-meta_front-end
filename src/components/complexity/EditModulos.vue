
<template>
    <div>
        <div id="overlay-edit">
        </div>
        <v-card id="menu-edit">
            <v-row>
                <v-text-field placeholder="Filter by name" v-model="itens.titulo" class="input-edit" />
            </v-row>
            <v-row>
                <v-textarea class="input-edit" v-model="itens.descricao" placeholder="Description"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    hint="Hint text"></v-textarea>
            </v-row>
            <v-row class="buttons-meta">
                <v-col cols="12" sm="6" md="3">
                    <MyButton class="button" primary size="medium" label="Save" color="#ffffff" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <MyButton class="button" size="medium" @onClick="closeEdit()" label="Cancel" color="#38B6FF" />
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import MyButton from "../comuns/Button.vue";
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
            usuario: Cookies.get("user_name"),
        };
    },
    methods: {
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
    },
    mounted() {
    },
};
</script>

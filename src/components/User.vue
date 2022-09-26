<template>
    <v-container id="LeitoresPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl">
                    <v-data-table
                        class="rounded-xl elevation-7"
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        :search="procurar"
                        :loading="items"
                        :loading-text="carregando"
                    >
                    </v-data-table>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FF0038" dark v-bind="attrs" v-on="on">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        <v-spacer></v-spacer>
                        Novo leitor
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Leitor Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nome do leitor" append-icon="mdi-book" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Cidade" append-icon="mdi-account" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Endereço" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*Todos os campos são obrigatórios</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false"> Cancelar </v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import Users from '../service/users';

export default {
    data: () => ({
        dialog: false,

        headers: [
            { text: 'id', value: 'id' },
            { text: 'nome', value: 'name' },
            { text: 'cidade', value: 'city' },
            { text: 'endereço', value: 'address' }
        ],

        users: []
    }),

    mounted() {
        Users.getAllUsers().then((response) => {
            this.users = response.data.content;
        });
    }
};
</script>

<style>
#leitoresPage {
    background-color: #1f1f1f;
}
</style>

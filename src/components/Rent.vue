<template>
    <v-container id="aluguelPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl">
                    <v-data-table
                        class="rounded-xl elevation-7"
                        :headers="headers"
                        :items="rents"
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
                        Alugar
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Aluguel Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="livro" append-icon="mdi-book" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="leitor" append-icon="mdi-account" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Data de aluguel" type="date" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Data de predição"
                                        type="date"
                                        append-icon="mdi-calendar"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Data de aluguel"
                                        type="date"
                                        append-icon="mdi-calendar"
                                        required
                                    ></v-text-field>
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
import Rent from '../service/rent';

export default {
    data: () => ({
        dialog: false,

        headers: [
            { text: 'id', value: 'id' },
            { text: 'livro', value: 'book' },
            { text: 'leitor', value: 'user' },
            { text: 'data de aluguel', value: 'rentDate' },
            { text: 'data prevista', value: 'predictDate' },
            { text: 'data entregue', value: 'devolutionDate' },
            { text: 'estatus', valur: 'status' }
        ],

        rents: []
    }),

    mounted() {
        Rent.getAllBooks().then((response) => {
            this.rents = response.data.content;
        });
    }
};
</script>

<style>
#aluguelPage {
    background-color: #1f1f1f;
}
</style>

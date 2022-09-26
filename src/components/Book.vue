<template>
    <v-container id="livrosPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl" id="tabela">
                    <v-data-table
                        class="rounded-xl elevation-7"
                        :headers="headers"
                        :items="books"
                        :items-per-page="5"
                        :search="procurar"
                        :loading="items"
                        :loading-text="carregando"
                    >
                        <template v-slot:item.acoes="{ item }">
                            <v-tooltip top color="#0061A3">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        v-bind="attrs"
                                        v-on="on"
                                        text
                                        small
                                        rounded
                                        @click="showEdit(item)"
                                    >
                                        <v-icon dark> mdi-pencil </v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar</span>
                            </v-tooltip>
                            <v-tooltip top color="red">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="error"
                                        v-bind="attrs"
                                        v-on="on"
                                        text
                                        small
                                        rounded
                                        @click="remover(item)"
                                    >
                                        <v-icon dark> mdi-delete </v-icon>
                                    </v-btn>
                                </template>
                                <span>Remover</span>
                            </v-tooltip>
                        </template>
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
                        Novo livro
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Livro Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nome do livro" append-icon="mdi-book" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="autor" append-icon="mdi-account" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Data de lançamento"
                                        type="date"
                                        append-icon="mdi-calendar"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Editora" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Quantidade de cópias"
                                        type="number"
                                        append-icon="fa-solid fa-numeric"
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
import BookStore from '../service/books';

export default {
    data: () => ({
        dialog: false,

        headers: [
            { text: 'id', value: 'id' },
            { text: 'nome', value: 'name' },
            { text: 'autor', value: 'author' },
            { text: 'lançamento', value: 'launchDate' },
            { text: 'publicadora', value: 'publisherId' },
            { text: 'quantidade', value: 'amount' },
            { text: '', value: 'acoes' }
        ],

        books: []
    }),

    mounted() {
        BookStore.getAllBooks().then((response) => {
            this.books = response.data.content;
        });
    }
};
</script>

<style>
#livrosPage {
    background-color: #1f1f1f;
}
</style>

<template>
    <v-container id="editoraPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl" color="#1f1f1f">
                    <v-card rounded="xl" elevation="7" id="procurar">
                        <v-card-title>
                            EDITORA
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Procurar"
                                color="#ff0024"
                                single-line
                                hide-details
                                dark
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                            id="dados"
                            :headers="headers"
                            :items="publishers"
                            :items-per-page="5"
                            :search="search"
                            dark
                        >
                            <template v-slot:item.acoes="{ item }">
                                <v-tooltip top color="#ff0010">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="white"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
                                            @click="showItem(item)"
                                        >
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar</span>
                                </v-tooltip>
                                <v-tooltip top color="#ff0010">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="white"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
                                            @click="deleteItem(item)"
                                        >
                                            <v-icon dark> mdi-delete </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Remover</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FF0010" dark v-bind="attrs" v-on="on">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        <v-spacer></v-spacer>
                        Nova Editora
                    </v-btn>
                </template>
                <v-card id="editora-nova">
                    <v-card-title>
                        <span class="text-h5">Editora Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Nome da editora"
                                        v-model="publisher.name"
                                        append-icon="mdi-book"
                                        color="#ff0025"
                                        :rules="[rules.required, rules.max, rules.min]"
                                        :counter="30"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Cidade"
                                        v-model="publisher.city"
                                        append-icon="mdi-city-variant"
                                        color="#ff0025"
                                        :rules="[rules.required, rules.max, rules.min]"
                                        :counter="30"
                                        dark
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff0010" text @click="dialog = false"> Cancelar </v-btn>
                        <v-btn color="#ff0010" text @click="this.createPublisher"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card id="editora-edit">
                    <v-card-title>
                        <span class="text-h5">Editora Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Nome da editora"
                                        v-model="editedPublisher.name"
                                        append-icon="mdi-book"
                                        color="#ff0025"
                                        :rules="[rules.required, rules.max, rules.min]"
                                        :counter="30"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Cidade"
                                        v-model="editedPublisher.city"
                                        append-icon="mdi-city-variant"
                                        color="#ff0025"
                                        :rules="[rules.required, rules.max, rules.min]"
                                        :counter="30"
                                        dark
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff0025" text @click="dialog2 = false"> Cancelar </v-btn>
                        <v-btn color="#ff0025" text @click="updatePublisher()"> Editar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import Publisher from '../service/publishers';

export default {
    data: () => ({
        publisher: {
            name: '',
            city: ''
        },

        editedPublisher: {
            name: '',
            city: ''
        },

        editIndex: -1,
        publishers: [],

        dialog: false,
        dialog2: false,
        search: '',

        rules: {
            required: (value) => !!value || 'Este campo é obrigatório.',
            max: (value) => value.length <= 30 || 'Máximo de 30 caracteres.',
            maxAutor: (value) => value.length <= 30 || 'Máximo de 35 caracteres.',
            min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
            minNumber: (value) => value >= 1 || 'No mínimo 1 é necessário.'
        },

        headers: [
            { text: 'ID', value: 'id', class: 'white--text' },
            { text: 'NOME', value: 'name', class: 'white--text' },
            { text: 'CIDADE', value: 'city', class: 'white--text' },
            { text: '', value: 'acoes', sortable: false }
        ]
    }),

    mounted() {
        this.listTable();
    },

    methods: {
        listTable() {
            Publisher.getAllPublishers().then((response) => {
                this.publishers = response.data.content;
            });
        },

        createPublisher() {
            Publisher.createPublisher(this.publisher)
                .then(() => {
                    this.listTable();
                    this.dialog = false;
                    this.$swal({ title: 'Editora Cadastrada', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Cadastrar Editora',
                        text: e.response.data.message,
                        icon: 'error',
                        background: '#1f1f1f'
                    });
                });
        },

        updatePublisher() {
            console.log(this.editIndex, this.editedPublisher);
            let publisher = {
                name: this.editedPublisher.name,
                city: this.editedPublisher.city
            };
            Publisher.updatePublisher(this.editIndex, publisher)
                .then(() => {
                    this.listTable();
                    this.dialog2 = false;
                    this.$swal({ title: 'Editora Editada', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Editar Editora',
                        text: e.response.data.message,
                        icon: 'error',
                        background: '#1f1f1f'
                    });
                });
        },

        deletePublisher() {
            console.log(this.editIndex);
            Publisher.deletePublisher(this.editIndex)
                .then(() => {
                    this.listTable();
                    this.$swal({ title: 'Editora Excluída', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao excluir editora',
                        icon: 'error',
                        background: '#1f1f1f',
                        text: e.response.data.message
                    });
                });
        },

        deleteConfirm() {
            this.$swal({
                title: 'Deseja realmente excluir esta editora?',
                icon: 'waring',
                background: '#1f1f1f',
                showCancelButton: true,
                confirmButtonColor: '#306844',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deletePublisher();
                }
            });
        },

        showItem(item) {
            this.editIndex = item.id;
            this.editedPublisher = Object.assign({}, item);
            this.dialogDelete = true;
            this.dialog2 = true;
        },

        editItem(item) {
            this.editIndex = item.id;
            this.editedPublisher = Object.assign({}, item);
            this.listTable();
        },

        deleteItem(item) {
            this.editIndex = item.id;
            this.editedBook = Object.assign({}, item);
            this.dialogDelete = true;
            this.deleteConfirm();
        },

        deleteItemConfirm() {
            this.books.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedBook = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedBook = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.books[this.editedIndex], this.editedBook);
            } else {
                this.books.push(this.editedBook);
            }
            this.close();
        }
    }
};
</script>

<style>
#livrosPage {
    background-color: #1f1f1f;
    color: #ff0024;
}
#procurar {
    background-color: #1f1f1f;
    color: #ff0024;
}
#dados {
    background-color: #1f1f1f;
    color: white;
}
#editora-nova {
    background-color: #1f1f1f;
    color: #ff0024;
}
#editora-edit {
    background-color: #1f1f1f;
    color: #ff0024;
}
</style>

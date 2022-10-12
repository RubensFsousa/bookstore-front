<template>
    <v-container id="aluguelPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl" color="#1f1f1f">
                    <v-card rounded="xl" elevation="7" id="procurar">
                        <v-card-title>
                            ALUGUEL
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
                            :items="rents"
                            :items-per-page="5"
                            :search="search"
                            dark
                        >
                            <template v-slot:[`item.devolutionDate`]="{ item }">
                                <span v-if="item.devolutionDate != null">{{ item.devolutionDate | FormatDate }}</span>
                                <span v-else> - </span>
                            </template>

                            <template v-slot:item.acoes="{ item }">
                                <v-tooltip top color="#ff0010">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-if="item.devolutionDate"
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
                                <v-tooltip top color="#ff0010">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-if="!item.devolutionDate"
                                            color="white"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
                                            @click="showItem(item)"
                                        >
                                            <v-icon dark> mdi-book-check </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Devolver</span>
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
                        Alugar
                    </v-btn>
                </template>
                <v-card id="alugar">
                    <v-card-title>
                        <span class="text-h5">Aluguel Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-select
                                        :items="books"
                                        label="livro"
                                        item-text="name"
                                        item-value="id"
                                        append-icon="mdi-book"
                                        v-model="rent.bookId"
                                        :rules="[rules.required]"
                                        dark
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        :items="users"
                                        label="leitor"
                                        item-text="name"
                                        item-value="id"
                                        append-icon="mdi-account"
                                        v-model="rent.userId"
                                        :rules="[rules.required]"
                                        dark
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-dialog
                                        ref="menu"
                                        :return-value.sync="date"
                                        persistent
                                        width="290px"
                                        color="#ff0025"
                                        dark
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                label="Data de aluguel"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#ff0010"
                                                :rules="[rules.required]"
                                                dark
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            scrollable
                                            locale="pt-br"
                                            color="#ff0025"
                                            :max="dateNow"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn text color="#ff0025" @click="$refs.menu.save(date)"> OK </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-col>
                                <v-col cols="12">
                                    <v-dialog
                                        ref="menu2"
                                        :return-value.sync="date2"
                                        persistent
                                        width="290px"
                                        color="#ff0025"
                                        dark
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date2"
                                                label="Data de previsão"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#ff0010"
                                                :rules="[rules.required]"
                                                dark
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date2"
                                            scrollable
                                            locale="pt-br"
                                            color="#ff0025"
                                            :min="dateNow"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn text color="#ff0025" @click="$refs.menu2.save(date2)"> OK </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff0025" text @click="dialog = false"> Cancelar </v-btn>
                        <v-btn color="#ff0025" text @click="this.createRent"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';
import Rent from '../service/rent';
import BookStore from '../service/books';
import User from '../service/users';

export default {
    data: () => ({
        rent: {
            userId: '',
            bookId: '',
            rentDate: '',
            rentPredict: ''
        },

        editIndex: -1,

        rents: [],
        books: [],
        users: [],
        dateFormated1: [],
        dateFormated2: [],
        dateFormated3: [],

        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        dateNow: new Date().toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        modal: false,
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
            { text: 'ID', value: 'id', aling: 'center' },
            { text: 'LIVRO', value: 'book.name', aling: 'center' },
            { text: 'LEITOR', value: 'user.name', aling: 'center' },
            { text: 'DATA DE ALUGUEL', value: 'rentDate', aling: 'center' },
            { text: 'DATA PREVISTA', value: 'rentPredict', aling: 'center' },
            { text: 'DATA ENTREGUE', value: 'devolutionDate', aling: 'center' },
            { text: 'ESTATUS', value: 'status', aling: 'center' },
            { text: '', value: 'acoes', sortable: false }
        ]
    }),

    filters: {
        FormatDate: (date) => {
            return moment(date).subtract(1, 'months').format('DD/MM/YYYY');
        }
    },

    mounted() {
        this.listTable();
    },

    methods: {
        listTable() {
            Rent.getAllRents().then((response) => {
                console.log(response.data.content);
                this.rents = response.data.content;
                this.rents.forEach((item) => {
                    this.dateFormated1 = moment(item.rentDate).subtract(1, 'months').format('DD/MM/YYYY');
                    this.dateFormated2 = moment(item.rentPredict).subtract(1, 'months').format('DD/MM/YYYY');

                    return (item.rentDate = this.dateFormated1), (item.rentPredict = this.dateFormated2);
                });
            }),
                User.getAllUsers().then((response) => {
                    console.log(response.data.content);
                    this.users = response.data.content;
                }),
                BookStore.getAllBooks().then((response) => {
                    console.log(response.data.content);
                    this.books = response.data.content;
                });
        },
        createRent() {
            console.log(this.rent);
            this.date;
            this.date2;
            this.rent.rentDate = moment(this.date).format('DD/MM/YYYY');
            this.rent.rentPredict = moment(this.date2).format('DD/MM/YYYY');
            Rent.createRent(this.rent)
                .then(() => {
                    this.listTable();
                    this.dialog = false;
                    this.$swal({ title: 'Livro Alugado', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'erro ao alugar livro',
                        text: e.response.data.message,
                        icon: 'error',
                        background: '#1f1f1f'
                    });
                });
        },
        devolution() {
            Rent.devolution(this.editIndex)
                .then(() => {
                    this.listTable();
                    this.dialog = false;
                    this.$swal({ title: 'Livro Devolvido', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'erro ao Devolver livro',
                        text: e.response.data.message,
                        icon: 'error',
                        background: '#1f1f1f'
                    });
                });
        },

        deleteRent() {
            Rent.deleteRent(this.editIndex)
                .then(() => {
                    this.listTable();
                    this.$swal({ title: 'Aluguel Ecluído', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Excluir Aluguel',
                        icon: 'error',
                        background: '#1f1f1f',
                        text: e.response.data.message
                    });
                });
        },

        deleteConfirm() {
            this.$swal({
                title: 'Deseja realmente excluir o registro de aluguel?',
                icon: 'waring',
                background: '#1f1f1f',
                showCancelButton: true,
                confirmButtonColor: '#306844',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteRent();
                }
            });
        },

        deleteItem(item) {
            this.editIndex = item.id;
            this.rent = Object.assign({}, item);
            this.dialogDelete = true;
            this.deleteConfirm();
        },

        showItem(item) {
            this.editIndex = item.id;
            this.editedBook = Object.assign({}, item);
            this.devolution();
        }
    }
};
</script>

<style>
#aluguelPage {
    background-color: #1f1f1f;
}
#procurar {
    background-color: #1f1f1f;
    color: #ff0024;
}
#dados {
    background-color: #1f1f1f;
    color: white;
}
#alugar {
    background-color: #1f1f1f;
    color: #ff0024;
}
</style>

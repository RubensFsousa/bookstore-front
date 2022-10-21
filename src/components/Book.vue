<template>
    <v-container id="livrosPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl" color="#1f1f1f">
                    <v-card rounded="xl" elevation="7" id="procurar">
                        <v-card-title>
                            LIVRO
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
                            sort-by="id"
                            :headers="headers"
                            :items="books"
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
                        Novo livro
                    </v-btn>
                </template>
                <v-card id="livro-novo">
                    <v-card-title>
                        <span class="text-h5">Livro Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Nome do livro"
                                            v-model="book.name"
                                            append-icon="mdi-book"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="book.author"
                                            label="autor"
                                            append-icon="mdi-account"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-dialog
                                            ref="dialog"
                                            :return-value.sync="date"
                                            persistent
                                            width="290px"
                                            color="#ff0025"
                                            dark
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    label="Data de lançamento"
                                                    append-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    color="#ff0010"
                                                    :rules="[rules.required]"
                                                    :value="computedDateFormatted"
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
                                                <v-btn text color="#ff0025" @click="$refs.dialog.save(date)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select
                                            :items="publishers"
                                            label="Editora"
                                            item-text="name"
                                            item-value="id"
                                            v-model="book.publisherId"
                                            :rules="[rules.required]"
                                            dark
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Quantidade de cópias"
                                            type="number"
                                            v-model="book.amount"
                                            append-icon="mdi-numeric"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.minNumber]"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff0025" text @click="close()"> Cancelar </v-btn>
                        <v-btn color="#ff0025" text @click="this.createBook"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card id="livro-edit">
                    <v-card-title>
                        <span class="text-h5">Livro Edit </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form2" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Nome do livro"
                                            v-model="editedBook.name"
                                            append-icon="mdi-book"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="editedBook.author"
                                            label="autor"
                                            append-icon="mdi-account"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-dialog
                                            ref="dialog2"
                                            :return-value.sync="date2"
                                            persistent
                                            width="290px"
                                            color="#ff0025"
                                            dark
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    :value="computedDateFormatted2"
                                                    label="Data de lançamento"
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
                                                :max="date"
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn text color="#ff0025" @click="$refs.dialog2.save(date2)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select
                                            v-model="editedBook.publisher.id"
                                            :items="publishers"
                                            label="Editora"
                                            item-text="name"
                                            item-value="id"
                                            :rules="[rules.required]"
                                            dark
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Quantidade de cópias"
                                            type="number"
                                            v-model="editedBook.amount"
                                            append-icon="mdi-numeric"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.minNumber]"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff0025" text @click="dialog2 = false"> Cancelar </v-btn>
                        <v-btn color="#ff0025" text @click="updateBook()"> Editar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import BookStore from '../service/books';
import Publisher from '../service/publishers';
import moment from 'moment';

export default {
    data: () => ({
        book: {
            name: '',
            author: '',
            launchDate: '',
            amount: '',
            publisherId: ''
        },

        editedBook: {
            name: '',
            author: '',
            launchDate: '',
            amount: '',
            publisher: {
                id: '',
                name: '',
                city: ''
            }
        },

        editIndex: -1,

        books: [],
        publishers: [],
        dateFormated: [],

        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        dateNow: new Date().toISOString().substr(0, 10),
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
            { text: 'ID', value: 'id', class: 'white--text' },
            { text: 'NOME', value: 'name', class: 'white--text' },
            { text: 'AUTOR', value: 'author', class: 'white--text' },
            { text: 'DATA DE LANÇAMENTO', value: 'launchDate', class: 'white--text' },
            { text: 'EDITORA', value: 'publisher.name', class: 'white--text' },
            { text: 'QUANTIDADE', value: 'amount', class: 'white--text' },
            { text: '', value: 'acoes', sortable: false }
        ]
    }),

    mounted() {
        this.listTable();
    },
    computed: {
        computedDateFormatted() {
            return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
        },
        computedDateFormatted2() {
            return this.date2 ? moment(this.date2).format('DD/MM/YYYY') : '';
        }
    },

    methods: {
        listTable() {
            BookStore.getAllBooks().then((response) => {
                console.log(response.data.content);
                this.books = response.data.content;
                this.books.forEach((book) => {
                    this.dateFormated = moment(book.launchDate).subtract(1, 'months').format('DD/MM/YYYY');
                    return (book.launchDate = this.dateFormated);
                });
            }),
                Publisher.getAllPublishers().then((response) => {
                    console.log(response.data);
                    this.publishers = response.data.content;
                });
        },

        createBook() {
            if (this.$refs.form.validate()) {
                this.date;
                console.log(this.book);
                this.book.launchDate = moment(this.date).format('DD/MM/YYYY');
                BookStore.createBook(this.book)
                    .then((response) => {
                        console.log(this.book);
                        this.listTable();
                        this.close();
                        this.$swal({ title: 'Livro Cadastrado', icon: 'success', background: '#1f1f1f' });
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$swal({
                            title: 'Erro ao Cadastrar Livro',
                            text: e.response.data.message,
                            icon: 'error',
                            background: '#1f1f1f'
                        });
                    });
            }
        },

        updateBook() {
            if (this.$refs.form2.validate()) {
                let book = {
                    name: this.editedBook.name,
                    author: this.editedBook.author,
                    launchDate: this.editedBook.launchDate,
                    amount: this.editedBook.amount,
                    publisherId: this.editedBook.publisher.id
                };
                this.date2;
                book.launchDate = moment(this.date2).format('DD/MM/YYYY');
                console.log(this.editedBook, this.editIndex);
                BookStore.updateBook(this.editIndex, book)
                    .then((response) => {
                        this.listTable();
                        this.dialog2 = false;
                        this.$swal({ title: 'livro Editado', icon: 'success', background: '#1f1f1f' });
                    })
                    .catch((e) => {
                        this.$swal({
                            title: 'Erro ao Editar Livro',
                            text: e.response.data.message,
                            icon: 'error',
                            background: '#1f1f1f'
                        });
                    });
            }
        },

        deleteBook() {
            BookStore.deleteBook(this.editIndex)
                .then(() => {
                    this.listTable();
                    this.$swal({ title: 'Livro Ecluído', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Excluir Livro',
                        icon: 'error',
                        background: '#1f1f1f',
                        text: e.response.data.message
                    });
                });
        },

        deleteConfirm() {
            this.$swal({
                title: 'Deseja realmente excluir este livro?',
                icon: 'waring',
                background: '#1f1f1f',
                showCancelButton: true,
                confirmButtonColor: '#306844',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteBook();
                }
            });
        },

        showItem(item) {
            this.editIndex = item.id;
            this.editedBook = Object.assign({}, item);
            this.dialogDelete = true;
            this.dialog2 = true;
        },

        editItem(item) {
            this.editIndex = item.id;
            this.editedBook = Object.assign({}, item);
            this.$refs.form2.resetValidation();
        },

        deleteItem(item) {
            this.editIndex = item.id;
            this.editedBook = Object.assign({}, item);
            this.dialogDelete = true;
            this.deleteConfirm();
        },

        close() {
            this.dialog = false;
            this.book = {
                name: '',
                author: '',
                launchDate: '',
                amount: '',
                publisherId: ''
            };
            this.$refs.form.resetValidation();
        }
    }
};
</script>

<style>
#livrosPage {
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
#livro-novo {
    background-color: #1f1f1f;
    color: #ff0024;
}
#livro-edit {
    background-color: #1f1f1f;
    color: #ff0024;
}
</style>

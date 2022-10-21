<template>
    <v-container id="LeitorPage">
        <v-row>
            <v-col>
                <v-sheet rounded="xl" color="#1f1f1f">
                    <v-card rounded="xl" elevation="7" id="procurar">
                        <v-card-title>
                            LEITOR
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
                            :items="users"
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
                        Novo leitor
                    </v-btn>
                </template>
                <v-card id="leitor-novo">
                    <v-card-title>
                        <span class="text-h5">Leitor Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Nome do leitor"
                                            append-icon="mdi-account"
                                            v-model="user.name"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Cidade"
                                            append-icon="mdi-city-variant"
                                            v-model="user.city"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Endereço"
                                            append-icon="mdi-home-account"
                                            v-model="user.address"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
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
                        <v-btn color="#ff0025" text @click="this.createUser"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card id="leitor-edit">
                    <v-card-title>
                        <span class="text-h5">Leitor Info </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form2" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Nome do leitor"
                                            append-icon="mdi-account"
                                            v-model="editedUser.name"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Cidade"
                                            append-icon="mdi-city-variant"
                                            v-model="editedUser.city"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
                                            dark
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Endereço"
                                            append-icon="mdi-home-account"
                                            v-model="editedUser.address"
                                            color="#ff0025"
                                            :rules="[rules.required, rules.max, rules.min]"
                                            :counter="30"
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
                        <v-btn color="#ff0025" text @click="updateUser()"> Editar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import User from '../service/users';

export default {
    data: () => ({
        user: {
            name: '',
            city: '',
            address: ''
        },

        editedUser: {
            name: '',
            city: '',
            address: ''
        },

        editIndex: -1,
        users: [],

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
            { text: 'ENDEREÇO', value: 'address', class: 'white--text' },
            { text: '', value: 'acoes', sortable: false }
        ]
    }),

    mounted() {
        this.listTable();
    },

    methods: {
        listTable() {
            User.getAllUsers().then((response) => {
                this.users = response.data.content;
            });
        },

        createUser() {
            if (this.$refs.form.validate()) {
                User.createUser(this.user)
                    .then(() => {
                        this.listTable();
                        this.close();
                        this.$swal({ title: 'Leitor Cadastrado', icon: 'success', background: '#1f1f1f' });
                    })
                    .catch((e) => {
                        this.$swal({
                            title: 'Erro ao Cadastrar Leitor',
                            text: e.response.data.message,
                            icon: 'error',
                            background: '#1f1f1f'
                        });
                    });
            }
        },

        updateUser() {
            console.log(this.editIndex, this.editedUser);
            let user = {
                name: this.editedUser.name,
                city: this.editedUser.city,
                address: this.editedUser.address
            };
            User.updateUser(this.editIndex, user)
                .then(() => {
                    this.listTable();
                    this.dialog2 = false;
                    this.$swal({ title: 'Leitor Editado', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Editar Leitor',
                        text: e.response.data.message,
                        icon: 'error',
                        background: '#1f1f1f'
                    });
                });
        },

        deleteUser() {
            User.deleteUser(this.editIndex)
                .then(() => {
                    this.listTable();
                    this.$swal({ title: 'Leitor Excluído', icon: 'success', background: '#1f1f1f' });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Erro ao Excluir Leitor',
                        icon: 'error',
                        background: '#1f1f1f',
                        text: e.response.data.message
                    });
                });
        },

        deleteConfirm() {
            this.$swal({
                title: 'Deseja realmente excluir este leitor?',
                icon: 'waring',
                background: '#1f1f1f',
                showCancelButton: true,
                confirmButtonColor: '#306844',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser();
                }
            });
        },

        showItem(item) {
            this.editIndex = item.id;
            this.editedUser = Object.assign({}, item);
            this.dialogDelete = true;
            this.dialog2 = true;
        },

        editItem(item) {
            this.editIndex = item.id;
            this.editedUser = Object.assign({}, item);
            this.$refs.form2.resetValidation();
        },

        deleteItem(item) {
            this.editIndex = item.id;
            this.editedUser = Object.assign({}, item);
            this.dialogDelete = true;
            this.deleteConfirm();
        },

        close() {
            this.dialog = false;
            this.user = {
                name: '',
                city: '',
                address: ''
            };
            this.$refs.form.resetValidation();
        }
    }
};
</script>

<style>
#leitoresPage {
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
#leitor-novo {
    background-color: #1f1f1f;
    color: #ff0024;
}
#leitor-edit {
    background-color: #1f1f1f;
    color: #ff0024;
}
</style>

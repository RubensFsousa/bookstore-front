<template>
    <v-container id="dashPage">
        <v-row>
            <v-col>
                <v-card rounded="xl" elevation="7" id="book">
                    <v-card-title>Livro</v-card-title>
                    <!-- <v-card-text>{{ books.length }}</v-card-text> -->
                </v-card>
            </v-col>
            <v-col>
                <v-card rounded="xl" elevation="7" id="publisher">
                    <v-card-title>Editora</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card rounded="xl" elevation="7" id="user">
                    <v-card-title>Leitor</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card rounded="xl" elevation="7" id="rent">
                    <v-card-title>Aluguel</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BookStore from '../service/books';
import Publisher from '../service/publishers';
import Rent from '../service/rent';
import User from '../service/users';

export default {
    data: () => ({
        books: [],
        users: [],
        publishers: [],
        rents: [],

        mounted() {
            this.updateDash();
            console.log('teste');
        },

        methods: {
            updateDash() {
                BookStore.getAllBooks().then((response) => {
                    console.log(response);
                    this.books = response.data.content;
                }),
                    Publisher.getAllPublishers().then((response) => {
                        console.log(response);
                        this.publishers = response.data.content;
                    }),
                    Rent.getAllRents().then((response) => {
                        console.log(response);
                        this.rents = response.data.content;
                    }),
                    User.getAllUsers().then((response) => {
                        console.log(response);
                        this.users = response.data.content;
                    });
            }
        }
    })
};
</script>

<style>
#book {
    background-color: #1f1f1f;
    color: #ff0010;
}
#publisher {
    background-color: #1f1f1f;
    color: #ff0010;
}
#user {
    background-color: #1f1f1f;
    color: #ff0010;
}
#rent {
    background-color: #1f1f1f;
    color: #ff0010;
}
</style>

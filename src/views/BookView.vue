<template>
    <v-app id="app">
        <Book></Book>
    </v-app>
</template>

<script>
import Book from '../components/Book.vue';
export default {
    data: () => ({}),
    components: {
        Book
    }
};
</script>

<style>
#app {
    background-color: #1f1f1f;
}
</style>

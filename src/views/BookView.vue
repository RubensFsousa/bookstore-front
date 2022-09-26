<template>
    <v-app class="page">
        <div class="viewPage">
            <Book></Book>
        </div>
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
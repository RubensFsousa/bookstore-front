<template>
    <v-app id="app">
        <Rent></Rent>
    </v-app>
</template>

<script>
import Rent from '../components/Rent.vue';
export default {
    data: () => ({}),
    components: {
        Rent
    }
};
</script>

<style>
#app {
    background-color: #1f1f1f;
}
</style>

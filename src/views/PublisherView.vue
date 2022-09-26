<template>
    <v-app id="app">
        <Publisher></Publisher>
    </v-app>
</template>

<script>
import Publisher from '../components/Publisher.vue';
export default {
    data: () => ({}),
    components: {
        Publisher
    }
};
</script>

<style>
#app {
    background-color: #1f1f1f;
}
</style>

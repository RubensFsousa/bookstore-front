<template>
    <v-app id="app">
        <User></User>
    </v-app>
</template>

<script>
import User from '../components/User.vue';
export default {
    data: () => ({}),
    components: {
        User
    }
};
</script>

<style>
#app {
    background-color: #1f1f1f;
}
</style>

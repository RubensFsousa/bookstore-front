<template>
    <v-app id="app">
        <Dashboard></Dashboard>
    </v-app>
</template>

<script>
import Dashboard from '../components/Dashboard';
export default {
    data: () => ({}),
    components: {
        Dashboard
    }
};
</script>

<style>
#app {
    background-color: #1f1f1f;
}
</style>

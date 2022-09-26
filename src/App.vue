<template>
    <v-app id="inspire">
        <Header></Header>
        <v-main id="main-page">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
        <Footer></Footer>
    </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    components: {
        Header,
        Footer
    }
};
</script>

<style>
#main-page {
    background-color: #1f1f1f;
}
</style>

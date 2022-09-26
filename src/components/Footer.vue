<template>
    <v-footer padless >
        <v-card flat tile class="text-center flex" color=#1F1F1F>
            <v-card-text>
                <v-tooltip top color=#FF0038>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-for="icon in icons"
                            :key="icon"
                            color=#ff0024
                            icon
                            href="https://github.com/RubensFsousa"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon size="26px">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>GitHub</span>
                </v-tooltip>
            </v-card-text>
            <v-divider class="black"></v-divider>
            <v-card-text id="footer-name">
                {{ new Date().getFullYear() }} — <strong>WDA Livraria</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: ['mdi-github'],
        fav: true,
        menu: false,
        message: false,
        hints: true
    })
};
</script>

<style>

#footer-name {
    color: #ff0024;
}

</style>
